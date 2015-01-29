package com.renren.ntc.sg.geo;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

public class GeoMongodbService2d extends AbstractGeoMongodbService {


	@Override
    public ShopLocation parseUserLocation(DBObject obj) {
		ShopLocation ul = new ShopLocation();
		ul.setShop_id((Long) obj.get("uid"));
		BasicDBList coordinateList = (BasicDBList) obj.get("loc");
		ul.setLongitude((Double)coordinateList.get(0));
		ul.setLatitude((Double)coordinateList.get(1));
		return ul;
	}
	
	@Override
    public DBObject makeLocationPoint(ShopLocation uloc) {
		BasicDBList point = new BasicDBList();
		point.add(uloc.getLongitude());
		point.add(uloc.getLatitude());
		return point;
	}

	@Override
    public DBObject makeLocationQuery(ShopLocation uloc, int maxDistance) {
		DBObject locQuery = new BasicDBObject();
		// 2d索引时，距离单位要转换为flat unit
		locQuery.put("$near", makeLocationPoint(uloc));
		locQuery.put("$maxDistance", (double)maxDistance / 111000);
		return locQuery;
	}
	
}
