package com.renren.ntc.sg.util.crontab;

import java.util.Date;
import java.util.List;
import java.util.TimerTask;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.commons.lang.StringUtils;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;

/**
 * 检查是否支付成功
 * @author chunhai.li
 *
 */
public class ValidePayOk {
	
	
	public static void main(String[] args) {
		RoseAppContext rose = new RoseAppContext();
	    ShopDAO  shopDao = rose.getBean(ShopDAO.class);
	    OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		WXService wxservice = rose.getBean(WXService.class);
		System.out.println("ValidePayOk start time="+Dateutils.tranferDate2Str(new Date()));
		processUpdateRefund(Dateutils.tranferDate2Str(new Date()),shopDao,orderDao,wxservice);
		System.out.println("ValidePayOk end time="+Dateutils.tranferDate2Str(new Date()));
	}

	
	private static void processUpdateRefund(String time,ShopDAO  shopDao,OrdersDAO orderDao,WXService wxservice){
		long start = System.currentTimeMillis();
		List<Shop> shops = shopDao.getAllShopsByAudit(1);
		for(Shop shop:shops){
			List<Order> orders = orderDao.getAllWxOrders(SUtils.generOrderTableName(shop.getId()), shop.getId());
			for(Order order : orders){
				try {
					validePay(order, orderDao, wxservice);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		long end = System.currentTimeMillis();
		System.out.println("time ="+time+",ValidePayOk done cost="+(end - start));
	}
	
	private static void validePay(Order order,OrdersDAO orderDao,WXService wxservice){
		String orderTime = Dateutils.tranferDate2Str(order.getCreate_time());
		JSONObject result = wxservice.queryPaySuc(order.getOrder_id());
		String tradeState = (String)result.get("trade_state");
		if(order.getStatus() == 1 || order.getStatus() == 2){
			if(StringUtils.isBlank(tradeState)){
				System.out.println("tradeState is null!!!!! shopId="+order.getShop_id()+",orderId="+order.getOrder_id()+",dborder status="+order.getStatus()+",orderTime="+orderTime+",wx result="+result.toJSONString());
			}else if (!"SUCCESS".equals(tradeState)) {
				System.out.println("error!!!!! shopId="+order.getShop_id()+",orderId="+order.getOrder_id()+",dborder status="+order.getStatus()+",orderTime="+orderTime+",wx result="+result.toJSONString());
			}else {
				System.out.println("right!!!!! shopId="+order.getShop_id()+",orderId="+order.getOrder_id()+",dborder status="+order.getStatus()+",orderTime="+orderTime+",wx result="+result.toJSONString());
			}
		}else if(order.getStatus() == 0){
			if(StringUtils.isBlank(tradeState)){
				System.out.println("status=0error!!!!! shopId="+order.getShop_id()+",orderId="+order.getOrder_id()+",dborder status="+order.getStatus()+",orderTime="+orderTime+",wx result="+result.toJSONString());
			}else {
				System.out.println("status=0andtradeStatenotnull------!!!!! shopId="+order.getShop_id()+",orderId="+order.getOrder_id()+",dborder status="+order.getStatus()+",orderTime="+orderTime+",wx result="+result.toJSONString());
			}
		}else {
			System.out.println("pppppp!!!!! shopId="+order.getShop_id()+",orderId="+order.getOrder_id()+",dborder status="+order.getStatus()+",orderTime="+orderTime+",wx result="+result.toJSONString());
		}
		
	}
}
