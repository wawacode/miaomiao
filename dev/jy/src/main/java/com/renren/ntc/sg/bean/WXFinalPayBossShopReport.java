package com.renren.ntc.sg.bean;

import java.util.List;

public class WXFinalPayBossShopReport {
	private long shopId;
	private String shopName;
	private String bossName;
	private String reportDate;
	private float totalConfirmPrice;
	private float totalCancelPrice;
	private float wxTotalPrice;
	private float realPayPrice;
	private List<WXPayDetail> shopOrderFlows;
	private int wxOrderSize;

	public WXFinalPayBossShopReport() {

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
		private boolean isKfCancel;//是否用户点击退单
		private String clickConfirmTime;//用户点击确认收货的时间

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

		public boolean isKfCancel() {
			return isKfCancel;
		}

		public void setKfCancel(boolean isKfCancel) {
			this.isKfCancel = isKfCancel;
		}

		public String getClickConfirmTime() {
			return clickConfirmTime;
		}

		public void setClickConfirmTime(String clickConfirmTime) {
			this.clickConfirmTime = clickConfirmTime;
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

	public String getBossName() {
		return bossName;
	}

	public void setBossName(String bossName) {
		this.bossName = bossName;
	}

	public float getWxTotalPrice() {
		return wxTotalPrice;
	}

	public void setWxTotalPrice(float wxTotalPrice) {
		this.wxTotalPrice = wxTotalPrice;
	}

	public float getRealPayPrice() {
		return realPayPrice;
	}

	public void setRealPayPrice(float realPayPrice) {
		this.realPayPrice = realPayPrice;
	}

	public int getWxOrderSize() {
		return wxOrderSize;
	}

	public void setWxOrderSize(int wxOrderSize) {
		this.wxOrderSize = wxOrderSize;
	}
}
