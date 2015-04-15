package com.renren.ntc.sg.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.OrderDetail;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.OrderStatus;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-21
 * Time: 上午11:29
 * To change this template use File | Settings | File Templates.
 */
@Service
public class OrderService {


    @Autowired
    public ShopDAO shopDAO;


    @Autowired
    public AddressService addressService;

    public  List<Order> forV(List<Order> orders) {
        List<Order> oo =   new ArrayList<Order>();
        int first = 0 ;
        for (Order o : orders) {
            Address adr = addressService.getAddress(o.getAddress_id());
            if( null == adr ) {
                LoggerUtils.getInstance().log(String.format("Miss address drop order %s " ,o.getOrder_id()) );
                continue;
            }
            o.setPhone(adr.getPhone());
            o.setAddress(adr.getAddress());
            o.setStatus4V(toStr(o.getStatus(), first));
            String msg = o.getMsg();
            JSONObject js = (JSONObject) JSON.parse(msg);
            if (null != js){
                try {
                    o.setConfirm(js.getString("confirm"));
                    int dprice = js.getInteger("discount");
                    o.setDprice(dprice );
                }catch (Exception e){
                    LoggerUtils.getInstance().log("error" + e.getMessage());
                }
            }
            o.setPrice4V(((float) o.getPrice() / 100) + "");
            Shop shop = shopDAO.getShop(o.getShop_id());
            o.setShop_name4V(shop.getName());
            oo.add(o);
            first ++;
        }
        return oo;
    }
    
    public void f(List<Order> orderls) {
        for ( Order o : orderls){
        JSONArray j  = (JSONArray) JSON.parse(o.getInfo());
        StringBuffer sb = new StringBuffer();
        for (int k=0 ; k<j.size() ; k++){
            JSONObject jb = (JSONObject) j.get(k);
            sb.append(jb.getString("name"));
            sb.append("数量");
            sb.append(jb.getString("count"));
            sb.append("单价");
            sb.append(jb.getFloat("price")/100);
            sb.append(";<br/>");
        }
         o.setInfo(sb.toString());
        }
    }
    
    public List<OrderDetail> setOrderDetail(List<Order> orderls) {
    	List<OrderDetail> orderDetails = new ArrayList<OrderDetail>();
        for ( Order o : orderls){
        JSONArray j  = (JSONArray) JSON.parse(o.getInfo());
        StringBuffer sb = new StringBuffer();
        for (int k=0 ; k<j.size() ; k++){
            JSONObject jb = (JSONObject) j.get(k);
            sb.append(jb.getString("name"));
            sb.append("数量");
            sb.append(jb.getString("count"));
            sb.append("单价");
            sb.append(jb.getFloat("price")/100);
            sb.append(";<br/>");
        }
         o.setInfo(sb.toString());
         OrderDetail orderDetail = new OrderDetail();
         orderDetail.setOrder(o);
         transferStatusInfo(orderDetail);
         orderDetails.add(orderDetail);
        }
        return orderDetails;
    }
    
    public void transferStatusInfo(OrderDetail orderDetail) {
    	JSONObject orderInfo  = (JSONObject) JSON.parse(orderDetail.getOrder().getOrder_info());
        if(orderInfo !=null){
        	//展示是否有催单以及催单的时间
        	String remindOrderFlag = (String)orderInfo.get("remind_order");
            String remindOrderTime = (String)orderInfo.get("remind_time");
            if(StringUtils.isNotBlank(remindOrderFlag) && Constants.REMIND_ORDER.equals(remindOrderFlag)){
           	 	orderDetail.setRemindDes("有");
            }else {
            	orderDetail.setRemindDes("无");
			}
            if(StringUtils.isNotBlank(remindOrderTime)){
           	 	orderDetail.setRemindTime(remindOrderTime);
            }else {
            	orderDetail.setRemindTime("");
			}
        }else {
			orderDetail.setRemindDes("无");
			orderDetail.setRemindTime("");
		}
        String orderStatus = OrderStatus.getOrderStatusByCode(orderDetail.getOrder().getOrder_status());
        if(StringUtils.isBlank(orderStatus)){
        	orderDetail.setOrderStatusDes("空");
        }else {
			orderDetail.setOrderStatusDes(orderStatus);
		}
        // 只有确认订单和客服点击退单后才不用显示退单的按钮
        if(orderDetail.getOrder().getOrder_status() == OrderStatus.CONFIREMED.getCode()||
        		orderDetail.getOrder().getOrder_status() == OrderStatus.KFCANCEL.getCode()){
        	orderDetail.setShowCancel(false);
        }else {
			orderDetail.setShowCancel(true);
		}
        //只有待确认的订单才会展示 确认配送的按钮 （老板忘点击了 客服帮点）
        if(orderDetail.getOrder().getOrder_status() == OrderStatus.TOCONFIREMED.getCode()){
        	orderDetail.setShowConfirm(true);
        }else {
			orderDetail.setShowConfirm(false);
		}
        //只有用户点击取消订单或者是老板点击无法配送 才会展示驳回的按钮
        if(orderDetail.getOrder().getOrder_status() == OrderStatus.BOSSCANCEL.getCode() ||
        		orderDetail.getOrder().getOrder_status() == OrderStatus.USERCANCEL.getCode()){
        	orderDetail.setShowRejected(true);
        }else {
			orderDetail.setShowRejected(false);
		}
        
    }



    private String toStr(int status,int first) {
        if (first ==0 ){
            return "最新订单";
        }
        return "历史订单" ;
    }

    public void mark(String order_id,long  shop_id) {
        String order_key =  SUtils.generOrders(order_id,shop_id);
        JRedisUtil.getInstance().sadd(Constants.ORDER_KEY,order_key);

    }
    
    public JSONObject getJson(String msg){
    	JSONObject om = new JSONObject();
        try{
           om = (JSONObject) JSON.parse(msg);
        }catch (Exception e){
            e.printStackTrace();
        }
        if (null == om)  {
           om = new JSONObject();
        }
        return om;
    }
    
    public  List<Order> assembly(List<Order> orders) {
        List<Order> oo =   new ArrayList<Order>();
        int first = 0 ;
        for (Order o : orders) {
            Address adr = addressService.getAddress(o.getAddress_id());
            if( null == adr ) {
                LoggerUtils.getInstance().log(String.format("Miss address drop order %s " ,o.getOrder_id()) );
                continue;
            }
            o.setPhone(adr.getPhone());
            o.setAddress(adr.getAddress());
            o.setStatus4V(toStr(o.getStatus(), first));
            String msg = o.getMsg();
            JSONObject js = (JSONObject) JSON.parse(msg);
            if (null != js){
                try {
                    o.setConfirm(js.getString("confirm"));
                    int dprice = js.getInteger("discount");
                    o.setDprice(dprice );
                }catch (Exception e){
                    LoggerUtils.getInstance().log("error" + e.getMessage());
                }
            }
            o.setPrice4V(((float) o.getPrice() / 100) + "");
            Shop shop = shopDAO.getShop(o.getShop_id());
            o.setShop_name4V(shop.getName());
            oo.add(o);
            first ++;
        }
        return oo;
    }
}
