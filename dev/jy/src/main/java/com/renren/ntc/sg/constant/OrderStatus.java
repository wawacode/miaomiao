package com.renren.ntc.sg.constant;

public enum OrderStatus {
	TONCONFIREMED(1,"订单待确认"),DELIVERIES(2,"配送中"),CANCLE(3,"用户取消订单"),BOSSCANCLE(4,"商家取消订单"),CONFIREMED(5,"确认收货");
	private int code;
	private String desc;
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
}
