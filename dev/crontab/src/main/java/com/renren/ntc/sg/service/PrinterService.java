package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.util.Constants;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.List;


@Service
public class PrinterService {

    public  String getString(List<Order> ol )   {
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
        sb.append(o.getAddress() + " " +  o.getPhone() + "\n");
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
        sb.append("总价       :"+ (sum/100) +"\n");
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



}