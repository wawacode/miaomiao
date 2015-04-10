package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.util.Constants;

import javax.print.*;
import javax.print.attribute.*;
import javax.print.event.PrintJobEvent;
import javax.print.event.PrintJobListener;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;


public class PrinterV2 {

    public static String GetString(JSONObject o  ) {
        String info = o.getString("info");
        String order_id = o.getString("order_id");
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
        sb.append((char)33);
        sb.append((char)0);
        sb.append((char)27);
        sb.append((char)97);
        sb.append((char)0);
        sb.append("================================\n");
        sb.append("订单号 ： " + order_id +  "\n");
        sb.append("下单时间 ： " + time(o.getDate("create_time"))  +  "\n");
        sb.append("================================\n");
        sb.append(getAddress(info) + "\n");
        sb.append("================================\n");
        sb.append("商品名称             数量   价格\n");
        String[] ods = getOrders(info);
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
        sb.append("\n");
        sb.append("\n");
        sb.append("\n");
        return sb.toString();
    }

    private static String time(Date d){

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(d);
        return dateString;
    }

    private static String fomat(String od) {
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

    private static int length(String s) {
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


    private static boolean isChinese(char c) {

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

    // 这个名字是打印机名字，安装完成后我改为了"miaomiao.printer.usb"，以后可以做成可配置
    public static String pos_service_name = "miaomiao.printer.usb";
    public static boolean print(JSONObject o ) {
        DataOutputStream bw = null;
        try {
            bw=new DataOutputStream(new FileOutputStream(new File("/dev/usb/lp0")));
            byte [] ss = o.getString("info").getBytes("gbk");
            bw.writeInt((int)0x1b40);
            bw.writeInt((int)0x0a);
            bw.write(ss,0,ss.length);
            bw.writeInt((int)0x0a);
            bw.writeInt((int)0x0a);
            bw.writeInt((int)0x0a);
            bw.flush();
        } catch (Throwable e) {
            e.printStackTrace();
            return false;
        }
        finally {
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return true;
    }

   public static void main (String args []){
       System.out.println(fomat("哈哈镜白虾 *|1*|26"));
   }

}