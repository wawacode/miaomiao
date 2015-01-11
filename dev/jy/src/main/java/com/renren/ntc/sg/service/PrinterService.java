package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.OrderInfo;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.util.Constants;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.List;


@Service
public class PrinterService {

    @Autowired
    public ShopDAO shopDao ;

    public  String getString(List<Order> ol)   {
           JSONArray jarr = new JSONArray();
           for (Order o : ol){
               JSONObject jb = new JSONObject();
               jb.put("order_id",o.getOrder_id());
               jb.put("info",getString(o));
               jb.put("create_time",o.getCreate_time());
               jarr.add(jb);
           }
          return jarr.toJSONString();
    }


    public  String getString2(List<OrderInfo> ol )   {
        JSONArray jarr = new JSONArray();
        for (OrderInfo o : ol){
            JSONObject jb = new JSONObject();
            jb.put("order_id",o.getOrder_id());
            jb.put("info",getString(o));
            jb.put("create_time",o.getCreate_time());
            jarr.add(jb);
        }
        return jarr.toJSONString();
    }

    private static String getAddress(String address) {
        int index = address.indexOf("#address#");
        int index2 = address.indexOf("#orderDetail#");
        if (-1 == index || -1 == index) {
            return "";

        }
        return address.substring(index + 10, index2);
    }

    private static String[] getOrders(String address) {

        int index = address.indexOf("#orderDetail#");
        if (-1 == index) {
            return new String[0];

        }
        String order = address.substring(index + 14, address.length());
        String[] ords = order.split("r\\|");
        return ords;
    }

    public  String getString(OrderInfo o) {
        String order_id  = o.getOrder_id();
        StringBuffer sb = new StringBuffer();

        sb.append("\n\n\n");

        // esc/pos命令: ESC ! n
        // 设置字体为: bold, 2倍高，2倍宽
        sb.append((char)27);
        sb.append((char)33);
        //0b00111000
        sb.append((char)56);

        // esc/pos命令: ESC a 1
        // 居中对齐
        sb.append((char)27);
        sb.append((char)97);
        sb.append((char)1);
        sb.append("乐邻便利店\n");

        // esc/pos命令: ESC ! n
        // 设置字体为正常字体
        sb.append((char)27);
        sb.append((char)33) ;
        sb.append((char)0);
        sb.append((char)27);
        sb.append((char)97);
        sb.append((char)0);
        sb.append("================================\n");
        sb.append("订单号 ： " + order_id +  "\n");
        sb.append("下单时间 ： " + time(o.getCreate_time())  +  "\n");
        sb.append("================================\n");
        sb.append(getAddress(o.getInfo())  + "\n");
        sb.append("================================\n");
        sb.append("商品名称             数量   价格\n");
        String[] ods = getOrders(o.getInfo());
        int sum = 0;
        for (String od : ods) {
            int a = getItem(od);
            sum += a;
            sb.append(fomat(od));
            sb.append(Constants.BR);
        }
        sb.append("================================\n");

        sb.append((char)27);
        sb.append((char)33);
        //0b00111000
        sb.append((char)56);
        sb.append("总价       :"+ (sum/100) +"\n");
        sb.append("\n\n\n");
        return sb.toString();
    }

