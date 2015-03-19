package com.renren.ntc.sg.controllers.wx;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.controllers.wx.client.TenpayHttpClient;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.wx.MD5Util;
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

    @Autowired
    private NtcHostHolder  ntcHost ;
    @Autowired
    private WXService  wxService;

    private static String encodingAesKey = "V8SrMqtqyLWFtfAOyyH8cAq8flXuh0YpCoPLTCwSQsA";
    private static String token = "tooooken";
    private static String appKey = "914f4388312ca90e4cb750b817d15368";
    private static String appId = "wx762f832959951212";
    private static String mch_id = "1233699402";

    private static String key = "210f760a89db30aa72ca258a3483cc7f";


    private static String  notify_url ="http:/www.mbianli.com/wx/cb";


    private static String TXT = "<xml>\n" +
            "   <appid>{appId}</appid>\n" +
            "   <attach>{attach}</attach>\n" +
            "   <body>{body}</body>\n" +
            "   <mch_id>{mch_id}</mch_id>\n" +
            "   <nonce_str>{nonce_str}</nonce_str>\n" +
            "   <notify_url>{notify_url}</notify_url>\n" +
            "   <openid>{openid}</openid>\n" +
            "   <out_trade_no>{out_trade_no}</out_trade_no>\n" +
            "   <spbill_create_ip>{spbill_create_ip}</spbill_create_ip>\n" +
            "   <total_fee>{total_fee}</total_fee>\n" +
            "   <trade_type>JSAPI</trade_type>\n" +
            "   <sign>{sign}</sign>\n" +
            "</xml>"  ;
    @Get("ua_ck")
    @Post("ua_ck")
    public String ck( Invocation inv) {

        String ua = inv.getRequest().getHeader("User-Agent") ;
        canwxpay(ua) ;
        return "play";
    }

    private boolean  canwxpay(String ua) {
        String key = "MicroMessenger/";
        int start = ua.indexOf(key) ;
        if (-1 == start){
            return false;
        }
        try{
        String ver = ua.substring(start + key.length());
         float v = Float.valueOf(ver);
            if (v >= 5.0){
                return true;
            }
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return false;
    }

    @Get("test_order")
    @Post("test_order")
    public String test_order( Invocation inv) {
        return "test_order"  ;
    }

    @Get("test")
    @Post("test")
    public String test( Invocation inv) {
        User user =  ntcHost.getUser();

        String ua = inv.getRequest().getHeader("User-Agent") ;
        String read_ip = inv.getRequest().getHeader("X-Real-IP") ;
        LoggerUtils.getInstance().log(String.format("User Agent  %s ",ua));
        LoggerUtils.getInstance().log(String.format("X-Real-IP  %s ",read_ip));

        if(!canwxpay(ua)) {

        }
        String user_open_id = "oQfDLjmJTHCMo-b6gKECZWkTBUzc";
        String  out_trade_no = "C123123213" ;
        int  total_fee = 1000;
        String  trade_type = "JSAPI";
        String attach = "test";
        String body = "test";
        JSONObject  respone = new JSONObject();
        JSONObject  data = new JSONObject();
        try {
            SortedMap<String,String> map  = new TreeMap <String,String> ();
            String nonce_str = Sha1Util.getNonceStr();
            String timestamp = Sha1Util.getTimeStamp();
            String spbill_create_ip = "";
            map.put("appid",appId);
            map.put("attach",attach);
            map.put("body",body);
            map.put("mch_id",mch_id);
            map.put("nonce_str",nonce_str);
            map.put("notify_url",notify_url) ;
            map.put("openid", user_open_id );
            map.put("out_trade_no", out_trade_no );
            map.put("spbill_create_ip", spbill_create_ip );
            map.put("total_fee",total_fee + "") ;
            map.put("trade_type", trade_type );
            String sign =  createSign(map).toUpperCase()  ;

            String content = TXT.replace("{appId}",appId);
            content  = content.replace("{attach}",attach);
            content  = content.replace("{body}",body);
            content  = content.replace("{mch_id}",mch_id);
            content  = content.replace("{nonce_str}",nonce_str);
            content  = content.replace("{notify_url}",notify_url);
            content  = content.replace("{openid}",user_open_id);
            content  = content.replace("{out_trade_no}",out_trade_no);
            content  = content.replace("{spbill_create_ip}",spbill_create_ip);
            content  = content.replace("{total_fee}",total_fee+"");
            content  = content.replace("{trade_type}",trade_type);
            content  = content.replace("{sign}",sign);
            System.out.println("send " + content);
            TenpayHttpClient http = new TenpayHttpClient();
            http.callHttpPost(URL,content);
            String  res  = http.getResContent();
            System.out.println( "wx rec " +  res );
            String pre_id = getPrePay(res);

            data.put("pre_id",pre_id) ;
            data.put("appid",appId) ;
            data.put("out_trade_no",out_trade_no) ;
            data.put("total_fee",total_fee) ;
            data.put("trade_type",trade_type) ;
            respone.put("code",0);
            respone.put("data",data);
        } catch (Exception e) {
            e.printStackTrace();
            return "@json:" + Constants.UKERROR;
        }
        return "@json:" + respone.toJSONString();
    }

    @Get("getjtk")
    @Post("getjtk")
    public String getjtk(Invocation inv){
        String  js_ticket = wxService.getJS_ticket();
        return "@" + js_ticket;
    }

    @Get("sign")
    @Post("sign")
    public String sign(Invocation inv){
      SortedMap<String, String> packageParams = new TreeMap<String, String>();
      String  sign =  createSign(packageParams);
      return "@" + sign;
     }

    public static void main(String[] args) {

        WXService wx =  new WXService();
        System.out.println(wx.getJS_ticket());

    }

    private static String getPrePay(String res) {
        String s = "<prepay_id><![CDATA[";
        String e = "]]></prepay_id>";
        int start = res.indexOf(s);
        int end = res.indexOf(e);
        if (-1 == start ||  -1 == end){
            return "" ;
        }
        return res.substring( s.length() + start ,end);
    }


    public static String createSign(SortedMap<String, String> packageParams) {
        StringBuffer sb = new StringBuffer();
        Set es = packageParams.entrySet();
        Iterator it = es.iterator();
        while (it.hasNext()) {
            Map.Entry entry = (Map.Entry) it.next();
            String k = (String) entry.getKey();
            String v = (String) entry.getValue();
            if (null != v && !"".equals(v) && !"sign".equals(k)
                    && !"key".equals(k)) {
                sb.append(k + "=" + v + "&");
            }
        }
        sb.append("key=" + key);
        System.out.println("md5 sb:" + sb);
        String sign = MD5Util.MD5Encode(sb.toString(), "utf-8")
                .toUpperCase();
        return sign;
    }
}
