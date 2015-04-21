package com.renren.ntc.sg.constant;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;


public enum OrderStatus {
	TOCONFIREMED(0,"订单待确认"),DELIVERIES(1,"配送中"),USERCANCEL(2,"用户取消订单"),BOSSCANCEL(3,"商家取消订单"),CONFIREMED(4,"确认收货"), KFCANCEL(5,"客服取消订单");
	private int code;
	private String desc;
	private static final Map<Integer, String> orderStatusMap = new HashMap<Integer, String>();  
	  
    static {  
        for (OrderStatus s : EnumSet.allOf(OrderStatus.class)) {  
        	orderStatusMap.put(s.getCode(), s.getDesc()); 
        }  
    }
	private OrderStatus(int code,String desc){
		this.code = code;
		this.desc = desc;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
	public static String getOrderStatusByCode(int code){
		return orderStatusMap.get(code);
	}
}
