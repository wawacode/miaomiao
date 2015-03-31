package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Coupon;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.Shop;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;
import net.paoding.rose.jade.annotation.SQLParam;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-2
 * Time: 下午1:10
 * To change this template use File | Settings | File Templates.
 */
@DAO(catalog = "ABC")
public interface CouponDAO {
    static final String TABLE_NAME= "coupon";
    static final String  FIELDS = "id,createer,price,shop_id,name,pic_url,ext,start_time,end_time,create_time,update_time"  ;
    static final String  INSERT_FIELDS = "createer,price,shop_id,name,pic_url,ext,start_time,end_time"  ;


    @SQL("select " + FIELDS + " from " + TABLE_NAME +  " where :1 => start_time and :1 <= end_time" )
    public List<Coupon> getCouponRule(Date time) ;
    
    @SQL("delete from "  + TABLE_NAME + " where id = :1")
    public int  del(long id);
    
    @SQL("update " + TABLE_NAME + " set ##(:key) = :3  where id =:1")
    public int update(long id, @SQLParam("key") String key, String value);
    
    @ReturnGeneratedKeys
	@SQL("insert into " + TABLE_NAME + "(" + INSERT_FIELDS +" ) values"  + 
			" (:1.createer,:1.price,:1.shop_id,:1.name,:1.pic_url,:1.ext," +
            ":1.startTimeStr,:1.endTimeStr)")
	public int insert(Coupon o);
    
    @SQL("select " + FIELDS + " from " + TABLE_NAME +  " order by create_time desc limit :1,:2")
    public List<Coupon> getAllCoupon(int start,int count) ;


    @SQL("select " + FIELDS + " from " + TABLE_NAME +  " where  shop_id=:2 and  :1 => start_time and :1 <= end_time" )
    public List<Coupon> getCouponbyShop(Date time,long shop_id) ;

}
