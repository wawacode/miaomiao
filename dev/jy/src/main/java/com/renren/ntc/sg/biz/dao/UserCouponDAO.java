package com.renren.ntc.sg.biz.dao;

import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.UserCoupon;
import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-2
 * Time: 下午1:10
 * To change this template use File | Settings | File Templates.
 */
@DAO(catalog = "ABC")
public interface UserCouponDAO {
    static final String TABLE_NAME= "user_coupon";
    static final String  FIELDS = "id,user_id,coupon_id,code, price ,name  ,ext,start_time,end_time,create_time,update_time"  ;
    static final String  INSERT_FIELDS = "user_id,coupon_id,code , price ,name  ,ext,start_time,end_time"  ;

    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  user_id =:1 order by create_time desc limt :2,:3 ")
    public List<UserCoupon> getUser_Coupon (long user_id , int form ,int offset) ;

    @SQL("insert into " + TABLE_NAME + "( " + INSERT_FIELDS + ") values (:1.user_id,:1.coupon_id,,:1.code ,:1.price ," +
            ":1.name ,:1.ext,:1.start_time,:1.end_time) ")
    public int insert ( UserCoupon userCoupon) ;


    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  id =:1 and code = :2")
    public List<UserCoupon> getUser_Coupon(long user_id, long id, String code) ;


    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  user_id =:1 and coupon_id = :2")
    public List<UserCoupon> getUser_Coupon (long user_id, long coupon_id ) ;
    
    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  user_id =:1 and coupon_id = :2 and code=:3 and status = :4")
    public UserCoupon getTicket(long user_id, int coupon_id, String coupon_code, int couponunused);
}