    public  String getString(Order o) {
        String order_id  = o.getOrder_id();
        StringBuffer sb = new StringBuffer();

        sb.append("\n\n\n");

        // esc/pos命令: ESC ! n
        // 设置字体为: bold, 2倍高，2倍宽
        sb.append((char)27);
        sb.append((char)33);
        //0b00111000
        sb.append((char)56);

        // esc/pos命令: ESC a 1
        // 居中对齐
        sb.append((char)27);
        sb.append((char)97);
        sb.append((char)1);
        String shop_name = "乐邻便利店";
        Shop sh = shopDao.getShop(o.getShop_id());
        if (null != sh ){
            shop_name = sh.getName();
        }
        sb.append( shop_name + "\n");
        // esc/pos命令: ESC ! n
        // 设置字体为正常字体
        sb.append((char)27);
        sb.append((char)33) ;
        sb.append((char)0);
        sb.append((char)27);
        sb.append((char)97);
        sb.append((char)0);
        sb.append("================================\n");
        sb.append("订单号 ： " + order_id +  "\n");
        sb.append("下单时间 ： " + time(o.getCreate_time())  +  "\n");
        sb.append("================================\n");
        sb.append(o.getAddress() + " " +  o.getPhone() + "\n");
        if(!StringUtils.isBlank(o.getRemarks())){
        sb.append("买家备注 ： " +o.getRemarks()  + "\n");
        }
        sb.append("================================\n");
        sb.append("商品名称             数量   价格\n");
        JSONArray jarr   = (JSONArray) JSONArray.parse(o.getInfo());;
        int sum = 0;
        if ( null == jarr){
              return "" ;
        }
        int size = jarr.size();
        for (int i = 0;i < size ;i++) {
            JSONObject ob = jarr.getJSONObject(i);
            int a = getItem(ob);
            sum += a;
            sb.append(fomat(ob));
            sb.append(Constants.BR);
        }
        sb.append("================================\n");

        sb.append((char)27);
        sb.append((char)33);
        //0b00111000
        sb.append((char)56);
        sb.append("总价       :"+ ((float)sum/100) +"\n");
        sb.append("\n\n\n");
        return sb.toString();
    }

    private  String time(Date d){

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(d);
        return dateString;
    }

    private  String fomat(JSONObject od) {
        StringBuffer sb = new StringBuffer();
        String name = od.getString("name");
        int count = od.getIntValue("count");
        int price = od.getIntValue("price");
        float pp = price /100 ;
        sb.append(name);
        int a = 22 - length(name);
        if (a <= 0) {
            sb.append(" ");
        } else {
            for (int i = 0; i < a; i++)
                sb.append(" ");
        }
        sb.append(count);
        a = 6 - (count+"").length();
        if (a < 0 || length(sb.toString()) > 25) {
            sb.append(" ");
        } else {
            for (int i = 0; i < a; i++)
                sb.append(" ");
        }
        sb.append(pp);
        return sb.toString();
    }

    private  int length(String s) {
        char[] cs = s.toCharArray();
        int length = 0;
        for (char c : cs) {
            if (isChinese(c)) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }


    private  boolean isChinese(char c) {

        Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);

        if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS

                || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS

                || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A

                || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B

                || ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION

                || ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS

                || ub == Character.UnicodeBlock.GENERAL_PUNCTUATION) {

            return true;

        }
        return false;
    }
    private  int getItem(JSONObject ob) {
        int count = ob.getIntValue("count");
        int price = ob.getIntValue("price");
        int a = 0;
        try {
            a =  price  * count ;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return a;

    }

    private static int getItem(String ob) {
        String[] obs = ob.split("\\*\\|");
        String sum = obs[obs.length - 1];
        int a = 0;
        try {
            Float f = Float.valueOf(sum);
            a = (int) ((f * 100) / 1);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return a;

    }

    private  String fomat(String od) {
        System.out.println("Print " + od);
        StringBuffer sb = new StringBuffer();
        String[] ss = od.split("\\*\\|");
        int d = 0;
        for (String s : ss) {
            sb.append(s);
            if (0 == d) {
                String sbb = sb.toString();
                int a = 22 - length(s);
                if (a <= 0) {
                    sb.append(" ");
                } else {
                    for (int i = 0; i < a; i++)
                        sb.append(" ");
                }
            } else if (d == 1) {
                String sbb = sb.toString();
                int a = 6 - s.length();
                if (a < 0 || length(sbb) > 25) {
                    sb.append(" ");
                } else {
                    for (int i = 0; i < a; i++)
                        sb.append(" ");
                }
            }
            d++;
        }
        return sb.toString();
    }



}