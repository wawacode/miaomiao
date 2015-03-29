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
    static final String  FIELDS = "id,user_id,coupon_id,shop_id,pic_url,code,status, price ,name  ,ext,start_time,end_time,create_time,update_time"  ;
    static final String  INSERT_FIELDS = "user_id,coupon_id,shop_id,pic_url,code ,status, price ,name,ext,start_time,end_time"  ;

    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  user_id =:1 and status = 0 order by create_time desc limit :2,:3 ")
    public List<UserCoupon> getUser_Coupon (long user_id , int form ,int offset) ;

    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  user_id =:1 and status=:2 order by create_time desc limit :3,:4 ")
    public List<UserCoupon> getMyCoupon (long user_id ,long status,  int form ,int offset) ;

    @SQL("insert into " + TABLE_NAME + " ( " + INSERT_FIELDS + ") values (:1.user_id,:1.coupon_id,:1.shop_id,:1.pic_url,:1.code ,:1.status,:1.price ," +
            ":1.name ,:1.ext,:1.start_time,:1.end_time) ")
    public int insert ( UserCoupon userCoupon) ;


    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  id =:1 and code = :2")
    public List<UserCoupon> getUser_Coupon(long user_id, long id, String code) ;


    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  user_id =:1 and coupon_id = :2")
    public List<UserCoupon> getUser_Coupon (long user_id, long coupon_id ) ;


    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  user_id =:1 and shop_id = :2 and status= :3  limit :4,:5 ")
    public List<UserCoupon> geShopCoupons (long user_id, long shop_id ,int status ,int from,int offset ) ;

    @SQL("select " + FIELDS + " from " + TABLE_NAME +" where  user_id =:1 and id = :2 and code=:3 and status = :4")
    public UserCoupon getTicket(long user_id, long coupon_id, String coupon_code, int couponunused);




    @SQL("update  " + TABLE_NAME +  " set status = :1 where id =:2 " )
    public int writeoff(int status , long coupon_id);


}