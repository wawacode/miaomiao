package com.renren.ntc.sg.util;

import java.util.ArrayList;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.mail.MailSendInfo;
import com.renren.ntc.sg.mail.MailSendServer;
/**
 * 打印微信每日订单
 * @author chunhai.li
 *
 */
public class OrderDetailUtil {
	public static void main(String[] args) {
		String mailListStr = args[0];
		String[] mailLists = mailListStr.split(",");
		RoseAppContext rose = new RoseAppContext();
		ShopDAO shopDAO = rose.getBean(ShopDAO.class);
		OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		List<Shop> shops = shopDAO.getAllShopsByAudit(1);
		WXPayShopReport wShopReport = null;
		WXPayDetail  wxpDetail = null;
		List<WXPayShopReport> wxpayShopReports = new ArrayList<OrderDetailUtil.WXPayShopReport>();
		for(Shop shop : shops){
			String beginTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(-1, 0, 0, 0));
			String endTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(-1, 23, 0, 0));
			List<Order> orders = orderDao.getShopPayDetail(SUtils.generOrderTableName(shop.getId()), shop.getId(),beginTimeStr,endTimeStr);
			int orderSize = orders == null ? 0 : orders.size();
			wShopReport = new WXPayShopReport();
			wShopReport.setShopId(shop.getId());
			wShopReport.setShopName(shop.getName());
			wShopReport.setOrderCount(orderSize);
			wShopReport.setReportDate(Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(-1, 23, 0, 0)));
			wxpDetail = new WXPayDetail();
			List<WXPayDetail> wxpDetails = new ArrayList<WXPayDetail>();
			for(Order order : orders){
				wxpDetail.setOrderPrice(order.getPrice()/100);
				String msg = order.getMsg();
				int wxDiscount = 0;
				if(StringUtils.isNotBlank(msg)){
					JSONObject json = JSONObject.parseObject(msg);
					Integer disCountInt = (Integer)json.get("discount");
					if(disCountInt == null){
						wxDiscount = 0;
					}else {
						if(NumberUtils.isNumber(String.valueOf(disCountInt))){
							wxDiscount = disCountInt;
						}else {
							wxDiscount = 0;
						}
						
					}
				}
				wxpDetail.setWxDiscount(wxDiscount/100);
				wxpDetail.setRealPrice((order.getPrice() - wxDiscount)/100);
				wxpDetail.setOrderTimeStr(Dateutils.tranferDate2Str(order.getCreate_time()));
				wxpDetails.add(wxpDetail);
				wShopReport.setShopOrderFlows(wxpDetails);
				wxpayShopReports.add(wShopReport);
			}
			
			//System.out.println("shopid="+shop.getId()+",shopname="+shop.getName()+",微信支付总价="+(price/100));
		}
		MailSendServer mailSendServer = com.renren.ntc.sg.mail.MailSendServer.getServer("smtp.163.com", 25, "lee_yeah1@163.com", "Lee1qaz2wsx",
	              "lee_yeah1@163.com");
		  mailSendServer.sendTextInfo(new MailSendInfo("喵喵微信支付每日订单详情",getHtmlInfo(wxpayShopReports), mailLists, new String[0]),false);
	}
	
	private static String getHtmlInfo(List<WXPayShopReport> wxpPayShopReports){
		String html = "<html><head><title></title></head><body>"
					 + "<table border='1' cellpadding='1' cellspacing='1' style='width: 1000px;'>"
					 + "<tbody> <tr> <td> 店铺ID</td> <td> 店铺名称</td> <td> 订单报告日期</td> <td> 微信订单总数</td></td> <td colspan='4' align='center'> 每笔订单详情</td> </tr>";
					 
    String orderInfoHtml = "";
	for(WXPayShopReport wxPayShopReport : wxpPayShopReports){
		List<WXPayDetail> shopOrderFlows = wxPayShopReport.getShopOrderFlows();
		int rowspan = shopOrderFlows.size() + 1;
		orderInfoHtml = orderInfoHtml + "<tr> <td rowspan='"+rowspan+"'>"+wxPayShopReport.getShopId()+"</td> <td rowspan='"+rowspan+"'>"+wxPayShopReport.getShopName()+"</td> <td rowspan='"+rowspan+"'>"+wxPayShopReport.getReportDate()+"</td> <td rowspan='"+rowspan+"'>"+wxPayShopReport.getOrderCount()+"</td>";
		orderInfoHtml = orderInfoHtml + "<td> 订单时间</td> <td> 下单金额</td> <td> 优惠券金额</td> <td> 最终金额</td> </tr>";
		for(WXPayDetail wxpayDetail : shopOrderFlows){
			orderInfoHtml = orderInfoHtml + "<tr><td>"+wxpayDetail.getOrderTimeStr()+"</td><td>"+wxpayDetail.getOrderPrice()+"元"+"</td> <td>"+wxpayDetail.getWxDiscount()+"元"+"</td> <td>"+wxpayDetail.getRealPrice()+"元"+"</td></tr>";
		}
	}
	orderInfoHtml = orderInfoHtml + "</tbody> </table> </body> </html>";
	return html + orderInfoHtml;
	}
	
	public static class WXPayShopReport{
		private long shopId;
		private String shopName;
		private int orderCount;
		private String reportDate;
		private List<WXPayDetail> shopOrderFlows;
		public WXPayShopReport(){
			
		}
		public long getShopId() {
			return shopId;
		}
		public void setShopId(long shopId) {
			this.shopId = shopId;
		}
		public String getShopName() {
			return shopName;
		}
		public void setShopName(String shopName) {
			this.shopName = shopName;
		}
		public int getOrderCount() {
			return orderCount;
		}
		public void setOrderCount(int orderCount) {
			this.orderCount = orderCount;
		}
		public String getReportDate() {
			return reportDate;
		}
		public void setReportDate(String reportDate) {
			this.reportDate = reportDate;
		}
		public List<WXPayDetail> getShopOrderFlows() {
			return shopOrderFlows;
		}
		public void setShopOrderFlows(List<WXPayDetail> shopOrderFlows) {
			this.shopOrderFlows = shopOrderFlows;
		}
	}
	public static class WXPayDetail{
		private int orderPrice;
		private int wxDiscount;
		private int realPrice;
		private String orderTimeStr;
		public int getOrderPrice() {
			return orderPrice;
		}
		public void setOrderPrice(int orderPrice) {
			this.orderPrice = orderPrice;
		}
		public int getWxDiscount() {
			return wxDiscount;
		}
		public void setWxDiscount(int wxDiscount) {
			this.wxDiscount = wxDiscount;
		}
		public int getRealPrice() {
			return realPrice;
		}
		public void setRealPrice(int realPrice) {
			this.realPrice = realPrice;
		}
		public String getOrderTimeStr() {
			return orderTimeStr;
		}
		public void setOrderTimeStr(String orderTimeStr) {
			this.orderTimeStr = orderTimeStr;
		}
	}
}
