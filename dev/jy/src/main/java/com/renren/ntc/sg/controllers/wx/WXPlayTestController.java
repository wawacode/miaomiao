package com.renren.ntc.sg.controllers.wx;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.SMSService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
import com.renren.ntc.sg.util.wx.Sha1Util;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;

@Path("wxplay")
public class WXPlayTestController {
    private static String URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";


    private static String encodingAesKey = "V8SrMqtqyLWFtfAOyyH8cAq8flXuh0YpCoPLTCwSQsA";
    private static String token = "tooooken";
    private static String appKey = "914f4388312ca90e4cb750b817d15368";
    private static String appId = "wx762f832959951212";
    private static String mch_id = "1233699402";

    private static String  notify_url ="http:/www.mbianli.com/wx/cb";


    private static String TXT = "<xml>\n" +
            "   <appid>{appId}</appid>\n" +
            "   <attach>支付测试</attach>\n" +
            "   <body>JSAPI支付测试</body>\n" +
            "   <mch_id>{mch_id}</mch_id>\n" +
            "   <nonce_str>{nonce_str}</nonce_str>\n" +
            "   <notify_url>{notify_url}</notify_url>\n" +
            "   <openid>{user_open_id}</openid>\n" +
            "   <out_trade_no>{order_id}</out_trade_no>\n" +
            "   <spbill_create_ip>{spbill_create_ip}/spbill_create_ip>\n" +
            "   <total_fee>{total_fee}</total_fee>\n" +
            "   <trade_type>JSAPI</trade_type>\n" +
            "   <sign>{sign}</sign>\n" +
            "</xml>"  ;
    @Get("test")
    @Post("test")
    public String test( Invocation inv) {
        String user_open_id = "";
        String  order_id = "C123123213" ;
        int  total_fee = 1000;
        SortedMap<String,String> map  = new TreeMap <String,String> ();
        String noncestr = Sha1Util.getNonceStr();
        String timestamp = Sha1Util.getTimeStamp();
        String spbill_create_ip = "123.56.102.224";
        map.put("appid",appId);
        map.put("attach","支付测试");
        map.put("body","JSAPI支付测试");
        map.put("mch_id",mch_id);
        map.put("nonce_str",noncestr);
        map.put("notify_url",notify_url) ;
        map.put("openid", user_open_id );
        map.put("out_trade_no", order_id );
        map.put("spbill_create_ip", spbill_create_ip );
        map.put("trade_type", "JSAPI" );
        map.put("total_fee",total_fee + "");


        String sign = getSign(map)  ;

        return "play";
    }


    public String getSign(SortedMap<String,String> params ){
        try {
            String sign = Sha1Util.createSHA1Sign(params);
             return sign;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

}
