package com.renren.ntc.sg.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Boss;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.WXFinalPayBossShopReport;
import com.renren.ntc.sg.bean.WXFinalPayBossShopReport.WXPayDetail;
import com.renren.ntc.sg.biz.dao.BossDAO;
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
public class DaliyWxFinalOrderDetailUtil {
	//public static boolean isRun = true;
	public static void main(String[] args) {
		String mailListStr = args[0];
		String dateStr = args[1];
		int dateInt = Integer.parseInt(dateStr);
		String[] mailLists = mailListStr.split(",");
		RoseAppContext rose = new RoseAppContext();
		ShopDAO shopDAO = rose.getBean(ShopDAO.class);
		OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		BossDAO bossDAO = rose.getBean(BossDAO.class);
		Date beginDate = Dateutils.getDateByCondition(dateInt, 0, 0, 0);
		Date endDate = Dateutils.getDateByCondition(dateInt, 23, 59, 59);
		String beginTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 0, 0, 0));
		String endTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 23, 59, 59));
		List<Shop> shops = shopDAO.getAllShopsByAudit(1);
		List<WXFinalPayBossShopReport> wxpayShopReports = new ArrayList<WXFinalPayBossShopReport>();
		int totalKfCancelPrice = 0;
		int totalWxOrderPrice = 0;//微信订单总额
		for(Shop shop : shops){
			//System.out.println("shopid="+shop.getId()+",name="+shop.getName());
			Boss boss = bossDAO.getBoss(shop.getId());
			String bossName = "";
			if(boss != null){
				bossName = boss.getName();
				bossName = StringUtils.isBlank(bossName)?"":bossName;
			}
			List<Order> orders = orderDao.getWXReportDetailByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(),beginTimeStr,endTimeStr);
			WXFinalPayBossShopReport wShopReport = new WXFinalPayBossShopReport();
			wShopReport.setShopId(shop.getId());
			wShopReport.setShopName(shop.getName());
			//System.out.println("wShopReport shopid="+wShopReport.getShopId()+",name="+wShopReport.getShopName());
			wShopReport.setReportDate(Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(dateInt, 23, 0, 0)));
			List<WXPayDetail> wxpDetails = new ArrayList<WXPayDetail>();
			int totalConfirmPrice = 0;
			int kfCancelPrice = 0;
			int totalPrice = 0;
			int orderSize =0;
			for(Order order : orders){
				WXPayDetail  wxpDetail = wShopReport.new WXPayDetail();
				Date orderCreateTime = order.getCreate_time();
				boolean isToday = Dateutils.isBetweenDate(beginDate, endDate, orderCreateTime);
				if(isToday){
					orderSize++;
					totalPrice += order.getPrice();
				}
				wxpDetail.setOrderPrice((float)order.getPrice()/100);
				wxpDetail.setOrderId(order.getOrder_id());
				if(order.getOrder_status() == OrderStatus.CONFIREMED.getCode()){
					if(isToday){
					totalConfirmPrice +=order.getPrice();
					}
				}else if(order.getOrder_status() == OrderStatus.KFCANCEL.getCode()){
					if(isToday){
						kfCancelPrice += order.getPrice();
					}
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
				if(isToday){
					wxpDetails.add(wxpDetail);	
				}
			}
			wShopReport.setWxOrderSize(orderSize);
			totalWxOrderPrice += totalPrice;
			totalKfCancelPrice += kfCancelPrice;
			wShopReport.setWxTotalPrice((float)totalPrice/100);
			wShopReport.setRealPayPrice((float)(totalPrice - kfCancelPrice)/100);
			wShopReport.setTotalConfirmPrice((float)totalConfirmPrice/100);
			wShopReport.setTotalCancelPrice((float)kfCancelPrice/100);
			wShopReport.setShopOrderFlows(wxpDetails);
			wShopReport.setBossName(bossName);
			wxpayShopReports.add(wShopReport);
			
			//System.out.println("shopid="+shop.getId()+",shopname="+shop.getName()+",微信支付总价="+(price/100));
		}
		MailSendServer mailSendServer = com.renren.ntc.sg.mail.MailSendServer.getServer("smtp.163.com", 25, "lee_yeah1@163.com", "Lee1qaz2wsx",
	              "lee_yeah1@163.com");
		  mailSendServer.sendTextInfo(new MailSendInfo("喵喵微信支付每日订单详情(每日的微信支付和每日用户点击确认订单的列表)",getHtmlInfo(wxpayShopReports,totalWxOrderPrice,totalKfCancelPrice), mailLists, new String[0]),false);
		  //isRun = false;
	}
	
	private static String getHtmlInfo(List<WXFinalPayBossShopReport> wxpPayShopReports,int totalWxOrderPrice,int totalCancelPrice){
		String html = "<html><head><title></title></head><body>"
					 + "<table border='1' cellpadding='1' cellspacing='1' style='width: 1000px;'>"
					 + "<tbody> <tr> <td nowrap> 店铺ID</td> <td nowrap> 店铺名称</td><td nowrap> 老板姓名</td> <td nowrap> 订单报告日期</td> <td nowrap> 微信订单总数</td><td nowrap> 微信订单总额(元)</td><td nowrap> 微信用户确认订单总额(元)</td><td nowrap> 微信客服取消订单总额</td><td nowrap> 打款总额(元)</td> <td colspan='7'> 每笔订单详情</td><td> 微信订单总计(元)</td><td> 打款总计(元)</td> </tr>";
					 
    String orderInfoHtml = "";
    String totalWxOrderPriceStr = (float)totalWxOrderPrice/100+"";
    String totalRealPayPriceStr = (float)(totalWxOrderPrice-totalCancelPrice)/100+"";
    int loopCount =1;
    int i=0;
    int totalRowSpan=0;
	for(WXFinalPayBossShopReport wxPayShopReport : wxpPayShopReports){
		i++;
		System.out.println("====>"+wxPayShopReport.getShopName());
		List<WXPayDetail> shopOrderFlows = wxPayShopReport.getShopOrderFlows();
		int rowspan = shopOrderFlows.size() + 1;
		totalRowSpan +=rowspan;
		orderInfoHtml = orderInfoHtml + "<tr> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getShopId()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getShopName()+"</td><td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getBossName()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getReportDate()+"</td><td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getWxOrderSize()+"</td> <td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getWxTotalPrice()+"</td>"
				                      +"<td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getTotalConfirmPrice()+""+"</td>"
		                              +"<td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getTotalCancelPrice()+""+"</td>"
		                              +"<td nowrap rowspan='"+rowspan+"'>"+wxPayShopReport.getRealPayPrice()+""+"</td>";
		if(loopCount == i){
			orderInfoHtml = orderInfoHtml + "<td nowrap> 订单时间</td> <td align='center'> 订单号</td> <td nowrap align='center'> 下单金额(元)</td> <td nowrap align='center'> 优惠券金额(元)</td> <td nowrap align='center'> 最终金额(元)</td><td nowrap align='center'> 用户点击确认收货的时间</td><td nowrap align='center'> 客服点击退单</td><td nowrap rowspan='$1'>"+totalWxOrderPriceStr+"</td><td nowrap rowspan='$1'>"+totalRealPayPriceStr+"</td></tr>";
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
			Date confirmTime = order.getUser_confirm_time();
			String userConfirmTimeStr = "";
			if(confirmTime != null){
				userConfirmTimeStr = Dateutils.tranferDate2Str(confirmTime);
			}
			//System.out.println(JSON.toJSONString(order));
			wxpDetail.setClickConfirmTime(userConfirmTimeStr);
			wxpDetail.setKfCancel(false);
		}else if(order.getOrder_status() == OrderStatus.KFCANCEL.getCode()){
			wxpDetail.setClickConfirmTime("");
			wxpDetail.setKfCancel(true);
		}else {
			wxpDetail.setClickConfirmTime("");
			wxpDetail.setKfCancel(false);
		}
	}
}
