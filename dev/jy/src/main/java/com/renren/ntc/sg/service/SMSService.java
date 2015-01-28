package com.renren.ntc.sg.service;

import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-1-27
 * Time: 下午12:20
 * To change this template use File | Settings | File Templates.
 */
@Service
public class SMSService {


    public  void send ( String msg, String tid ,String phone) {
    //发送短信通知
    try {
            String v = null;
            String url;
            String mobile = "";
            byte[] t = null;
            String message = "#msg#=" + msg ;
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, tid, phone, message);
            LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s,%s ", mobile, url));
            t = SHttpClient.getURLData(url, "");
            String response = SUtils.toString(t);
            LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s  %s ", response, mobile, url));
    } catch (Throwable  e) {
        e.printStackTrace();
    }
    }
}
