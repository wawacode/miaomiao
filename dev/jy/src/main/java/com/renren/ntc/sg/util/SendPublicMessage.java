package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.biz.dao.AddressDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.TempDAO;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

public class SendPublicMessage {
    //private l
    public static void main(String[] args) throws IOException {

        getPhone();

    }

    public static void getPhone(){
        long shop_id = 10026;
        RoseAppContext rose = new RoseAppContext();

        OrdersDAO orderDao = rose.getBean(OrdersDAO.class);
        AddressDAO addressDAO = rose.getBean(AddressDAO.class);
        TempDAO tempDAO = rose.getBean(TempDAO.class);

        int offset = 1000;
        for (int i = 0; i < 100000; ) {
            List<Order> ol = orderDao.getOrderByShop(shop_id, i, offset, SUtils.generOrderTableName(shop_id));
            if (ol == null || ol.size() == 0) {
                break;
            }

            for (Order o : ol) {
                long addressId = o.getAddress_id();
                Address a = addressDAO.getAddress(addressId);

                if (a == null) {
                    continue;
                }
                String phone = a.getPhone();
                try {
                    System.out.println(String.format("inser %s ",phone));
                    tempDAO.insert(phone);
                } catch (Exception e) {
                    //do nothings;
                }
            }
            i = i + offset;
        }
    }

    public static void sendMessage() throws IOException {

        RoseAppContext rose = new RoseAppContext();
        TempDAO tempDAO = rose.getBean(TempDAO.class);
        int offset = 1000;
        for (int i = 0; i < 100000; ) {
            List<String> phones = tempDAO.getPhone(i, offset);

            if (phones == null || phones.size() == 0) {
                break;
            }
            for (String phone : phones) {

                String v = null;
                String url;
                byte[] t = null;
                String message = "#date#=" + "2015-04-15";
                message = SUtils.span(message);
                message = URLEncoder.encode(message, "utf-8");
                if(phone.length()<11){
                    continue;
                }
                url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.TMP_TID, phone, message);
                System.out.println(String.format("Send  SMS mobile %s  ,%s ", phone, url));
//                t = SHttpClient.getURLData(url, " ");
//                String r = SUtils.toString(t);
//                System.out.println(String.format("Post Shop SMS message  %s , %s  %s ",
//                        r, phone, url));
            }
            i = i + offset;
        }

    }
}