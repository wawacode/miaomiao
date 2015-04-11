package com.renren.ntc.sg.util.crontab;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;

public class UpdateWxRefundThread implements Runnable{
	private static final int REFUND_SUC_FLAG = 3;
	private static final int REFUND_FAIL_FLAG = 0;
	private static RoseAppContext rose = new RoseAppContext();
	private static OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
	private static  WXService wxservice = rose.getBean(WXService.class);
	private LinkedBlockingQueue<Order> orderQueue;
	private String name;
	public UpdateWxRefundThread(LinkedBlockingQueue<Order> orderQueue,String name){
		this.orderQueue = orderQueue;
		this.name = name;
	}
	@Override
	public void run() {
		while(true){
			process();
		}
		
	}
	
	 public void process() {                     
	        try {
	            Order order = orderQueue.poll(3, TimeUnit.SECONDS);
	            if (order == null) {
	                return;
	            }
	            updateOrderRefund(order, orderDao, wxservice,name);
	        } catch (Exception e) {
	           e.printStackTrace();
	        }

	    }
	
	private static void updateOrderRefund(Order order,OrdersDAO orderDao,WXService wxservice,String name){
		String orderTime = Dateutils.tranferDate2Str(order.getCreate_time());
		String result = wxservice.getWxRefundInfo(order.getOrder_id());
		if(StringUtils.isBlank(result)){
			LoggerUtils.getInstance().log("threadname="+name+",shopid="+order.getShop_id()+",orderid="+order.getId()+",create_time="+orderTime+",没有退款");
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
			LoggerUtils.getInstance().log("threadname="+name+",shopid="+order.getShop_id()+",orderid="+order.getId()+",create_time="+orderTime+",refundCode="+refundCodeInt+",refundInfo="+refundInfo.toJSONString()+",update suc");
		}else {
			LoggerUtils.getInstance().log("threadname="+name+",shopid="+order.getShop_id()+",orderid="+order.getId()+",create_time="+orderTime+",refundCode="+refundCodeInt+",refundInfo="+refundInfo.toJSONString()+",update failed");
		}
	}

}
