package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Shop;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.SQL;

import java.util.List;

@DAO(catalog = "ABC")
public interface ShopDAO {
    static final String TABLE_NAME= "shop";
    static final String FIELDS = "id, owner_user_id, name,owner_phone,head_url,shop_url,lng,lat" ;
    static final String INSERT_FIELDS = "owner_user_id,name,owner_phone,head_url,shop_url,lng,lat" ;

	@SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where  lat < :1 and lat > :2 and lng < :3 and lng > :4")
	public List<Shop> getShop(double lat2, double lng1, double lng2);
	
	@SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where  id = :1 ")
	public Shop getShop(long id);


    @SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where  owner_user_id = :1 ")
    public Shop getShopbyOwner_id(long id);
	
	
	@SQL("insert into " + TABLE_NAME + "(" + FIELDS +" ) values"  + " (:1.name,:1.owner_phone,:1.head_url,:1.shop_url,:1.lng,:1,lat)")
	public int insert(Shop o);
	
	
}
