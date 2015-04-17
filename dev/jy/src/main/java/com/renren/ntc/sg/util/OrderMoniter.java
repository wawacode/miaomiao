package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.OrderStatus;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.service.SMSService;
import com.renren.ntc.sg.service.WXService;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;
import org.omg.CORBA.INTERNAL;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class OrderMoniter {
    private static long PACKAGE = 5 * 60 * 1000;
    private static long HOURS = 30 * 60 * 1000;
    private static String  MESSINF = "2452";

    //private l
    public static void main(String[] args) {
        RoseAppContext rose = new RoseAppContext();
        OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
        SMSService sms = rose.getBean(SMSService.class);
        ShopDAO shopDao = rose.getBean(ShopDAO.class);


        long now = System.currentTimeMillis();
        for (long shop_id = 0 ; shop_id <1000 ;shop_id ++){
           List<Order> ol  = orderDao.getOrderbyTime(SUtils.generOrderTableName(shop_id),shop_id);
            for (Order o  :ol){
                System.out.println(String.format("Get %s ,%s , %s" ,o.getOrder_id() , o.getStatus(), o.getOrder_status()));
                long order_time = o.getCreate_time().getTime();
                if (o.getOrder_status() == OrderStatus.TOCONFIREMED.getCode() ){
                    if(needPackage(now, order_time)){
                        Shop shop = shopDao.getShop(o.getShop_id());
                        sms.sendNotificationSMS2kf(o,shop,"未确认配送");
                        return;
                    }
                }
                if (o.getOrder_status() <= OrderStatus.DELIVERIES.getCode() ){
                    if(needConfirm(now, order_time)) {
                        Shop shop = shopDao.getShop(o.getShop_id());
                        sms.sendNotificationSMS2kf(o,shop,"未确认收货");
                        return;
                    }
                }
            }
        }
    }

    private static boolean needPackage(long now, long order_time) {
        long interval =  now - order_time;
        if(interval > PACKAGE){
            return true;
        }
        return false;
    }

    private static boolean needConfirm(long now, long order_time) {
        long interval =  now - order_time;
        if(interval > HOURS){
            return true;
        }
        return false;

     }
}