package com.renren.ntc.sg.util;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.OrderStatus;
import com.renren.ntc.sg.constant.ShopInfo;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.SMSService;
/**
 * 每天晚上12点给老板发短信 
 * 今日xxx微信支付确认收货共计xx单，收到微信支付货款xx.xx元。（注：用户点击“确认收货”则配送成功）
 * @author chunhai.li
 *
 */
public class DaliyWxOrder2BossSms {
	//public static boolean isRun = true;
	public static void main(String[] args) {
		String dateStr = args[0];
		int dateInt = Integer.parseInt(dateStr);
		RoseAppContext rose = new RoseAppContext();
		ShopDAO shopDAO = rose.getBean(ShopDAO.class);
		OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		SMSService sMSService = rose.getBean(SMSService.class);
		Date beginDate = Dateutils.getDateByCondition(dateInt, 0, 0, 0);
		Date endDate = Dateutils.getDateByCondition(dateInt, 23, 59, 59);
		String beginTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 0, 0, 0));
		String endTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 23, 59, 59));
		String now = Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(dateInt, 0, 0, 0));
		List<Shop> shops = shopDAO.getAllShopsInfoByAudit(1);
		for(Shop shop : shops){
			if(ShopInfo.isExistReport(shop.getId())){
            	continue;
            }
			String shopName = StringUtils.isBlank(shop.getName()) ? "" :shop.getName();
			List<Order> orders = orderDao.getWXReportDetailByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(), beginTimeStr, endTimeStr);
			int totalPrice = 0;
			int confirmPrice = 0;
			int orderSize = 0;
			int orderConfirmSize = 0;
			for(Order order : orders){
				boolean isToday = Dateutils.isBetweenDate(beginDate, endDate, order.getCreate_time());
				Date confirmTime = order.getUser_confirm_time();
				boolean isConfirmToday = false;
				if(confirmTime != null){
					isConfirmToday = Dateutils.isBetweenDate(beginDate, endDate, confirmTime);
				}
				if(isToday){
					orderSize++;
					totalPrice += order.getPrice();
				}
				if(order.getOrder_status() == OrderStatus.CONFIREMED.getCode()){
					if(isConfirmToday){
					System.out.println("shop_id="+shop.getId()+"confirm,"+"orderid="+order.getId());
					confirmPrice += order.getPrice();
					orderConfirmSize++;
					}
				}
			}
			try {
			 String message = Constants.SEND_BOSS_WX_PAY_BY_USER_CONFIRM_SMS.replace("{date}", now).replace("{totalCount}", orderSize+"").replace("{total_price}", ((float)totalPrice/100)+"").replace("{confirm_price}", ((float)confirmPrice/100)+"").replace("{confirm_count}", orderConfirmSize+"").replace("{final_confirm_price}", ((float)confirmPrice/100)+"").replace("{shop_name}", shopName);
			 LoggerUtils.getInstance().log("send wx total pay to boss shopid="+shop.getId()+",message="+message);
			 message = SUtils.span(message);
	         message = URLEncoder.encode(message, "utf-8");
		     sMSService.sendSmsInfo(Constants.SEND_BOSS_WX_PAY_BY_USER_CONFIRM_SMS_TID, shop.getOwner_phone(), message, "send wx total pay to boss shopid="+shop.getId());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
