package com.renren.ntc.sg.util;

import java.io.IOException;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
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
		String beginTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 0, 0, 0));
		String endTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 23, 59, 59));
		String now = Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(dateInt, 0, 0, 0));
		List<Shop> shops = shopDAO.getAllShopsInfoByAudit(1);
		for(Shop shop : shops){
			List<Order> orders = orderDao.getUserConfirmShopDetailByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(), beginTimeStr, endTimeStr);
			int orderCount = orders.size();
			int totalPrice = 0;
			for(Order order : orders){
				totalPrice += order.getPrice();
			}
			String message = Constants.SEND_BOSS_WX_PAY_BY_USER_CONFIRM_SMS.replace("{date}", now).replace("{count}", orderCount+"").replace("{total}", ((float)totalPrice/100)+"");
			try {
				sMSService.sendSmsInfo(Constants.SEND_BOSS_WX_PAY_BY_USER_CONFIRM_SMS_TID, shop.getOwner_phone(), message, "send wx total pay to boss ");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
