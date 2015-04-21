package com.renren.ntc.sg.util;

import java.util.Date;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;

public class DailyVerifyReport {
	public static void main(String[] args) {
		RoseAppContext rose = new RoseAppContext();
		String dateStr = args[0];
		int dateInt = Integer.parseInt(dateStr);
		//Date beginDate = Dateutils.getDateByCondition(dateInt, 0, 0, 0);
		//Date endDate = Dateutils.getDateByCondition(dateInt, 23, 59, 59);
		ShopDAO shopDAO = rose.getBean(ShopDAO.class);
		OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		String beginTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 0, 0, 0));
		String endTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(dateInt, 23, 59, 59));
		List<Shop> shops = shopDAO.getAllShopsByAudit(1);
		for(Shop shop : shops){
			Integer wxTotalPrice = orderDao.getWXReportTotalPriceByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(), beginTimeStr, endTimeStr);
		   List<Order> orders = orderDao.getWXReportByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(), beginTimeStr, endTimeStr);
		   for(Order order : orders){
			   System.out.println("wx shop_id="+shop.getId()+",orderno="+order.getOrder_id()+",price="+order.getPrice());
		   }
		   Integer wxuserConfirmPrice= orderDao.getWXReportUConfirmTotalPriceByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(), beginTimeStr, endTimeStr);
		   Integer wxCancelPrice = orderDao.getWXReportCancelByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(), beginTimeStr, endTimeStr);
		   if(wxTotalPrice == null){
			   wxTotalPrice = 0;
		   }
		   if(wxuserConfirmPrice ==null){
			   wxuserConfirmPrice = 0;
		   }
		   if(wxCancelPrice == null){
			   wxCancelPrice = 0;
		   }
		   List<Order> cancelOrders = orderDao.getWXReportCancelDetailByWXCondition(SUtils.generOrderTableName(shop.getId()), shop.getId(), beginTimeStr, endTimeStr);
		   for(Order cancelOrder : cancelOrders){
			   System.out.println("wx cancel shop_id="+shop.getId()+",orderno="+cancelOrder.getOrder_id()+",price="+cancelOrder.getPrice());
		   }
		   System.out.println("wx shop_id="+shop.getId()+",wxtotalPrice="+wxTotalPrice+",wxCancelPrice="+wxCancelPrice+",wxuserConfirmPrice="+wxuserConfirmPrice);
		}
	}
}
