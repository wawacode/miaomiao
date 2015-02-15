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
	
	public Shop setDBDefaultValue(Shop shop,String name,String tel,String ownerPhone,String shopAddress,String shopInfo) {
		if (StringUtils.isBlank(name) || StringUtils.isBlank(tel)
				|| StringUtils.isBlank(ownerPhone)
				|| StringUtils.isBlank(shopAddress)
				|| StringUtils.isBlank(shopInfo)) {
			Shop dbShop = shopDAO.getShop(shop.getId());
			if (StringUtils.isBlank(name)) {
				shop.setName(dbShop.getName());
			}else {
				shop.setName(name);
			}
			if (StringUtils.isBlank(tel)) {
				shop.setTel(dbShop.getTel());
			}else {
				shop.setTel(tel);
			}
			if (StringUtils.isBlank(ownerPhone)) {
				shop.setOwner_phone(dbShop.getOwner_phone());
			}else {
				shop.setOwner_phone(ownerPhone);
			}
			if (StringUtils.isBlank(shopAddress)) {
				shop.setShop_address(dbShop.getShop_address());
			}else {
				shop.setShop_address(shopAddress);
			}
			if (StringUtils.isBlank(shopInfo)) {
				shop.setShop_info(dbShop.getShop_info());
			}else {
				shop.setShop_info(shopInfo);
			}
		}
		return shop;
	}
}