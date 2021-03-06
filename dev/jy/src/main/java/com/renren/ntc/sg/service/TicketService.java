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

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

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
        LoggerUtils.getInstance().log(String.format("canOcupy key %s ", key));
        String  value = JRedisUtil.getInstance().get(key);
        if (StringUtils.isBlank(value)){
            LoggerUtils.getInstance().log(String.format("canOcupy key %s %s ", key, coupon_code));
            return true;
        }
        LoggerUtils.getInstance().log(String.format("can not Ocupy key %s %s ", key, coupon_code));
        return false;
    }

    public UserCoupon getTicket(long user_id,long coupon_id, String coupon_code){
        UserCoupon ticket =  userCouponDao.getTicket(user_id, coupon_id, coupon_code, Constants.COUPONUNUSED,new Date(System.currentTimeMillis()));

        if(ticket != null && canOcupy(ticket.getId(),ticket.getCode()))
        {
            return ticket;
        }
        return null;
    }

    public void writeoff(long user_id,long shop_id,long coupon_id) {
        userCouponDao.writeoff(Constants.COUPONUSED, coupon_id);
        usedTicket(user_id, shop_id);
    }


    public  void usedTicket (long user_id,long shop_id) {
        String key = SUtils.generDaylimitTicketKey(user_id);
        JRedisUtil.getInstance().incr(key);


    }

    public  boolean ticketCanUse(long user_id, long shop_id) {
        if(SUtils.isDev()){
            return true;
        }
        String key = SUtils.generDaylimitTicketKey(user_id);
        long  re = JRedisUtil.getInstance().getLong(key);
        if (re == 0 ){
            return true;
        }
        return false;
    }


    public  List<UserCoupon> getUnusedTickets (long user_id,long shop_id,int from ,int offset) {
        List<UserCoupon> tt = new ArrayList<UserCoupon>();
        List<UserCoupon>  tickets = userCouponDao.geShopCoupons(user_id, shop_id, Constants.COUPONUNUSED, from, offset,new Date(System.currentTimeMillis()));
            for(UserCoupon t: tickets) {
                LoggerUtils.getInstance().log(String.format(" check ocupy user %d , ticket id %d , code %s ", user_id, t.getId(), t.getCode()));
                if ( canOcupy(t.getId(), t.getCode())) {
                    tt.add(t);
                }
            }
        return tt;
    }

    private boolean expire(UserCoupon t) {
         long curr = System.currentTimeMillis();
        if (curr > t.getStart_time().getTime() &&  curr < t.getEnd_time().getTime()){
            return true;
        }
        return false;
    }


    public int getTicketCount(long user_id) {
        int count  = userCouponDao.getMyCouponCount(user_id, Constants.COUPONUNUSED,new Date(System.currentTimeMillis()));
        return count ;
    }
}
