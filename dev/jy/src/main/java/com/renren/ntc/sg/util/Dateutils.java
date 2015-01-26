package com.renren.ntc.sg.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

public class Dateutils {
	public static final String FORMAT_ALL = "yyyy-MM-dd HH:mm:ss";
	private static SimpleDateFormat SDF = new SimpleDateFormat(FORMAT_ALL);
	public static final String FORMAT_DEFAULT = "yyyy-MM-dd";
	private static SimpleDateFormat DSDF = new SimpleDateFormat(FORMAT_DEFAULT);
	public static Date getDateByCondition(int date,int hour,int minute,int seconds){
		Calendar now = Calendar.getInstance();
		now.add(Calendar.DAY_OF_MONTH, date);
		now.set(Calendar.HOUR_OF_DAY, hour);
		now.set(Calendar.MINUTE, minute);
		now.set(Calendar.SECOND, seconds);
		now.set(Calendar.MILLISECOND, 0);
		return now.getTime();
	}
	
	public static String tranferDate2Str(Date date){
		if(date == null){
			return "";
		}
		return SDF.format(date);
	}
	
	public static String tranferDefaultDate2Str(Date date){
		if(date == null){
			return "";
		}
		return DSDF.format(date);
	}
	
	public static String getDateStrByCondition(String condition){
		if(StringUtils.isBlank(condition)){
			return "";
		}
		String[] dateStr = condition.split(":");
		Calendar now = Calendar.getInstance();
		now.setTime(new Date());
		now.set(Calendar.HOUR_OF_DAY, Integer.parseInt(dateStr[0]));
		now.set(Calendar.MINUTE, Integer.parseInt(dateStr[1]));
		now.set(Calendar.SECOND, 0);
		now.set(Calendar.MILLISECOND, 0);
		return tranferDate2Str(now.getTime());
	}
}