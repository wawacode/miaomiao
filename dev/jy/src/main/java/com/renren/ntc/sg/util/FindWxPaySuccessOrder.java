package com.renren.ntc.sg.util;

import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.service.WXService;

public class FindWxPaySuccessOrder {
	public static void main(String[] args) {
		RoseAppContext rose = new RoseAppContext();
		ShopDAO shopDAO = rose.getBean(ShopDAO.class);
		WXService XService =  rose.getBean(WXService.class);
		OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		List<Shop> shops = shopDAO.getAllShopsByAudit(1);
		for(Shop shop : shops){
			List<Order> orders = orderDao.getWxUnfinishedOrders(SUtils.generOrderTableName(shop.getId()), shop.getId(), "2015-04-19 15:00:00", "2015-04-19 17:00:00");
			for(Order order : orders){
			 JSONObject result = XService.queryPaySuc(order.getId()+"");
			 if(result !=null){
				String tradeState =  (String)result.get("trade_state");
				System.out.println("shop_id="+shop.getId()+"shop_name="+shop.getName()+"orderID="+order.getId()+",result="+tradeState);
			 }
			}
		}
		
	}
}
