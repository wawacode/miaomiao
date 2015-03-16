package com.renren.ntc.sg.bean;

import java.util.List;


public class ShopOrderReport {
	private long shopId;
	private String shopName;
	private int orderCount;
	private String reportDate;
	private String totalPrice;
	private List<ShopOrderFlow> shopOrderFlows;
	public long getShopId() {
		return shopId;
	}
	public void setShopId(long shopId) {
		this.shopId = shopId;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public int getOrderCount() {
		return orderCount;
	}
	public void setOrderCount(int orderCount) {
		this.orderCount = orderCount;
	}
	public String getReportDate() {
		return reportDate;
	}
	public void setReportDate(String reportDate) {
		this.reportDate = reportDate;
	}
	public String getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}
	public List<ShopOrderFlow> getShopOrderFlows() {
		return shopOrderFlows;
	}
	public void setShopOrderFlows(List<ShopOrderFlow> shopOrderFlows) {
		this.shopOrderFlows = shopOrderFlows;
	}
	
	public class ShopOrderFlow{
		private String orderCreateTime;
		private String orderPrice;
		private String orderNo;
		public String getOrderCreateTime() {
			return orderCreateTime;
		}
		public void setOrderCreateTime(String orderCreateTime) {
			this.orderCreateTime = orderCreateTime;
		}
		public String getOrderPrice() {
			return orderPrice;
		}
		public void setOrderPrice(String orderPrice) {
			this.orderPrice = orderPrice;
		}
		public String getOrderNo() {
			return orderNo;
		}
		public void setOrderNo(String orderNo) {
			this.orderNo = orderNo;
		}
	}
}

