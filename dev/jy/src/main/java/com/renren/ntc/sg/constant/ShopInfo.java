package com.renren.ntc.sg.constant;

import java.util.HashMap;
import java.util.Map;

public class ShopInfo {
	private static Map<Long,Integer> NOT_REPORT_MAP = new HashMap<Long, Integer>();
	static{
		NOT_REPORT_MAP.put(10027L, 0);//光熙
		NOT_REPORT_MAP.put(10033L, 0);//中钢3
		NOT_REPORT_MAP.put(10045L, 0);//方舟苑
		NOT_REPORT_MAP.put(10091L, 0);//立水桥
	}
	public static boolean isExistReport(long shopId){
		return NOT_REPORT_MAP.containsKey(shopId);
	}
}
