package com.renren.ntc.sg.geo;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

public class GeoMongodbService2dSphere extends AbstractGeoMongodbService {

	public GeoMongodbService2dSphere() {
	}

	@Override
    public ShopLocation parseUserLocation(DBObject obj) {
		ShopLocation ul = new ShopLocation();
		ul.setShop_id((Long) obj.get("shop_id"));
		DBObject loc = (DBObject) obj.get("loc");
		BasicDBList coordinateList = (BasicDBList) loc.get("coordinates");
		ul.setLongitude((Double)coordinateList.get(0));
		ul.setLatitude((Double)coordinateList.get(1));
		return ul;
	}
	
	@Override
    public DBObject makeLocationPoint(ShopLocation uloc) {
		DBObject point = new BasicDBObject();
		point.put("type", "Point");
		point.put("coordinates", new double[]{uloc.getLongitude(), uloc.getLatitude()});
		return point;
	}

	@Override
    public DBObject makeLocationQuery(ShopLocation uloc, int maxDistance) {
		DBObject locQuery = new BasicDBObject();
		locQuery.put("$nearSphere", makeLocationPoint(uloc));
		locQuery.put("$maxDistance", maxDistance);
		return locQuery;
	}
	
	
}


