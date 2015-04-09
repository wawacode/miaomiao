package com.renren.ntc.sg.util.crontab;

import java.util.Date;
import java.util.List;
import java.util.TimerTask;
import java.util.concurrent.LinkedBlockingQueue;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;

/**
 * 更新退款的订单状态
 * @author chunhai.li
 *
 */
public class UpdateWxRefundInfo {
	private static final int THREAD_COUNT =5;
	private static LinkedBlockingQueue<Order> orderQueue = new LinkedBlockingQueue<Order>(1000); 
	public UpdateWxRefundInfo(){
		for(int i=0;i<THREAD_COUNT;i++){
			Thread thread = new Thread(new UpdateWxRefundThread(orderQueue,"update-thread-"+i));
			thread.start();
		}
	}
	
	public static void main(String[] args) {
		new UpdateWxRefundInfo();
		java.util.Timer timer = new java.util.Timer(); 
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				System.out.println("update start time="+Dateutils.tranferDate2Str(new Date()));
				processUpdateRefund(Dateutils.tranferDate2Str(new Date()));
				System.out.println("update end time="+Dateutils.tranferDate2Str(new Date()));
			}
		}, 0, 3000);	
	}
	
	private static void processUpdateRefund(String time){
		long start = System.currentTimeMillis();
		RoseAppContext rose = new RoseAppContext();
        ShopDAO  shopDao = rose.getBean(ShopDAO.class);
        OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
        String day = Dateutils.tranferDefaultDate2Str(new Date());
		String beginTimeStr = day + " "+"00:00:00";
		String endTimeStr = day + " "+"23:59:59";
		List<Shop> shops = shopDao.getAllShopsByAudit(1);
		for(Shop shop:shops){
			List<Order> orders = orderDao.getShopPayDetail(SUtils.generOrderTableName(shop.getId()), shop.getId(),beginTimeStr,endTimeStr);
			for(Order order : orders){
				try {
					orderQueue.put(order);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		long end = System.currentTimeMillis();
		System.out.println("time ="+time+",updateOrderRefund done cost="+(end - start));
	}
}
