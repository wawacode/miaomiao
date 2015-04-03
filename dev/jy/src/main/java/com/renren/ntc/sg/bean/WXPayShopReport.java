package com.renren.ntc.sg.bean;

import java.util.List;

public class WXPayShopReport {
	private long shopId;
	private String shopName;
	private int orderCount;
	private String reportDate;
	private List<WXPayDetail> shopOrderFlows;

	public WXPayShopReport() {

	}

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

	public List<WXPayDetail> getShopOrderFlows() {
		return shopOrderFlows;
	}

	public void setShopOrderFlows(List<WXPayDetail> shopOrderFlows) {
		this.shopOrderFlows = shopOrderFlows;
	}

	public class WXPayDetail {
		private float orderPrice;
		private float wxDiscount;
		private float realPrice;
		private String orderTimeStr;

		public float getOrderPrice() {
			return orderPrice;
		}

		public void setOrderPrice(float orderPrice) {
			this.orderPrice = orderPrice;
		}

		public float getWxDiscount() {
			return wxDiscount;
		}

		public void setWxDiscount(float wxDiscount) {
			this.wxDiscount = wxDiscount;
		}

		public float getRealPrice() {
			return realPrice;
		}

		public void setRealPrice(float realPrice) {
			this.realPrice = realPrice;
		}

		public String getOrderTimeStr() {
			return orderTimeStr;
		}

		public void setOrderTimeStr(String orderTimeStr) {
			this.orderTimeStr = orderTimeStr;
		}
	}
}
