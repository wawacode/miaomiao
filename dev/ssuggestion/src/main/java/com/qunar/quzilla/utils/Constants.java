package com.qunar.quzilla.utils;

import java.util.HashMap;
import java.util.Map;

public class Constants {

	public static final String SUCCESS = "@{\"op\":\"done\"}";
	public static final String ERROR = "@{\"error\":\"%d\",\"message\":\"%s\"}";

	public static final int COUNT = 1000;
	
	public static final int ONEDAY =  24*3600*1000;
	
	public static final int HALFHOURS = 1800*1000;
	
	public static Map<ErrorCode, String> infoMap = new HashMap<ErrorCode, String>();

	public enum ErrorCode {
		ILLEGAL_PARAMTERS(1), 
		UNKNOWEXCEPTION(2),
		FAILTOADD(3);
		
		
		private int nCode;

		ErrorCode(int code) {
			this.nCode = code;
		}
	}

	static {
		infoMap.put(ErrorCode.ILLEGAL_PARAMTERS, "参数不合法");
		infoMap.put(ErrorCode.UNKNOWEXCEPTION, "服务端异常");
		infoMap.put(ErrorCode.FAILTOADD, "添加节点失败");
	}

	public static String getMessage(ErrorCode code) {
		return infoMap.get(code);
	}

}
