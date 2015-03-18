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
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;

@Path("wxplay")
public class WXPlayTestController {
    private static String URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";


    private static String encodingAesKey = "V8SrMqtqyLWFtfAOyyH8cAq8flXuh0YpCoPLTCwSQsA";
    private static String token = "tooooken";
    private static String appKey = "914f4388312ca90e4cb750b817d15368";
    private static String appId = "wx762f832959951212";
    private static String mch_id = "1233699402";


    private static String TXT = "<xml>\n" +
            "   <appid>{appId}</appid>\n" +
            "   <attach>支付测试</attach>\n" +
            "   <body>JSAPI支付测试</body>\n" +
            "   <mch_id>{mch_id}</mch_id>\n" +
            "   <nonce_str>{nonce_str}</nonce_str>\n" +
            "   <notify_url>http://wxpay.weixin.qq.com/pub_v2/pay/notify.v2.php</notify_url>\n" +
            "   <openid>{user_open_id}</openid>\n" +
            "   <out_trade_no>{order_id}</out_trade_no>\n" +
            "   <spbill_create_ip>14.23.150.211</spbill_create_ip>\n" +
            "   <total_fee>1</total_fee>\n" +
            "   <trade_type>JSAPI</trade_type>\n" +
            "   <sign>{sign}</sign>\n" +
            "</xml>"  ;
    @Get("test")
    @Post("test")
    public String rd( Invocation inv) {
        SortedMap<String,String> map  = new SortedMap<String,String>();
        map.put("appid",appId);
        map.put("attach","支付测试");
        map.put("body","JSAPI支付测试");
        map.put("mch_id",mch_id);
        map.put("nonce_str",)


        String sign = getSign()  ;

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
