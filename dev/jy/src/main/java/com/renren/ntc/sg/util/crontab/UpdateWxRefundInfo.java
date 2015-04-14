package com.renren.ntc.sg.util.crontab;

import java.util.Date;
import java.util.List;
import java.util.concurrent.LinkedBlockingQueue;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;

/**
 * 更新退款的订单状态
 * @author chunhai.li
 *
 */
public class UpdateWxRefundInfo {
	private static final int THREAD_COUNT =5;
	private static final int REFUND_SUC_FLAG = 3;
	private static final int REFUND_FAIL_FLAG = 0;
	private static LinkedBlockingQueue<Order> orderQueue = new LinkedBlockingQueue<Order>(1000); 
	public UpdateWxRefundInfo(){
//		for(int i=0;i<THREAD_COUNT;i++){
//			Thread thread = new Thread(new UpdateWxRefundThread(orderQueue,"update-thread-"+i));
//			thread.start();
//		}
	}
	
	public static void main(String[] args) {
//		new UpdateWxRefundInfo();
//		java.util.Timer timer = new java.util.Timer(); 
//		timer.schedule(new TimerTask() {
//			@Override
//			public void run() {
//				System.out.println("update start time="+Dateutils.tranferDate2Str(new Date()));
//				processUpdateRefund(Dateutils.tranferDate2Str(new Date()));
//				System.out.println("update end time="+Dateutils.tranferDate2Str(new Date()));
//			}
//		}, 0, 30*60*1000);	
	}
	
	public static void processUpdateRefund(String beginTimeStr,String endTimeStr){
		long start = System.currentTimeMillis();
		RoseAppContext rose = new RoseAppContext();
		WXService wxservice = rose.getBean(WXService.class);
        ShopDAO  shopDao = rose.getBean(ShopDAO.class);
        OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		List<Shop> shops = shopDao.getAllShopsByAudit(1);
		for(Shop shop:shops){
			List<Order> orders = orderDao.getShopPayDetail(SUtils.generOrderTableName(shop.getId()), shop.getId(),beginTimeStr,endTimeStr);
			for(Order order : orders){
				try {
					updateOrderRefund(order, orderDao, wxservice);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		long end = System.currentTimeMillis();
		System.out.println("time ="+Dateutils.tranferDate2Str(new Date())+",updateOrderRefund done cost="+(end - start));
	}
	
	private static void updateOrderRefund(Order order,OrdersDAO orderDao,WXService wxservice){
		String orderTime = Dateutils.tranferDate2Str(order.getCreate_time());
		String result = wxservice.getWxRefundInfo(order.getOrder_id());
		if(StringUtils.isBlank(result)){
			LoggerUtils.getInstance().log("shopid="+order.getShop_id()+",orderid="+order.getId()+",create_time="+orderTime+",没有退款");
			return;
		}
		JSONObject resultJson = JSONObject.parseObject(result);
		String refundFee = StringUtils.isBlank(resultJson.getString("refund_fee")) ? "0":resultJson.getString("refund_fee");
		String refundCode = StringUtils.isBlank(resultJson.getString("result_code")) ? "":resultJson.getString("result_code");
		String refundStatus = StringUtils.isBlank(resultJson.getString("refund_status")) ? "":resultJson.getString("refund_status");
		JSONObject refundInfo = new JSONObject();
		refundInfo.put("refund_fee", refundFee);
		refundInfo.put("refund_status", refundStatus);
		int refundCodeInt = "SUCCESS".equals(refundCode) ? REFUND_SUC_FLAG : REFUND_FAIL_FLAG;
		int updateFlag = orderDao.updateWXRefund(order.getId(), order.getShop_id(),refundCodeInt, refundInfo.toJSONString(), SUtils.generOrderTableName(order.getShop_id()));
		if(updateFlag == 1){
			LoggerUtils.getInstance().log("shopid="+order.getShop_id()+",orderid="+order.getId()+",create_time="+orderTime+",refundCode="+refundCodeInt+",refundInfo="+refundInfo.toJSONString()+",update suc");
		}else {
			LoggerUtils.getInstance().log("shopid="+order.getShop_id()+",orderid="+order.getId()+",create_time="+orderTime+",refundCode="+refundCodeInt+",refundInfo="+refundInfo.toJSONString()+",update failed");
		}
}
}
