package com.renren.ntc.sg.bean;

import java.util.List;

public class WXPayShopReport {
	private long shopId;
	private String shopName;
	private int orderCount;
	private String reportDate;
	private float totalPrice;
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
		private String orderId;
		private String refundDes;//退款状态
		private float refundPrice;
		private String refundStatus;//是否申请退款

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

		public String getRefundDes() {
			return refundDes;
		}

		public void setRefundDes(String refundDes) {
			this.refundDes = refundDes;
		}

		public float getRefundPrice() {
			return refundPrice;
		}

		public void setRefundPrice(float refundPrice) {
			this.refundPrice = refundPrice;
		}

		public String getRefundStatus() {
			return refundStatus;
		}

		public void setRefundStatus(String refundStatus) {
			this.refundStatus = refundStatus;
		}
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
}
