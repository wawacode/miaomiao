package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.util.Constants;

import javax.print.*;
import javax.print.attribute.*;
import javax.print.attribute.standard.MediaSizeName;
import javax.print.attribute.standard.PrinterIsAcceptingJobs;
import javax.print.attribute.standard.PrinterState;
import javax.print.event.PrintJobEvent;
import javax.print.event.PrintJobListener;
import java.lang.reflect.Field;
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
        PrintService posService = null;
//        HashPrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
//        PrintJobAttribute  pa = new PrintJobAttribute();
        HashPrintServiceAttributeSet pras = new HashPrintServiceAttributeSet();
        pras.add(PrinterState.IDLE);
        DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;

        // 遍历windows系统打印机
        PrintService printService[] = PrintServiceLookup.lookupPrintServices(flavor, pras);
        for (PrintService svr : printService) {
            // 找到打印机名字为"miaomiao.printer.usb"的打印机
            System.out.println(String.format("get printer  %s " ,svr.getName()));
            if (svr.getName().equals(pos_service_name)) {
                posService =  svr ;
                PrintServiceAttributeSet attr = svr.getAttributes();
                Attribute [] arr = attr.toArray();
                for (Attribute a : arr){
                    System.out.println(a.getName() + " " + a.getCategory());

                }

                break;
            }
        }
        if(null == posService){
            LoggerUtils.getInstance().log( "can not find  printer <" + pos_service_name  + "> ") ;
            return false;
        }
        if (null != posService) {
            try {
                DocPrintJob job = posService.createPrintJob();
                DocAttributeSet das = new HashDocAttributeSet();
                LoggerUtils.getInstance().log("goto print : " + o.getString("info"));
                Doc doc = new SimpleDoc(o.getString("info").getBytes(), flavor, das);

                // 以下代码是监控代码，但是在佳博-58L这个打印机上，各个时间都不起作用
                // 不管成功与否，都只调用了printDataTransferCompleted和printJobNoMoreEvents
                // 所以可以忽略
                job.addPrintJobListener(new PrintJobListener() {

                    @Override
                    public void printDataTransferCompleted(PrintJobEvent pje) {
                        LoggerUtils.getInstance().log("Date Transfer Complete");
                    }

                    @Override
                    public void printJobCompleted(PrintJobEvent pje) {
                        LoggerUtils.getInstance().log("Job Completed");
                    }

                    @Override
                    public void printJobFailed(PrintJobEvent pje) {
                        LoggerUtils.getInstance().log("Job Failed");
                    }

                    @Override
                    public void printJobCanceled(PrintJobEvent pje) {
                        LoggerUtils.getInstance().log("Job Canceled"+ pje.getSource());
                    }

                    @Override
                    public void printJobNoMoreEvents(PrintJobEvent pje) {
                        LoggerUtils.getInstance().log("Job No More Events");
                    }

                    @Override
                    public void printJobRequiresAttention(PrintJobEvent pje) {
                        LoggerUtils.getInstance().log("Job Requires Attention");
                    }
                });
                job.print(doc, new HashPrintRequestAttributeSet());
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }

   public static void main (String args []){
       JSONObject o = new JSONObject();
       o.put("info","abcd") ;
       System.out.println(print(o));
   }

}