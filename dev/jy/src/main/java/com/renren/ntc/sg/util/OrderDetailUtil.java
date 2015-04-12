package com.renren.ntc.sg.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.WXPayShopReport;
import com.renren.ntc.sg.bean.WXPayShopReport.WXPayDetail;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.mail.MailSendInfo;
import com.renren.ntc.sg.mail.MailSendServer;
import com.renren.ntc.sg.util.crontab.UpdateWxRefundInfo;
/**
 * 打印微信每日订单
 * @author chunhai.li
 *
 */
public class OrderDetailUtil {
	//public static boolean isRun = true;
	public static void main(String[] args) {
		String mailListStr = args[0];
		String dateStr = args[1];
		int dateInt = Integer.parseInt(dateStr);
		String[] mailLists = mailListStr.split(",");
		RoseAppContext rose = new RoseAppContext();
		ShopDAO shopDAO = rose.getBean(ShopDAO.class);
		OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		String beginTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 0, 0, 0));
		String endTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 23, 59, 59));
		System.out.println("update start time="+Dateutils.tranferDate2Str(new Date()));
		UpdateWxRefundInfo updateWxRefundInfo = new UpdateWxRefundInfo();
		updateWxRefundInfo.processUpdateRefund(beginTimeStr,endTimeStr);
		System.out.println("update end time="+Dateutils.tranferDate2Str(new Date()));
		List<Shop> shops = shopDAO.getAllShopsByAudit(1);
		List<WXPayShopReport> wxpayShopReports = new ArrayList<WXPayShopReport>();
		int totalShopOrderPrice = 0;
		for(Shop shop : shops){
			//System.out.println("shopid="+shop.getId()+",name="+shop.getName());
			List<Order> orders = orderDao.getShopPayDetail(SUtils.generOrderTableName(shop.getId()), shop.getId(),beginTimeStr,endTimeStr);
			int orderSize = orders == null ? 0 : orders.size();
			WXPayShopReport wShopReport = new WXPayShopReport();
			wShopReport.setShopId(shop.getId());
			wShopReport.setShopName(shop.getName());
			wShopReport.setOrderCount(orderSize);
			//System.out.println("wShopReport shopid="+wShopReport.getShopId()+",name="+wShopReport.getShopName());
			wShopReport.setReportDate(Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(dateInt, 23, 0, 0)));
			List<WXPayDetail> wxpDetails = new ArrayList<WXPayDetail>();
			int totalPrice = 0;
			for(Order order : orders){
				WXPayDetail  wxpDetail = wShopReport.new WXPayDetail();
				wxpDetail.setOrderPrice((float)order.getPrice()/100);
				wxpDetail.setOrderId(order.getOrder_id());
				totalPrice += order.getPrice();
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
				wxpDetail.setWxDiscount((float)wxDiscount/100);
				wxpDetail.setRealPrice((float)(order.getPrice() - wxDiscount)/100);
				wxpDetail.setOrderTimeStr(Dateutils.tranferDate2Str(order.getCreate_time()));
				processWxRefund(order, wxpDetail);
				wxpDetails.add(wxpDetail);	
			}
			totalShopOrderPrice += totalPrice;
			wShopReport.setTotalPrice((float)totalPrice/100);
			wShopReport.setShopOrderFlows(wxpDetails);
			wxpayShopReports.add(wShopReport);
			
			//System.out.println("shopid="+shop.getId()+",shopname="+shop.getName()+",微信支付总价="+(price/100));
		}
		MailSendServer mailSendServer = com.renren.ntc.sg.mail.MailSendServer.getServer("smtp.163.com", 25, "lee_yeah1@163.com", "Lee1qaz2wsx",
	              "lee_yeah1@163.com");
		  mailSendServer.sendTextInfo(new MailSendInfo("喵喵微信支付每日订单详情",getHtmlInfo(wxpayShopReports,totalShopOrderPrice), mailLists, new String[0]),false);
		  //isRun = false;
	}
	
	private static String getHtmlInfo(List<WXPayShopReport> wxpPayShopReports,int totalShopOrderPrice){
		String html = "<html><head><title></title></head><body>"
					 + "<table border='1' cellpadding='1' cellspacing='1' style='width: 1000px;'>"
					 + "<tbody> <tr> <td nowrap> 店铺ID</td> <td nowrap> 店铺名称</td> <td nowrap> 订单报告日期</td> <td nowrap> 微信订单总数</td><td nowrap> 微信订单总额(元)</td> <td colspan='8' 90:72:40:DE:46:2E90:72:40:DE:46:2E90:72:40:DE:46:2E90:72:40:DE:46:2E90:72:40:DE:46:2E90:72:40:DE:46:2E90:72:40:DE:46:2E90:72:40:DE:46:2E90:72:40:DE:46:2E> 每笔订单详情</td><td> 总计(元)</td> </tr>";
					 
    String orderInfoHtml = "";
    String totalShopOrderPriceStr = (float)totalShopOrderPrice/100+"";
    int loopCount =1;
    int i=0;
    int totalRowSpan=0;
	for(WXPayShopReport wxPayShopReport : wxpPayShopReports){
		i++;
		System.out.println("====>"+wxPayShopReport.getShopName());
		List<WXPayDetail> shopOrderFlows = wxPayShopReport.getShopOrderFlows();
		int rowspan = shopOrderFlows.size() + 1;
		totalRowSpan +=rowspan;
		orderInfoHtml = orderInfoHtml + "<tr> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getShopId()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getShopName()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getReportDate()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getOrderCount()+"</td>"
				                      +"<td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getTotalPrice()+""+"</td>";
		if(loopCount == i){
			orderInfoHtml = orderInfoHtml + "<td nowrap> 订单时间</td> <td align='center'> 订单号</td> <td nowrap align='center'> 下单金额(元)</td> <td nowrap align='center'> 优惠券金额(元)</td> <td nowrap align='center'> 最终金额(元)</td><td nowrap align='center'> 是否申请退款</td><td nowrap align='center'> 退款金额(元)</td><td nowrap align='center'> 退款状态</td><td nowrap rowspan='$1'>"+totalShopOrderPriceStr+"</td></tr>";
		}else {
			orderInfoHtml = orderInfoHtml + "<td nowrap> 订单时间</td> <td align='center'> 订单号</td> <td nowrap align='center'> 下单金额(元)</td> <td nowrap align='center'> 优惠券金额(元)</td> <td nowrap align='center'> 最终金额(元)</td><td nowrap align='center'> 是否申请退款</td><td nowrap align='center'> 退款金额(元)</td><td nowrap align='center'> 退款状态</td></tr>";
		}
		
		for(WXPayDetail wxpayDetail : shopOrderFlows){
			if(wxpayDetail.getRefundStatus() .equals("否")){
				orderInfoHtml = orderInfoHtml + "<tr><td nowrap>"+wxpayDetail.getOrderTimeStr()+"</td><td align='center'>"+wxpayDetail.getOrderId()+"<td align='center'>"+wxpayDetail.getOrderPrice()+"</td> <td align='center'>"+wxpayDetail.getWxDiscount()+"</td> <td align='center'>"+wxpayDetail.getRealPrice()+"</td><td align='center'>"+wxpayDetail.getRefundStatus()+"</td><td align='center'>"+wxpayDetail.getRefundPrice()+"</td><td align='center'>"+wxpayDetail.getRefundDes()+"</td></tr>";
			}else {
				orderInfoHtml = orderInfoHtml + "<tr bgcolor='red'><td nowrap>"+wxpayDetail.getOrderTimeStr()+"</td><td align='center'>"+wxpayDetail.getOrderId()+"<td align='center'>"+wxpayDetail.getOrderPrice()+"</td> <td align='center'>"+wxpayDetail.getWxDiscount()+"</td> <td align='center'>"+wxpayDetail.getRealPrice()+"</td><td align='center'>"+wxpayDetail.getRefundStatus()+"</td><td align='center'>"+wxpayDetail.getRefundPrice()+"</td><td align='center'>"+wxpayDetail.getRefundDes()+"</td></tr>";
			}
			
		}
	}
	orderInfoHtml = orderInfoHtml + "</tbody> </table> </body> </html>";
	orderInfoHtml = orderInfoHtml.replace("$1", totalRowSpan+"");
	return html + orderInfoHtml;
	}
	private static void processWxRefund(Order order,WXPayDetail wxpDetail){
		if(order.getOrder_status() == Constants.REFUND_SUC_FLAG){
			if(StringUtils.isNotBlank(order.getOrder_info())){
				JSONObject refundInfojson = new JSONObject();
				JSONObject dbRefundJson = (JSONObject) refundInfojson.parse(order.getOrder_info());
				String refundFee = (String)dbRefundJson.get("refund_fee");
				String refundStatus = (String)dbRefundJson.get("refund_status");
				if(StringUtils.isNotBlank(refundFee) && NumberUtils.isNumber(refundFee)){
					int refundFeeInt = Integer.parseInt(refundFee);
					wxpDetail.setRefundPrice((float)refundFeeInt/100);
				}else {
					wxpDetail.setRefundPrice(0);
				}
				if(StringUtils.isNotBlank(refundStatus)){
					wxpDetail.setRefundDes(getRefundStatus(refundStatus));
				}else {
					wxpDetail.setRefundDes("");
				}
			}
			wxpDetail.setRefundStatus("是");
		}else {
			wxpDetail.setRefundPrice(0);
			wxpDetail.setRefundDes("");
			wxpDetail.setRefundStatus("否");
		}
	}
	private static String getRefundStatus(String refundStatus){
		if(RefundStatus.SUCCESS.getKey().equals(refundStatus)){
			return RefundStatus.SUCCESS.getDesc();
		}else if (RefundStatus.FAIL.getKey().equals(refundStatus)) {
			return RefundStatus.FAIL.getDesc();
		}else if (RefundStatus.PROCESSING.getKey().equals(refundStatus)) {
			return RefundStatus.PROCESSING.getDesc();
		}else if (RefundStatus.NOTSURE.getKey().equals(refundStatus)) {
			return RefundStatus.NOTSURE.getDesc();
		}else {
			return RefundStatus.CHANGE.getDesc();
		}
	}
	
	static enum RefundStatus{
		SUCCESS("SUCCESS","退款成功"),FAIL("FAIL","退款失败"),PROCESSING("PROCESSING","退款处理中"),NOTSURE("NOTSURE","未确定"),CHANGE("CHANGE","转入代发");
		private String key;
		private String desc;
		private RefundStatus (String key,String desc){
			this.key = key;
			this.desc = desc;
		}
		public String getKey() {
			return key;
		}
		public void setKey(String key) {
			this.key = key;
		}
		public String getDesc() {
			return desc;
		}
		public void setDesc(String desc) {
			this.desc = desc;
		}
	}
}
