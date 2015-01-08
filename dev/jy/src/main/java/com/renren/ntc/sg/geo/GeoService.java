package com.renren.ntc.sg.geo;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class GeoService {

	private static int DEFAULT_MAX_DISTANCE = 500 * 1000; // 50km
	private static int DEFAULT_MAX_NUM = 100;

	private static final Logger logger = Logger.getLogger(GeoService.class);

	private static GeoService instance;

	public static GeoService getInstance() {
		return instance;
	}

	private AbstractGeoMongodbService dbService;

	private GeoService() {
        dbService = new GeoMongodbService2dSphere();
	}


	public static void setDefaultMaxDistance(int distance) {
		DEFAULT_MAX_DISTANCE = distance;
	}

	public static void setDefaultMaxNum(int maxNum) {
		DEFAULT_MAX_NUM = maxNum;
	}

	/**
	 * 需要注意，数组中，经度在前，维度在后
	 *
	 * @param point1
	 * @param point2
	 * @return 返回单位是米
	 */
	public double calDistance(double[] point1, double[] point2) {
		double part1 = Math.pow(Math.sin((point1[1] - point2[1]) * Math.PI / 180 / 2), 2);
		double part2 = Math.cos(point1[1] * Math.PI / 180) * Math.cos(point2[1] * Math.PI / 180);
		double part3 = Math.pow(Math.sin((point1[0] - point2[0]) * Math.PI / 180 / 2), 2);
		double distance = 6378.137 * 2 * Math.asin(Math.sqrt(part1 + part2 * part3)) * 1000;
		return distance;
	}

	/**
	 * 计算距离，返回米
	 *
	 * @param point1
	 * @param point2
	 * @return
	 */
	public double calDistance(ShopLocation point1, ShopLocation point2) {
		double part1 = Math.pow(Math.sin((point1.getLatitude() - point2.getLatitude()) * Math.PI / 180 / 2), 2);
		double part2 = Math.cos(point1.getLatitude() * Math.PI / 180) * Math.cos(point2.getLatitude() * Math.PI / 180);
		double part3 = Math.pow(Math.sin((point1.getLongitude() - point2.getLongitude()) * Math.PI / 180 / 2), 2);
		double distance = 6378.137 * 2 * Math.asin(Math.sqrt(part1 + part2 * part3)) * 1000;
		return distance;
	}

	/**
	 * 更精确的计算距离，返回米
	 * 
	 * @param point1
	 * @param point2
	 * @return
	 */
	public double calAccurateDistance(double[] point1, double[] point2) {
		double a = 6378137, b = 6356752.3142, f = 1 / 298.257223563;
		double degToRad = 0.0174532925199433;
		double EPSILON = 1e-12;
		double L = (point2[0] - point1[0]) * degToRad;
		double U1 = Math.atan((1 - f) * Math.tan(point1[1] * degToRad));
		double U2 = Math.atan((1 - f) * Math.tan(point2[1] * degToRad));
		double sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
		double sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);

		double cosSqAlpha, sinSigma, cos2SigmaM, cosSigma, sigma;

		double lambda = L, lambdaP, iterLimit = 20;
		do {
			double sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
			sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
					* (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
			if (sinSigma == 0) {
				return 0; // co-incident points
			}
			cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
			sigma = Math.atan2(sinSigma, cosSigma);
			double sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
			cosSqAlpha = 1 - sinAlpha * sinAlpha;
			cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
			if (cos2SigmaM == Double.NaN) {
				cos2SigmaM = 0; // equatorial line: cosSqAlpha=0 (�6)
			}
			double C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
			lambdaP = lambda;
			lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
		} while (Math.abs(lambda - lambdaP) > EPSILON && --iterLimit > 0);

		if (iterLimit == 0) {
			return Double.NaN;
		}
		double uSquared = cosSqAlpha * (a * a - b * b) / (b * b);
		double A = 1 + uSquared / 16384 * (4096 + uSquared * (-768 + uSquared * (320 - 175 * uSquared)));
		double B = uSquared / 1024 * (256 + uSquared * (-128 + uSquared * (74 - 47 * uSquared)));
		double deltaSigma = B
				* sinSigma
				* (cos2SigmaM + B / 4
						* (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
		double s = b * A * (sigma - deltaSigma);

		return s;
	}

	/**
	 * 更新用户位置
	 * 
	 * @param uloc
	 * @return
	 */
	public boolean updateLocation(ShopLocation uloc) {
		try {
			return dbService.update(uloc);
		} catch (Exception e) {
			logger.error("updateLocation error, uloc: " + uloc, e);
			return false;
		}
	}

	public boolean removeLocation(long uid) {
		try {
			return dbService.remove(uid);
		} catch (Exception e) {
			logger.error("removeLocation error, uid : " + uid, e);
			return false;
		}
	}

	/**
	 * 查询附近的用户
	 * 
	 * @param uloc
	 * @return
	 */
	public List<GeoQueryResult> queryNearUser(ShopLocation uloc,int r ) {
		return this.queryNearUser(uloc, r, DEFAULT_MAX_NUM);
	}

	/**
	 * 查询附近的用户
	 * 
	 * @param uloc
	 * @param maxDistance
	 * @param maxNum
	 * @return
	 */
	public List<GeoQueryResult> queryNearUser(ShopLocation uloc, int maxDistance, int maxNum) {
		List<GeoQueryResult> result;
		try {
			result = dbService.query(uloc, maxDistance, maxNum);
			for (GeoQueryResult gr : result) {
				gr.setDistance(this.calDistance(uloc, gr.getShopLocation()));
			}
			Collections.sort(result);
		} catch (Exception e) {
			logger.error("queryNearUser error, uloc: " + uloc, e);
			result = Collections.emptyList();
		}
		return result;
	}

	/**
	 * 获取用户位置，可能返回null
	 * 
	 * @param uid
	 * @return
	 */
	public ShopLocation queryLocationByUid(long uid) {
		try {
			return dbService.queryByUid(uid);
		} catch (Exception e) {
			logger.error("queryLocationByUid error, uid: " + uid, e);
			return null;
		}
	}

	/**
	 * 获取一群uid的位置
	 * 
	 * @param uids
	 * @return
	 */
	public Map<Long, ShopLocation> queryLocationByUidList(List<Long> uids) {
		Map<Long, ShopLocation> result;
		try {
			result = dbService.queryLocationMap(uids);
		} catch (Exception e) {
			logger.error("queryLocationMap error, uid size: " + uids.size(), e);
			result = Collections.emptyMap();
		}
		return result;
	}

	/**
	 * 获取一群uid的位置以及和baseLoc的距离
	 * 
	 * @param baseLoc
	 * @param uids
	 * @return
	 */
	public Map<Long, GeoQueryResult> queryLocationAndDistance(ShopLocation baseLoc, List<Long> uids) {
		Map<Long, GeoQueryResult> result;
		try {
			Map<Long, ShopLocation> map = dbService.queryLocationMap(uids);
			result = new HashMap<Long, GeoQueryResult>();
			for (Map.Entry<Long, ShopLocation> entry : map.entrySet()) {
				GeoQueryResult gr = new GeoQueryResult();
				gr.setShopLocation(entry.getValue());
				gr.setDistance(this.calDistance(baseLoc, entry.getValue()));
				result.put(entry.getKey(), gr);
			}
		} catch (Exception e) {
			logger.error("queryLocationAndDistanceByUidList error, uid size: " + uids.size(), e);
			result = Collections.emptyMap();
		}
		return result;
	}

    public static void main (String [] args){
        GeoService  geoService =  new GeoService() ;
        ShopLocation shop_location = new ShopLocation()  ;
        shop_location.setLatitude(39.976004);
        shop_location.setLongitude(116.341316);
        shop_location.setShop_id(2);
        System.out.println(geoService.updateLocation(shop_location));
         shop_location = new ShopLocation()  ;
        shop_location.setLatitude(40.976004);
        shop_location.setLongitude(116.341316);
        shop_location.setShop_id(1);
        System.out.println(geoService.updateLocation(shop_location));
        shop_location = new ShopLocation()  ;
        shop_location.setLatitude(44.976004);
        shop_location.setLongitude(116.341316);
        shop_location.setShop_id(4);
        System.out.println(geoService.updateLocation(shop_location));

        shop_location = new ShopLocation()  ;
        shop_location.setLatitude(44.976004);
        shop_location.setLongitude(117.341316);
        shop_location.setShop_id(3);
        System.out.println(geoService.updateLocation(shop_location));
        ShopLocation shopL = new ShopLocation () ;
        shopL.setShop_id(10);
        shopL.setLatitude(39.976004);
        shopL.setLongitude(116.341316);
        List<GeoQueryResult> ls  = geoService.queryNearUser(shopL , 500 * 1000);
        for (GeoQueryResult geo :ls ) {
            System.out.println(String.format("shop_id %d  , lng %f , lat %f ",geo.getShopLocation().getShop_id() , geo.getShopLocation().getLongitude(),geo.getShopLocation().getLatitude()));
        }
    }

}
