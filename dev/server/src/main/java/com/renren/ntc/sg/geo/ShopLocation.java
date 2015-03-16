package com.renren.ntc.sg.geo;


public class ShopLocation {

	private long shop_id;
	private double longitude;
	private double latitude;

    public ShopLocation (){

    }
	public ShopLocation(long shop_id, double longitude, double latitude, boolean isAndroid) {
		this.shop_id = shop_id;
		this.longitude = longitude;
		this.latitude = latitude;
	}

	public long getShop_id() {
		return shop_id;
	}
	public void setShop_id(long shop_id) {
		this.shop_id = shop_id;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	
	


	
}
