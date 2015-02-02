package com.qunar.quzilla.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.qunar.quzilla.utils.Constants.ErrorCode;

public class MessageUtils {
	
	public static String getMessage(ErrorCode code){
		return Constants.getMessage(code);
	}
	
	public static String formErrorMessage(ErrorCode code){
		JSONObject jb = new JSONObject();
		JSONObject jb2 = new JSONObject();
		jb2.put("code", code.toString());
		jb2.put("message", Constants.getMessage(code));
		jb.put("error", jb2);
		return jb.toString();
	}
	
	public static String formResponse(JSON message){
		JSONObject jb = new JSONObject();
		jb.put("data", message);
		return jb.toString();
	}
}
