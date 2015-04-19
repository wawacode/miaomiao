package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.OrderStatus;
import com.renren.ntc.sg.service.SMSService;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.util.List;

public class OrderMoniter {
    private static long PACKAGE = 5 * 60 * 1000;
    private static long HOURS = 30 * 60 * 1000;
    private static String MESSINF = "2452";

    //private l
    public static void main(String[] args) {
        RoseAppContext rose = new RoseAppContext();
        OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
        SMSService sms = rose.getBean(SMSService.class);
        ShopDAO shopDao = rose.getBean(ShopDAO.class);

        long now = System.currentTimeMillis();
        int from = 0;
        int offset = 100;
        do {
            List<Shop> shops = shopDao.getAuditedShops(from, offset);
            if (null == shops || shops.size() == 0) {
                break;
            }

            for (Shop shop : shops) {
                long shop_id = shop.getId();
                List<Order> ol = orderDao.getOrderbyTime(SUtils.generOrderTableName(shop_id), shop_id);
                System.out.println(String.format("get shop %d  orders  %d", shop_id, ol.size()));
                for (Order o : ol) {
                    System.out.println(String.format("Get %s ,%s , %s", o.getOrder_id(), o.getStatus(), o.getOrder_status()));
                    long order_time = o.getCreate_time().getTime();
                    if (o.getOrder_status() == OrderStatus.TOCONFIREMED.getCode()) {
                        if (needPackage(now, order_time)) {
                            sms.sendNotificationSMS2kf(o, shop, "send");
                            continue;
                        }
                    }
                    if (o.getOrder_status() <= OrderStatus.DELIVERIES.getCode()) {
                        if (needConfirm(now, order_time)) {
                            sms.sendNotificationSMS2kf(o, shop, "confirm");
                            continue;
                        }
                    }
                }
            }
            from = from + offset;
        } while (true);
    }

    private static boolean needPackage(long now, long order_time) {
        long interval = now - order_time;
        if (interval > PACKAGE) {
            return true;
        }
        return false;
    }

    private static boolean needConfirm(long now, long order_time) {
        long interval = now - order_time;
        if (interval > HOURS) {
            return true;
        }
        return false;

    }
}