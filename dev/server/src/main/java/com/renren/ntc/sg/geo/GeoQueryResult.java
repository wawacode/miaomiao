package com.renren.ntc.sg.geo;


public class GeoQueryResult implements Comparable<GeoQueryResult> {

	private ShopLocation shopLocation;
	
	private double distance;

	public ShopLocation getShopLocation() {
		return shopLocation;
	}

	public void setShopLocation(ShopLocation shopLocation) {
		this.shopLocation = shopLocation;
	}

	public double getDistance() {
		return distance;
	}

	public void setDistance(double distance) {
		this.distance = distance;
	}


	@Override
	public int compareTo(GeoQueryResult o) {
		return this.distance <= o.distance ? -1 : 1;
	}
	
}
