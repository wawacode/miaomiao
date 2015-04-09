package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.util.Constants;
import org.apache.commons.codec.binary.StringUtils;

import javax.print.*;
import javax.print.attribute.*;
import javax.print.attribute.standard.MediaSizeName;
import javax.print.attribute.standard.PrinterIsAcceptingJobs;
import javax.print.attribute.standard.PrinterState;
import javax.print.event.PrintJobEvent;
import javax.print.event.PrintJobListener;
import java.text.SimpleDateFormat;
import java.util.Date;


public class PrinterV2 {


    private static String time(Date d){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(d);
        return dateString;
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


}