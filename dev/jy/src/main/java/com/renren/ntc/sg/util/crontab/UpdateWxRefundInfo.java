package com.renren.ntc.sg.util.crontab;

import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;

/**
 * 更新退款的订单状态
 * @author chunhai.li
 *
 */
public class UpdateWxRefundInfo {
	private static final int REFUND_SUC_FLAG = 1;
	private static final int REFUND_FAIL_FLAG = 0;
	public UpdateWxRefundInfo(){
	}
	
	public static void main(String[] args) {
		long start = System.currentTimeMillis();
		RoseAppContext rose = new RoseAppContext();
        ShopDAO  shopDao = rose.getBean(ShopDAO.class);
        OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
		String beginTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(0, 0, 0, 0));
		String endTimeStr = Dateutils.tranferDate2Str(Dateutils.getDateByCondition(0, 23, 59, 59));
		List<Shop> shops = shopDao.getAllShopsByAudit(1);
		 WXService wxservice = rose.getBean(WXService.class);
		for(Shop shop:shops){
			updateOrderRefund(shop, orderDao, wxservice,beginTimeStr,endTimeStr);
		}
		long end = System.currentTimeMillis();
		System.out.println("updateOrderRefund done cost="+(end - start));
			
	}
	
	private static void updateOrderRefund(Shop shop,OrdersDAO orderDao,WXService wxservice,String beginTimeStr,String endTimeStr){
		List<Order> orders = orderDao.getShopPayDetail(SUtils.generOrderTableName(shop.getId()), shop.getId(),beginTimeStr,endTimeStr);
		for(Order order : orders){
			String result = wxservice.getWxRefundInfo(order.getOrder_id());
			if(StringUtils.isBlank(result)){
				System.out.println("shopid="+shop.getId()+",orderid="+order.getId()+",没有退款");
				continue;
			}
			JSONObject resultJson = JSONObject.parseObject(result);
			String refundFee = StringUtils.isBlank(resultJson.getString("refund_fee")) ? "0":resultJson.getString("refund_fee");
			String refundCode = StringUtils.isBlank(resultJson.getString("result_code")) ? "":resultJson.getString("result_code");
			String refundStatus = StringUtils.isBlank(resultJson.getString("refund_status")) ? "":resultJson.getString("refund_status");
			JSONObject refundInfo = new JSONObject();
			refundInfo.put("refund_fee", refundFee);
			refundInfo.put("refund_status", refundStatus);
			int refundCodeInt = "SUCCESS".equals(refundCode) ? REFUND_SUC_FLAG : REFUND_FAIL_FLAG;
			int updateFlag = orderDao.updateWXRefund(order.getId(), shop.getId(),refundCodeInt, refundInfo.toJSONString(), SUtils.generOrderTableName(shop.getId()));
			if(updateFlag == 1){
				System.out.println("shopid="+shop.getId()+",orderid="+order.getId()+",refundCode="+refundCodeInt+",refundInfo="+refundInfo.toJSONString()+",update suc");
			}else {
				System.out.println("shopid="+shop.getId()+",orderid="+order.getId()+",refundCode="+refundCodeInt+",refundInfo="+refundInfo.toJSONString()+",update failed");
			}
		}
	}
}
