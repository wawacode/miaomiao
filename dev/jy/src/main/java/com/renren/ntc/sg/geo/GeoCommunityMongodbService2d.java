package com.renren.ntc.sg.geo;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.renren.ntc.sg.mongo.MongoDBUtil;

public class GeoCommunityMongodbService2d extends AbstractGeoMongodbService {


    public GeoCommunityMongodbService2d() {
        try {
            geoDb = MongoDBUtil.getInstance().getDB();
            if(geoDb != null) {
                super.geoTable = MongoDBUtil.getInstance().getCollectionforCommunity();
            }
        } catch (Exception e) {
            logger.error("init geo mongodb fail", e);
        }
    }

	@Override
    public ShopLocation parseUserLocation(DBObject obj) {
		ShopLocation ul = new ShopLocation();
		ul.setShop_id((Long) obj.get("shop_id"));
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
