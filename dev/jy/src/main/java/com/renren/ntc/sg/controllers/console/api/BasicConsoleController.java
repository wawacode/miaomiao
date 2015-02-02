package com.renren.ntc.sg.controllers.console.api;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;

public class BasicConsoleController {
	
	@Autowired
	private ShopDAO shopDAO;
	
	protected String getDataResult(int code,JSONObject data) {
		JSONObject result = new JSONObject();
		result.put("code", code);
		result.put("data", data);
		return result.toJSONString();
	}
	
	protected String getActionResult(int code,String message) {
		JSONObject result = new JSONObject();
		result.put("code", code);
		result.put("msg", message);
		return result.toJSONString();
	}
	
	protected JSONObject initJSONResult(int code,String message) {
		JSONObject result = new JSONObject();
		result.put("code", code);
		result.put("msg", message);
		return result;
	}
	
	protected Shop isExistShop(long shop_id) {
		  if (0  >= shop_id){
			  return null;
	        }
	        Shop shop = shopDAO.getShop(shop_id);
	        if(null == shop){
	            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
	            return null;
	        }
	        if(shop.getStatus() != Constants.SHOP_OPEN_STATUS){
	        	if(SUtils.online(System.currentTimeMillis(), shop)){
	        		shop.setStatus(0);
	        	}else {
					shop.setStatus(1);
				}
	        }
	        return shop;
	}
}
