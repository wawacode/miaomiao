package com.renren.ntc.sg.service;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.ShopDAO;
@Service
public class ShopService {
	@Autowired
	private ShopDAO shopDAO;
	
	public void setDBDefaultValue(Shop shop,String name,String tel,String ownerPhone,String shopAddress,String shopInfo,int status, int basePrice) {
			if (!StringUtils.isBlank(name)) {
				shop.setName(name);
			}
			if (!StringUtils.isBlank(tel)) {
				shop.setTel(tel);
			}
			if (!StringUtils.isBlank(ownerPhone)) {
				shop.setOwner_phone(ownerPhone);
			}
			if (!StringUtils.isBlank(shopAddress)) {
				shop.setShop_address(shopAddress);
			}
		    shop.setStatus(status);
            shop.setBase_price(basePrice);
	}
}
