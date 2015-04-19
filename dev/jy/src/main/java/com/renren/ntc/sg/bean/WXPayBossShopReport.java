package com.renren.ntc.sg.bean;

import java.util.List;

public class WXPayBossShopReport {
	private long shopId;
	private String shopName;
	private int orderConfirmCount;
	private int orderCancelCount;
	private String reportDate;
	private float totalConfirmPrice;
	private float totalCancelPrice;
	private List<WXPayDetail> shopOrderFlows;

	public WXPayBossShopReport() {

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
		private String orderId;
		private boolean isTodayClickConfirm;//是否今日点击确认
		private String clickConfirmTime;//用户点击确认收货的时间
		private boolean isKfCancel;//是否用户点击退单

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

		public String getOrderId() {
			return orderId;
		}

		public void setOrderId(String orderId) {
			this.orderId = orderId;
		}

		public boolean isTodayClickConfirm() {
			return isTodayClickConfirm;
		}

		public void setTodayClickConfirm(boolean isTodayClickConfirm) {
			this.isTodayClickConfirm = isTodayClickConfirm;
		}

		public String getClickConfirmTime() {
			return clickConfirmTime;
		}

		public void setClickConfirmTime(String clickConfirmTime) {
			this.clickConfirmTime = clickConfirmTime;
		}

		public boolean isKfCancel() {
			return isKfCancel;
		}

		public void setKfCancel(boolean isKfCancel) {
			this.isKfCancel = isKfCancel;
		}
	}
	public float getTotalConfirmPrice() {
		return totalConfirmPrice;
	}

	public void setTotalConfirmPrice(float totalConfirmPrice) {
		this.totalConfirmPrice = totalConfirmPrice;
	}

	public float getTotalCancelPrice() {
		return totalCancelPrice;
	}

	public void setTotalCancelPrice(float totalCancelPrice) {
		this.totalCancelPrice = totalCancelPrice;
	}

	public int getOrderConfirmCount() {
		return orderConfirmCount;
	}

	public void setOrderConfirmCount(int orderConfirmCount) {
		this.orderConfirmCount = orderConfirmCount;
	}

	public int getOrderCancelCount() {
		return orderCancelCount;
	}

	public void setOrderCancelCount(int orderCancelCount) {
		this.orderCancelCount = orderCancelCount;
	}
}
