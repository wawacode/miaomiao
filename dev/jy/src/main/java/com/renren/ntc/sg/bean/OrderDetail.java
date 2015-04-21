package com.renren.ntc.sg.bean;

public class OrderDetail{
	private String remindDes;
	private String remindTime;
	private boolean isShowCancel;
	private String orderStatusDes;
	private Order order;
	private boolean isShowConfirm;
	private boolean isShowRejected;//驳回 用户误点击退单或者是老板误点击无法配送 都会返回到最原始的状态
	private boolean isShowUserConfirm;//替代用户点击确认收货
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
	public boolean isShowConfirm() {
		return isShowConfirm;
	}
	public void setShowConfirm(boolean isShowConfirm) {
		this.isShowConfirm = isShowConfirm;
	}
	public boolean isShowRejected() {
		return isShowRejected;
	}
	public void setShowRejected(boolean isShowRejected) {
		this.isShowRejected = isShowRejected;
	}
	public boolean isShowUserConfirm() {
		return isShowUserConfirm;
	}
	public void setShowUserConfirm(boolean isShowUserConfirm) {
		this.isShowUserConfirm = isShowUserConfirm;
	}
}
