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
			return null;
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
		if(dateStr == null ||  dateStr.length != 2){
			return "";
		}
		Calendar now = Calendar.getInstance();
		now.setTime(new Date());
		now.set(Calendar.HOUR_OF_DAY, Integer.parseInt(dateStr[0]));
		now.set(Calendar.MINUTE, Integer.parseInt(dateStr[1]));
		now.set(Calendar.SECOND, 0);
		now.set(Calendar.MILLISECOND, 0);
		return tranferDate2Str(now.getTime());
	}
	public static Date transferToDatebyCondition(String condition){
		if(StringUtils.isBlank(condition)){
			return null;
		}
		String[] dateStr = condition.split(" ");
		String[] yMD = dateStr[0].split("-");
		Calendar now = Calendar.getInstance();
		String[] hMS = dateStr[1].split(":");
		now.set(Calendar.YEAR, Integer.parseInt(yMD[0]));
		now.set(Calendar.MONTH, Integer.parseInt(yMD[1]));
		now.set(Calendar.HOUR_OF_DAY, Integer.parseInt(yMD[2]));
		now.set(Calendar.MINUTE, Integer.parseInt(hMS[0]));
		now.set(Calendar.SECOND, Integer.parseInt(hMS[1]));
		now.set(Calendar.MILLISECOND, Integer.parseInt(hMS[2]));
		return now.getTime();
	}
	/**
	 * 08:00 AM
	 * 10:00 PM
	 * @return
	 */
	public static String getHMDateBycondition(String timeStr){
		if(StringUtils.isBlank(timeStr)){
			return "";
		}
		String[] timeArr = timeStr.split(" ");
		if(timeArr == null || timeArr.length != 2){
			return "";
		}
		if(!timeArr[1].equalsIgnoreCase("am") && !timeArr[1].equalsIgnoreCase("pm")){
			return "";
		}else if (timeArr[1].equalsIgnoreCase("pm")) {
			String hmTimeStr = timeArr[0];
			String[] hmArr= hmTimeStr.split(":");
			if(hmArr == null || hmArr.length !=2){
				return "";
			}
			int hour = Integer.parseInt(hmArr[0]);
			hour += 12;
			String hmDate = String.valueOf(hour) + ":" + hmArr[1];
			return hmDate;
		}else {
			String[] hmArr= timeArr[0].split(":");
			if(hmArr == null || hmArr.length !=2){
				return "";
			}
			return timeArr[0];
		}
	}
}