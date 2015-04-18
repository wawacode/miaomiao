package com.renren.ntc.sg.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.WXPayBossShopReport;
import com.renren.ntc.sg.bean.WXPayBossShopReport.WXPayDetail;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.OrderStatus;
import com.renren.ntc.sg.mail.MailSendInfo;
import com.renren.ntc.sg.mail.MailSendServer;
/**
 * 打印微信每日订单 (今天的货到付款和今天用户点击确认订单的列表)
 * @author chunhai.li
 *
 */
public class DaliyWxOrderDetailUtil {
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
		List<Shop> shops = shopDAO.getAllShopsByAudit(1);
		List<WXPayBossShopReport> wxpayShopReports = new ArrayList<WXPayBossShopReport>();
		int totalConfirmOrderPrice = 0;
		int totalKfCancelPrice = 0;
		for(Shop shop : shops){
			//System.out.println("shopid="+shop.getId()+",name="+shop.getName());
			List<Order> orders = orderDao.getShopPayDetailByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(),beginTimeStr,endTimeStr);
			int orderSize = orders == null ? 0 : orders.size();
			WXPayBossShopReport wShopReport = new WXPayBossShopReport();
			wShopReport.setShopId(shop.getId());
			wShopReport.setShopName(shop.getName());
			//System.out.println("wShopReport shopid="+wShopReport.getShopId()+",name="+wShopReport.getShopName());
			wShopReport.setReportDate(Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(dateInt, 23, 0, 0)));
			List<WXPayDetail> wxpDetails = new ArrayList<WXPayDetail>();
			int totalConfirmPrice = 0;
			int kfCancelPrice = 0;
			int totalConfirmOrderCount =0;
			int totalCancelOrderCount = 0;
			for(Order order : orders){
				WXPayDetail  wxpDetail = wShopReport.new WXPayDetail();
				wxpDetail.setOrderPrice((float)order.getPrice()/100);
				wxpDetail.setOrderId(order.getOrder_id());
				if(order.getOrder_status() == OrderStatus.CONFIREMED.getCode()){
					totalConfirmPrice +=order.getPrice();
					totalConfirmOrderCount++;
				}else {
					kfCancelPrice += order.getPrice();
					totalCancelOrderCount++;
				}
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
			
			totalKfCancelPrice += kfCancelPrice;
			totalConfirmOrderPrice += totalConfirmPrice;
			wShopReport.setTotalConfirmPrice((float)totalConfirmPrice/100);
			wShopReport.setTotalCancelPrice((float)kfCancelPrice/100);
			wShopReport.setShopOrderFlows(wxpDetails);
			wShopReport.setOrderConfirmCount(totalConfirmOrderCount);
			wShopReport.setOrderCancelCount(totalCancelOrderCount);
			wxpayShopReports.add(wShopReport);
			
			//System.out.println("shopid="+shop.getId()+",shopname="+shop.getName()+",微信支付总价="+(price/100));
		}
		MailSendServer mailSendServer = com.renren.ntc.sg.mail.MailSendServer.getServer("smtp.163.com", 25, "lee_yeah1@163.com", "Lee1qaz2wsx",
	              "lee_yeah1@163.com");
		  mailSendServer.sendTextInfo(new MailSendInfo("喵喵微信支付每日订单详情(每日的货到付款和每日用户点击确认订单的列表)",getHtmlInfo(wxpayShopReports,totalConfirmOrderPrice,totalKfCancelPrice), mailLists, new String[0]),false);
		  //isRun = false;
	}
	
	private static String getHtmlInfo(List<WXPayBossShopReport> wxpPayShopReports,int totalConfirmPrice,int totalCancelPrice){
		String html = "<html><head><title></title></head><body>"
					 + "<table border='1' cellpadding='1' cellspacing='1' style='width: 1000px;'>"
					 + "<tbody> <tr> <td nowrap> 店铺ID</td> <td nowrap> 店铺名称</td> <td nowrap> 订单报告日期</td> <td nowrap> 微信确认订单总数</td><td nowrap> 微信确认订单总额(元)</td><td nowrap> 微信客服取消订单总数</td><td nowrap> 微信客服取消订单总额(元)</td> <td colspan='7'> 每笔订单详情</td><td> 用户点击确认总计(元)</td><td> 客服点击取消总计(元)</td> </tr>";
					 
    String orderInfoHtml = "";
    String totalConfirmPriceStr = (float)totalConfirmPrice/100+"";
    String totalCancelPriceStr = (float)totalCancelPrice/100+"";
    int loopCount =1;
    int i=0;
    int totalRowSpan=0;
	for(WXPayBossShopReport wxPayShopReport : wxpPayShopReports){
		i++;
		System.out.println("====>"+wxPayShopReport.getShopName());
		List<WXPayDetail> shopOrderFlows = wxPayShopReport.getShopOrderFlows();
		int rowspan = shopOrderFlows.size() + 1;
		totalRowSpan +=rowspan;
		orderInfoHtml = orderInfoHtml + "<tr> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getShopId()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getShopName()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getReportDate()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getOrderConfirmCount()+"</td>"
				                      +"<td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getTotalConfirmPrice()+""+"</td>"
				                      +"<td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getOrderCancelCount()+""+"</td>"
		                              +"<td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getTotalCancelPrice()+""+"</td>";
		if(loopCount == i){
			orderInfoHtml = orderInfoHtml + "<td nowrap> 订单时间</td> <td align='center'> 订单号</td> <td nowrap align='center'> 下单金额(元)</td> <td nowrap align='center'> 优惠券金额(元)</td> <td nowrap align='center'> 最终金额(元)</td><td nowrap align='center'> 用户点击确认收货的时间</td><td nowrap align='center'> 客服点击退单</td><td nowrap rowspan='$1'>"+totalConfirmPriceStr+"</td><td nowrap rowspan='$1'>"+totalCancelPriceStr+"</td></tr>";
		}else {
			orderInfoHtml = orderInfoHtml + "<td nowrap> 订单时间</td> <td align='center'> 订单号</td> <td nowrap align='center'> 下单金额(元)</td> <td nowrap align='center'> 优惠券金额(元)</td> <td nowrap align='center'> 最终金额(元)</td><td nowrap align='center'> 用户点击确认收货的时间</td><td nowrap align='center'> 客服点击退单</td></tr>";
		}
		
		for(WXPayDetail wxpayDetail : shopOrderFlows){
			if(!wxpayDetail.isKfCancel()){
				orderInfoHtml = orderInfoHtml + "<tr><td nowrap>"+wxpayDetail.getOrderTimeStr()+"</td><td align='center'>"+wxpayDetail.getOrderId()+"<td align='center'>"+wxpayDetail.getOrderPrice()+"</td> <td align='center'>"+wxpayDetail.getWxDiscount()+"</td> <td align='center'>"+wxpayDetail.getRealPrice()+"</td><td align='center'>"+wxpayDetail.getClickConfirmTime()+"</td><td align='center'>"+(wxpayDetail.isKfCancel()?"是":"否")+"</td></tr>";
			}else {
				orderInfoHtml = orderInfoHtml + "<tr bgcolor='red'><td nowrap>"+wxpayDetail.getOrderTimeStr()+"</td><td align='center'>"+wxpayDetail.getOrderId()+"<td align='center'>"+wxpayDetail.getOrderPrice()+"</td> <td align='center'>"+wxpayDetail.getWxDiscount()+"</td> <td align='center'>"+wxpayDetail.getRealPrice()+"</td><td align='center'>"+wxpayDetail.getClickConfirmTime()+"</td><td align='center'>"+(wxpayDetail.isKfCancel()?"是":"否")+"</td></tr>";
			}
			
		}
	}
	orderInfoHtml = orderInfoHtml + "</tbody> </table> </body> </html>";
	orderInfoHtml = orderInfoHtml.replace("$1", totalRowSpan+"");
	return html + orderInfoHtml;
	}
	private static void processWxRefund(Order order,WXPayDetail wxpDetail){
		if(order.getOrder_status() == OrderStatus.CONFIREMED.getCode()){
			wxpDetail.setTodayClickConfirm(true);
			Date confirmTime = order.getUser_confirm_time();
			String userConfirmTimeStr = "";
			if(confirmTime == null){
				userConfirmTimeStr = Dateutils.tranferDate2Str(confirmTime);
			}
			System.out.println(JSON.toJSONString(order));
			wxpDetail.setClickConfirmTime(userConfirmTimeStr);
			wxpDetail.setKfCancel(false);
		}else {
			wxpDetail.setClickConfirmTime("");
			wxpDetail.setTodayClickConfirm(false);
			wxpDetail.setKfCancel(true);
		}
	}
}
