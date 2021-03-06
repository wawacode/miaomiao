package com.qunar.sg.dao;

import java.util.List;

import com.qunar.sg.bean.Shop;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;


@DAO(catalog = "ABC")
public interface ShopDAO {
    static final String TABLE_NAME= "shop";
    static final String FIELDS = "id, owner_user_id,base_price, name,open_time,close_time,shop_address,tel,owner_phone,head_url,shop_url,lng,lat,create_time,audit" ;
    static final String INSERT_FIELDS = "owner_user_id,name,shop_address,tel,owner_phone,head_url,shop_url,lng,lat" ;
    static final String SHOP_NAME_FIELDS = "id,name";
	@SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where  lat < :1 and lat > :2 and lng < :3 and lng > :4")
	public List<Shop> getShop(double lat2, double lng1, double lng2);
	
	@SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where  id = :1 ")
	public Shop getShop(long id);


    @SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where  owner_user_id = :1 ")
    public Shop getShopbyOwner_id(long id);

    @ReturnGeneratedKeys
	@SQL("insert into " + TABLE_NAME + "(" + INSERT_FIELDS +" ) values"  + " (:1.owner_user_id,:1.name,:1.shop_address,:1.tel,:1.owner_phone,:1.head_url,:1.shop_url,:1.lng,:1.lat)")
	public int insert(Shop o);


    @SQL("update " + TABLE_NAME + "set  audit =1 where id = :1")
    public int audit(long shop_id);

    @SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " where audit = 1  limit :1,:2")
    public List<Shop> getAuditedShops(int from, int offset);

    @SQL("select " +FIELDS  + "  from "  + TABLE_NAME + " limit :1,:2")
    public List<Shop> getAllShops(int from, int offset);
    
    @SQL("select " +SHOP_NAME_FIELDS  + "  from "  + TABLE_NAME + " where audit = :1")
    public List<Shop> getAllShopsByAudit(int audit);
    
    @SQL("update " + TABLE_NAME + " set ##(:key) = :3  where id =:1")
    public int update(long id, @SQLParam("key") String key, String value);
}
