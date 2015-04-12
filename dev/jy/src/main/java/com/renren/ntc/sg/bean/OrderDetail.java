package com.renren.ntc.sg.bean;

public class OrderDetail{
	private String remindDes;
	private String remindTime;
	private boolean isShowCancel;
	private String orderStatusDes;
	private Order order;
	public String getRemindDes() {
		return remindDes;
	}
	public void setRemindDes(String remindDes) {
		this.remindDes = remindDes;
	}
	public boolean isShowCancel() {
		return isShowCancel;
	}
	public void setShowCancel(boolean isShowCancel) {
		this.isShowCancel = isShowCancel;
	}
	public String getOrderStatusDes() {
		return orderStatusDes;
	}
	public void setOrderStatusDes(String orderStatusDes) {
		this.orderStatusDes = orderStatusDes;
	}
	public String getRemindTime() {
		return remindTime;
	}
	public void setRemindTime(String remindTime) {
		this.remindTime = remindTime;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
}
