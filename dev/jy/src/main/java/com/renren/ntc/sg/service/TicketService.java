package com.renren.ntc.sg.service;

import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.bean.UserCoupon;
import com.renren.ntc.sg.biz.dao.UserCouponDAO;
import com.renren.ntc.sg.biz.dao.UserDAO;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-8
 * Time: 下午12:09
 * To change this template use File | Settings | File Templates.
 */
@Service
public class TicketService {


    @Autowired
    public UserCouponDAO userCouponDao;

    public void occupy(long coupon_id, String coupon_code) {
        String key = SUtils.ticketKey(coupon_id);
        JRedisUtil.getInstance().set(key, Constants.COUPONTRADE );
        JRedisUtil.getInstance().expire(key,Constants.TRADEPIE);
    }

    public boolean canOcupy(long coupon_id, String coupon_code) {
        String key = SUtils.ticketKey(coupon_id);
        String  value = JRedisUtil.getInstance().get(key);
        if (StringUtils.isBlank(value)){
            return true;
        }
        return false;
    }

    public UserCoupon getTicket(long user_id,long coupon_id, String coupon_code){
        UserCoupon ticket =  userCouponDao.getTicket(user_id, coupon_id, coupon_code, Constants.COUPONUNUSED);
        if(ticket != null && canOcupy(ticket.getId(),ticket.getCode()))
        {
            return ticket;
        }
        return null;
    }

    public void writeoff(long user_id,long shop_id,long coupon_id) {
        userCouponDao.writeoff(Constants.COUPONUNUSED, coupon_id);
        usedTicket(user_id, shop_id);
    }


    public  void usedTicket (long user_id,long shop_id) {
        String key = SUtils.generDaylimitTicketKey(user_id);
        long value = JRedisUtil.getInstance().incr(key);
    }

    public  boolean canusedTicket (long user_id,long shop_id) {
        String key = SUtils.generDaylimitTicketKey(user_id);
        long  re = JRedisUtil.getInstance().getLong(key);
        if (re == 0 ){
            return true;
        }
        return false;
    }


    public  List<UserCoupon> getUnusedTickets (long user_id,long shop_id) {
        String key = SUtils.generDaylimitTicketKey(user_id);
        List<UserCoupon> tt = new ArrayList<UserCoupon>();
        long value = JRedisUtil.getInstance().incr(key);
        if (value == 1L){
            List<UserCoupon>  tickets = userCouponDao.geShopCoupons(user_id,shop_id,Constants.COUPONUNUSED);
            for(UserCoupon t: tickets){
              LoggerUtils.getInstance().log(String.format(" check ocupy user %d , ticket id %d , code %s ", user_id, t.getId(), t.getCode()));
              if (canOcupy(t.getId(),t.getCode())){
                  tt.add(t);
              }
          }
        }
        return tt;
    }



}
