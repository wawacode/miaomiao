package com.renren.ntc.sg.util;

import java.util.ArrayList;
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
/**
 * 打印微信每日订单
 * @author chunhai.li
 *
 */
public class OrderDetailUtil {
	public static void main(String[] args) {
		String mailListStr = args[0];
		String dateStr = args[1];
		int dateInt = Integer.parseInt(dateStr);
		String[] mailLists = mailListStr.split(",");
		RoseAppContext rose = new RoseAppContext();
		ShopDAO shopDAO = rose.getBean(ShopDAO.class);
		OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		List<Shop> shops = shopDAO.getAllShopsByAudit(1);
		List<WXPayShopReport> wxpayShopReports = new ArrayList<WXPayShopReport>();
		int totalShopOrderPrice = 0;
		for(Shop shop : shops){
			//System.out.println("shopid="+shop.getId()+",name="+shop.getName());
			String beginTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 0, 0, 0));
			String endTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 23, 59, 59));
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
	}
	
	private static String getHtmlInfo(List<WXPayShopReport> wxpPayShopReports,int totalShopOrderPrice){
		String html = "<html><head><title></title></head><body>"
					 + "<table border='1' cellpadding='1' cellspacing='1' style='width: 1000px;'>"
					 + "<tbody> <tr> <td> 店铺ID</td> <td> 店铺名称</td> <td> 订单报告日期</td> <td> 微信订单总数</td><td> 微信订单总额(元)</td> <td colspan='4' align='center'> 每笔订单详情</td><td> 总计(元)</td> </tr>";
					 
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
		orderInfoHtml = orderInfoHtml + "<tr> <td rowspan='"+rowspan+"'>"+wxPayShopReport.getShopId()+"</td> <td rowspan='"+rowspan+"'>"+wxPayShopReport.getShopName()+"</td> <td rowspan='"+rowspan+"'>"+wxPayShopReport.getReportDate()+"</td> <td rowspan='"+rowspan+"'>"+wxPayShopReport.getOrderCount()+"</td>"
				                      +"<td rowspan='"+rowspan+"'>"+wxPayShopReport.getTotalPrice()+""+"</td>";
		if(loopCount == i){
			orderInfoHtml = orderInfoHtml + "<td nowrap> 订单时间</td> <td align='center'> 下单金额(元)</td> <td align='center'> 优惠券金额(元)</td> <td align='center'> 最终金额(元)</td><td rowspan='$1'>"+totalShopOrderPriceStr+"</td></tr>";
		}else {
			orderInfoHtml = orderInfoHtml + "<td nowrap> 订单时间</td> <td align='center'> 下单金额(元)</td> <td align='center'> 优惠券金额(元)</td> <td align='center'> 最终金额(元)</td> </tr>";
		}
		
		for(WXPayDetail wxpayDetail : shopOrderFlows){
			orderInfoHtml = orderInfoHtml + "<tr><td>"+wxpayDetail.getOrderTimeStr()+"</td><td>"+wxpayDetail.getOrderPrice()+"</td> <td>"+wxpayDetail.getWxDiscount()+"</td> <td>"+wxpayDetail.getRealPrice()+"</td></tr>";
		}
	}
	orderInfoHtml = orderInfoHtml + "</tbody> </table> </body> </html>";
	orderInfoHtml = orderInfoHtml.replace("$1", totalRowSpan+"");
	return html + orderInfoHtml;
	}
}
