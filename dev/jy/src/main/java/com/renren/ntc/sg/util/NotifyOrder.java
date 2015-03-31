package com.renren.ntc.sg.util;

import java.util.Iterator;
import java.util.Set;

import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.service.WXService;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

public class NotifyOrder {
    //private l
    public static void main(String[] args) {
        RoseAppContext rose = new RoseAppContext();
        WXService wxservice = rose.getBean(WXService.class);
        Set<String> orderInfo = JRedisUtil.getInstance().smembers(Constants.ORDER_KEY);
        for (Iterator iterator = orderInfo.iterator(); iterator.hasNext();) {
            String orderinfo = (String) iterator.next();
            System.out.println("get " + orderinfo);
            if(StringUtils.isBlank(orderinfo)){
                System.out.println(String.format("srem  message %s " ,orderinfo));
                continue;
            }
            String[] orderInfoArr = orderinfo.split("_");
            if(orderInfoArr == null || orderInfoArr.length !=3){
                JRedisUtil.getInstance().srem(Constants.ORDER_KEY,orderinfo);
                System.out.println(String.format("srem  message %s " ,orderinfo));
                continue;
            }
            if(StringUtils.isBlank(orderInfoArr[0])){
                JRedisUtil.getInstance().srem(Constants.ORDER_KEY,orderinfo);
                System.out.println(String.format("srem  message %s " ,orderinfo));
                continue;
            }
            try {
                String order_id = orderInfoArr[0];
                long s_id = Long.valueOf(orderInfoArr[1]);
                long redisTime = Long.parseLong(orderInfoArr[2]);
                long curr = System.currentTimeMillis();
                long left = curr - redisTime;
                if (left > 300000){
                    wxservice.sendWX2User(order_id,s_id);
                    JRedisUtil.getInstance().srem(Constants.ORDER_KEY, orderinfo);
                    System.out.println(String.format("send  message %s " ,orderinfo));
                    continue;
                }
            }catch (Exception e){
                 e.printStackTrace();
                JRedisUtil.getInstance().srem(Constants.ORDER_KEY, orderinfo);
                continue;
            }

        }
    }
}