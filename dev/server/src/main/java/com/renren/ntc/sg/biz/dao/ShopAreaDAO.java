package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopArea;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

import java.util.List;

@DAO(catalog = "ABC")
public interface ShopAreaDAO {
    static final String TABLE_NAME= "shop_area";
    static final String FIELDS = "id, shop_id,area_name,max_lat, min_lat,max_lng,min_lng,create_time,update_time" ;
    static final String INSERT_FIELDS = "shop_id,area_name,max_lat, min_lat,max_lng,min_lng" ;


    @SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where shop_id=:1")
	public List<ShopArea> getShopArea(long shop_id);
	
    @SQL("insert into "  + TABLE_NAME + "(" + INSERT_FIELDS  + ") values  " +
            "(:1.shop_id,:1.area_name,:1.max_lat, :1.min_lat,:1.max_lng,:1.min_lng) ")
    public int insert(ShopArea  shopArea);
}
