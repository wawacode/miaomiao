package com.renren.ntc.sg.controllers.wx;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.SMSService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
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
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Path("")
public class WXController {

    @Autowired
    public SMSService smsService;
//    public Map <String,String>  map = new ConcurrentHashMap<String,String>() ;

    private  static final String PREFIX = "qrscene_";
    public  WXController (){
//        map.put("qrscene_3","18600326217") ;
    }
    static final String CONTENT ="<xml>\n" +
            "<ToUserName><![CDATA[{toUser}]]></ToUserName>\n" +
            "<FromUserName><![CDATA[{fromUser}]]></FromUserName>\n" +
            "<CreateTime>{time}</CreateTime>\n" +
            "<MsgType><![CDATA[text]]></MsgType>\n" +
            "<Content><![CDATA[{message}]]></Content>\n" +
            "</xml>";


    static final String DUOKEFU = "<xml>\n" +
            "<ToUserName><![CDATA[{toUser}]]></ToUserName>\n" +
            "<FromUserName><![CDATA[{fromUser}]]></FromUserName>\n" +
            "<CreateTime>{time}</CreateTime>\n" +
            "<MsgType><![CDATA[transfer_customer_service]]></MsgType>\n" +
            "</xml>" ;



    static final String CONTENT2 ="<xml>\n" +
            "<ToUserName><![CDATA[{toUser}]]></ToUserName>\n" +
            "<FromUserName><![CDATA[{fromUser}]]></FromUserName>\n" +
            "<CreateTime>{time}</CreateTime>\n" +
            "<MsgType><![CDATA[news]]></MsgType>\n" +
            "<ArticleCount>1</ArticleCount>\n" +
            "<Articles>\n" +
            "<item>\n" +
            "<Title><![CDATA[喵喵生活]]></Title> \n" +
            "<Description><![CDATA[关于喵喵]]></Description>\n" +
            "<PicUrl><![CDATA[http://www.mbianli.com/images/loadingpage-full.png]]></PicUrl>\n" +
            "<Url><![CDATA[https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx762f832959951212&redirect_uri=http%3A%2F%2Fwww.mbianli.com%2Fsg%2Fabout&response_type=code&scope=snsapi_base&state=128#wechat_redirect]]></Url>\n" +
            "</item>\n" +
            "</Articles>\n" +
            "</xml> ";

    static final String MESSAGE = "喵喵生活为您连接身边便利，在家动动手指，便利百货为您送货上门。\n" +
            "\n" +
            "配送商品: 便利百货，在便利店能买到的我们都能送；\n" +
            "配送方式: 20元起送, 货到付款, 免运费；\n" +
            "配送时间: 24小时覆盖，30分钟送货上门；\n" +
            "\n" +
            "\n" +
            "微信预定请点击下方“我要下单”";


    @Get("")
    @Post("")
    public String index( Invocation inv,@Param("echostr") String echostr) {
        HttpServletRequest request =  inv.getRequest();
        String body = "";
        try {
             body = getBodyString(request.getReader());
             LoggerUtils.getInstance().log(String.format("rec body %s  ", body));
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(!StringUtils.isBlank(body)){
            String str = parse(body);
            LoggerUtils.getInstance().log(String.format("return %s  ", str)) ;
            return "@" + str;
        }
        return "@" + echostr;
    }



    private  String parse(String body) {
        String mtype =  getMtype(body);
        String toUser = getToUser(body);
        String fromUser = getFromUser(body);
        String eventKey = getEventKey(body);
        String event = getEvent(body);

        if ("event".equals(mtype)) {

            if ("about_miaomiao".equals(eventKey)){
              LoggerUtils.getInstance().log( String.format(" rec event from wx fromUser  %s  event %s ,eventKey %s",fromUser, event ,eventKey));
              String response = CONTENT2.replace("{message}", MESSAGE);
              response = response.replace("{toUser}",fromUser);
              response = response.replace("{fromUser}",toUser);
              response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
              return  response;
            }
            if ("subscribe".equals(event)){
                String content = getContent(body);
                LoggerUtils.getInstance().log(String.format("rec  content %s ",content));
                String response = CONTENT.replace("{message}", MESSAGE);
                response = response.replace("{toUser}",fromUser);
                response = response.replace("{fromUser}",toUser);
                response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
                if(eventKey.startsWith(PREFIX)) {
                long act =   JRedisUtil.getInstance().sadd("set_" + eventKey ,fromUser) ;
                String phone = JRedisUtil.getInstance().get(eventKey);
                if(!StringUtils.isBlank(phone)&& act == 1) {
                    smsService.sendSMS2tguang(fromUser,phone);
                   }
                }
                return  response;

            }

        }
//        // 用户给发消息
        String content = getContent(body);
        LoggerUtils.getInstance().log(String.format("rec  content %s ",content));
        String response = DUOKEFU.replace("{message}", MESSAGE);  // 这个其实没用
        response = response.replace("{toUser}",fromUser);
        response = response.replace("{fromUser}",toUser);
        response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
        return  response;
    }

    private String getContent(String body) {
        String s = "<Content><![CDATA[";
        String e = "]]></Content>";
        int start =body.indexOf(s);
        int end =body.indexOf(e);
        if (-1 == start || -1 == end){
            return "" ;
        }
        return body.substring( s.length() + start ,end);
    }

    private static String getEventKey(String body) {
        String s = "<EventKey><![CDATA[";
        String e = "]]></EventKey>";
        int start =body.indexOf(s);
        int end =body.indexOf(e);
        if (-1 == start || -1 == end){
            return "" ;
        }
        return body.substring( s.length() + start ,end);

    }


    private static  String getEvent(String body) {
        String s = "<Event><![CDATA[";
        String e = "]]></Event>";
        int start =body.indexOf(s);
        int end =body.indexOf(e);
        return body.substring( s.length() + start ,end);
    }

    private static  String getMtype(String body) {
        int start =body.indexOf("<MsgType><![CDATA[");
        int end =body.indexOf("]]></MsgType>");
        return body.substring( 18 + start ,end);
    }

    private static String getFromUser(String body) {
        int start =body.indexOf("<FromUserName><![CDATA[");
        int end =body.indexOf("]]></FromUserName>");
        return body.substring( 23 + start ,end);
    }

    private static String getToUser(String body) {
        int start =body.indexOf("<ToUserName><![CDATA[");
        int end =body.indexOf("]]></ToUserName>");
        return body.substring( 21 + start ,end);
    }

    public static String getBodyString(BufferedReader br) {
        String inputLine;
        String str = "";
        try {
            while ((inputLine = br.readLine()) != null) {
                str += inputLine;
            }
            br.close();
        } catch (IOException e) {
            System.out.println("IOException: " + e);
        }
        return str;
    }


    @Get("rd")
    @Post("rd")
    public String rd( Invocation inv,@Param("phone")String phone) {
        String dps = CookieManager.getInstance().getCookie(inv.getRequest(),"CAT_DPS");
        if (!StringUtils.isBlank(dps)) {
            LoggerUtils.getInstance().log(String.format("Catstaff  rec first time phone %s access ",phone));
            CookieManager.getInstance().saveCookie(inv.getResponse(),"CAT_DPS","hello");
        }else{
            LoggerUtils.getInstance().log(String.format("Catstaff  rec not first time phone %s access ",phone));
        }
        return "r:http://weixin.qq.com/r/l3UsNBHEW0wkrVVX9yCF";
    }

    @Get("stats")
    @Post("stats")
    public String stats( Invocation inv) {
        String aaa = "qrscene_1 oQfDLjhxmkb509lIOlvg0mJO3g3s,qrscene_2 oQfDLjga8BA0kpAPD6wsO8kNWiu4,qrscene_3 oQfDLjjDBUX-jluf2qR_ZIwLnSGs,qrscene_3 oQfDLjuggR_mBLyAM9OXZQKpP_s4,qrscene_3 oQfDLjp8UmylfRwuJIYNigpU8IBg,qrscene_3 oQfDLjtNq4WX8Zv11xm-PzDkiWvk,qrscene_3 oQfDLjgxiOV4lqsYjWCmaMcEPlOE,qrscene_3 oQfDLjlyD3oDpJJQLU0d9TpAljVw,qrscene_3 oQfDLjkFkBf8RJP7QqUb7aLlllN8,qrscene_3 oQfDLjgCQqhrC5bImi5fB7vRZdfc,qrscene_3 oQfDLjm-S7SoaY0FNSVnVOgTXVyY,qrscene_3 oQfDLjh6G0X9blDiPsDe2Tzdcv2Q,qrscene_3 oQfDLjoxyGYMN2ZQkkr5LWecoM2w,qrscene_3 oQfDLjpbwdKJ6fxJslZVlcoIhoX8,qrscene_1 oQfDLjnPAfpwYrxYAMWPevI2_HWM,qrscene_1 oQfDLjiwQUMBRJ5eraL2_YMADJHA,qrscene_3 oQfDLjr9WQjaT8diMsOv5HuyaTn4,qrscene_1 oQfDLjhg0pbQEtxpDKPEyDQbti9c,qrscene_3 oQfDLjhMAXbKKFTWna9VnsmiCOq4,qrscene_1 oQfDLjnDfTvOz9RdndK988iq4-JE,qrscene_1 oQfDLjggOCwWkRpvuI9PN8Nx4b3U,qrscene_3 oQfDLjqbj7fh_fn_HYNifwuQ1B1w,qrscene_1 oQfDLjiLcQByooNQtcdAHubLkIQw,qrscene_1 oQfDLjv1vKQJrnVhWyFDxyt3Z_3w,qrscene_1 oQfDLjoXY7T7O2L1x5B81ELRZOAo,qrscene_1 oQfDLjmdI7Osu89A2myQPr7TLCvE,qrscene_3 oQfDLjubDDxSFetPakyyVD-7h5x4,qrscene_3 oQfDLjpR7QtHvTueaFthL6wCqBfI,qrscene_1 oQfDLjkdBSrdtvsyBkiZkcId-n_g,qrscene_1 oQfDLjrV312vUj2ZiZOT2w8Egmps,qrscene_1 oQfDLjhzgCFnyLGrLxdmWcq3QyxQ,qrscene_3 oQfDLjrQ6kO7FdFtJC7EZ6k7r8hE,qrscene_1 oQfDLjicFbPImHc_QhaFA8bTyiUI,qrscene_3 oQfDLjsft2U4KtqSRsUGCyn5KF1w,qrscene_1 oQfDLjhQAY6ZN90sUyJHvMJI0wEo,qrscene_3 oQfDLju1pelbJhIehEjOMCjONMkE,qrscene_1 oQfDLjiCjBDuofCw72cqwHTtM3C8,qrscene_3 oQfDLjlYD9GpNTycbmxbAUF9Bgmc,qrscene_1 oQfDLjmm0rr17v_eRUJbiksG0DY0,qrscene_1 oQfDLjk91jUxcMeW3jN0ACwVWAkM,qrscene_3 oQfDLjqZWh0-wkAqWn3AcURBg1ow,qrscene_1 oQfDLjvZd0X9hOtMfhFwlmZYjBJw,qrscene_1 oQfDLjlaNeP5I8uYN9enlTw5gitw,qrscene_1 oQfDLjvh2nE5rN8Nid7zGmHnov70,qrscene_3 oQfDLjmczUC3KyT61xazEQa6hWUg,qrscene_3 oQfDLjq88HBOEqXtYkX8YUtrsdXA,qrscene_3 oQfDLjmI8rpgcth5IeQ2bEviOjkY,qrscene_3 oQfDLjrMEf9RzX4Ob0T7K3JuVrRU,qrscene_3 oQfDLjuMmnoTI_jU1o8EmeZ8qneo,qrscene_3 oQfDLjqbhS4MdBBVsCYcsvrEK5N0,qrscene_3 oQfDLjmJPk7slZj0dIja6n2UFkQg,qrscene_1 oQfDLjvxMP0QjeMic-XGC4rNEmV4,qrscene_3 oQfDLjmjUIWwNcRYnFPC_KSCMJK4,qrscene_1 oQfDLjg6SlLnf9ajppqFU4mu9MRE,qrscene_2 oQfDLjn5b77Hh0i2l_FicA3FjyyA,qrscene_3 oQfDLjrsOa8XC6Af3FgtMfsD-12g,qrscene_3 oQfDLjrzNacBL2rkyHxm_aaJNcek,qrscene_3 oQfDLjpRK8411Tq5qq8qdj48aHUQ,qrscene_2 oQfDLjhubBTwbrNjcOjaOLx1M14w,qrscene_1 oQfDLjhs3DfN52ukdEo16RIiN8VE,qrscene_1 oQfDLjnMb6PbHLVWQwGFKs3WbfsM,qrscene_1 oQfDLjngXL4vAs4UXCiCs8yOQ0F8,qrscene_1 oQfDLjtmSjNcUM0bHkapPhnatXyw,qrscene_3 oQfDLjqKjGvYkm8x-CYEGFabKVfM,qrscene_3 oQfDLjghKVYg24vt9JOnyAL-QWFA,qrscene_3 oQfDLjsv5Ux3gjelxbc1ovAaXYbQ,qrscene_3 oQfDLjoEyMifrQTaEabKGifG4OjM,qrscene_3 oQfDLjnfX86Tv6COgKK65rwWp2MM,qrscene_2 oQfDLjsig7QjM1BThPNaEbCMBH48,qrscene_3 oQfDLjpdChsJKHBb4rVZVhXA7y9E,qrscene_2 oQfDLjqtPVU-OPCdWvFKnFqNHzt0,qrscene_2 oQfDLjgN0dHfTi-m8VTj7WJdKpQ8,qrscene_1 oQfDLjt42oL2MhUmawANrWiW1N2g,qrscene_1 oQfDLjnjyPbsSH8P80shxTIpcehc,qrscene_1 oQfDLjnwyLWpAAzfHlq_ve_oy8Yo,qrscene_3 oQfDLjs5Lz3gbvwWJCf4VTxApKak,qrscene_2 oQfDLjkjcibkJBaCD-pLtyL20bUI,qrscene_2 oQfDLjv4WwiqtYjvf_C95qc6Huqc,qrscene_3 oQfDLjsoPtC5Hn6VKdIytvTyYJxc,qrscene_3 oQfDLjmWbiVKewdIRtGm5Fi2LnPY,qrscene_3 oQfDLjqSdwKeJ2e6c_AUd3JvMSms,qrscene_3 oQfDLjgE4xhpucLutb_xDcx35YDg,qrscene_3 oQfDLjikTxvnYo3p3Pqm_W8z8Bgo,qrscene_3 oQfDLjnPibWzhs2Ie-Lwo-Au0gBs,qrscene_3 oQfDLjh-IjUiA2v1_QRplSCmCwaE,qrscene_3 oQfDLjguUU3jJBxC8D80euBZFEZg,qrscene_3 oQfDLjh--xZrslrk3BWsk6JmYSh0,qrscene_3 oQfDLjue53Wbd9BIbI5k2AY4NTdY,qrscene_3 oQfDLjo3AucLhbJAUEdB8FfcOZZw,qrscene_3 oQfDLjiTJQ-qNvZph3LaC2Fv0v3c,qrscene_1 oQfDLjgXoZ8tpUVD5W6zFQ0lvlzQ,qrscene_3 oQfDLji2exopszrC_84ArupOHiKc,qrscene_3 oQfDLjuuB1rP_BTwePG0n5mS4NZs,qrscene_3 oQfDLjtlUWUK5kRVWm1JZiBtmipI,qrscene_3 oQfDLjhcsJ_c3j3Be0R-zMw-rNo4,qrscene_2 oQfDLjmBOxOiu0LHIL4XtEXATyCQ,qrscene_2 oQfDLjvFbhSrnjhNhe5n4pG9om_Q,qrscene_2 oQfDLjuU_ew2ZfHFXM3mdkIYmwOI,qrscene_2 oQfDLjp_c6cttfDNtSbnEZ_joAfk,qrscene_1 oQfDLjoCnBd0dviJ53PxZt7Q4F8Y,qrscene_3 oQfDLjuzXp_QcihxB_ta66Du87ao,qrscene_3 oQfDLjkcQFQPhaGI-R6qKRD44zu0,qrscene_3 oQfDLjhG4x0JuXKbfJw1cJr5j95E,qrscene_3 oQfDLjqqDiLu79ogfdmYnLN2B0WM,qrscene_3 oQfDLjpNWCFylKH1bPJ60Cvm983M,qrscene_3 oQfDLjiHhMox-OZ9EVwQA1vyKjfQ,qrscene_3 oQfDLjl_IvfnYtbSUB0478iZVbok,qrscene_3 oQfDLjhtU9LCa58UBtxfrS0Tcfrs,qrscene_3 oQfDLjtPAtX9bO24Rnn1Pbekq-xY,qrscene_3 oQfDLjjhbDHWRh46j_q62euk1GjE,qrscene_3 oQfDLjmh1fz93mSBKH4rgsOPbHQU,qrscene_3 oQfDLjsTjJWbwqArqTkUW_1PLWUg,qrscene_3 oQfDLjmKx1xRH1nOaeLkLSTZVBqs,qrscene_3 oQfDLjm39zczQuu0bjOGrBZATc0I,qrscene_3 oQfDLjmj4MSN7thGBJWafmA7vosc,qrscene_3 oQfDLjhIEB3dgrqrxZgPCkEhLMvg,qrscene_3 oQfDLjv9tLeoyKLwlEcskzmE1Czs,qrscene_3 oQfDLjkwYWKDLYdVwt7YyuoBS3d8,qrscene_3 oQfDLjltrKY04451S0EHxI_iGThQ,qrscene_3 oQfDLjs6gy3_aFigVLxJCkVdsXQg,qrscene_3 oQfDLjsc-bH7tcoR-t_MDKI6aQyg,qrscene_3 oQfDLjuVvoHW3F8uhbaIgV6wmn4I,qrscene_3 oQfDLjjo2jv_juUubnY6RHP9NYpU,qrscene_3 oQfDLjiukGonCL7gLduAPqmgOp0E,qrscene_3 oQfDLjqBWRNrvM99l2ahlXVlzzUU,qrscene_3 oQfDLjvQLmQtv1fsdtkhNk-6jtMU,qrscene_3 oQfDLjsy7PdsqSJVQwKe4AZMCK8w,qrscene_3 oQfDLjrUC6i0n1iBm6RW3pDneuFw,qrscene_3 oQfDLjkPy_MPH6AY2vW0JaC2fhTE,qrscene_3 oQfDLjjtXEshzr5mjW8BUk8S5gpY,qrscene_3 oQfDLjqJy19REBqnWcFEjRMxYPCU,qrscene_3 oQfDLjotYvcE2mlc3lOtF2bS9BA8,qrscene_3 oQfDLjgJ6FORQpC-kpsKjCdSC5vA,qrscene_3 oQfDLjljXssluVN6QT8ex4x0XNJE,qrscene_3 oQfDLjgqM1vqE3q2d1dWOsP80bc8,qrscene_3 oQfDLjpqedMiTeilsnyI6Mhru9jA,qrscene_3 oQfDLjop5EQzfgD1Qm-KOskyKZ3M,qrscene_3 oQfDLjpZC_f7GcDF7JtaYUuKyizY,qrscene_3 oQfDLjuXSe_Pl-3EzR3ZWX4bbs1w,qrscene_3 oQfDLjtvnVGWKgMR1NKUezkmk5c0,qrscene_3 oQfDLjtUluStarjQ9-437SsIWzX4,qrscene_3 oQfDLjrW-U0zGK0IT7NoBrA0VBPs,qrscene_3 oQfDLjjy26S_WnCe4-_UpQ7K-IUA,qrscene_3 oQfDLjkzZKvpWWpmagqIacRV_1Ik,qrscene_3 oQfDLjoTn4eB9k_1LTZ3i9juPA8Q,qrscene_3 oQfDLjqmn2uB0Mi83gmvizIWw8K0,qrscene_3 oQfDLjoTCC8kNFo4QLdiMG4GLwj4,qrscene_3 oQfDLjvXoP1TBr-58vdbjg9Ox85M,qrscene_3 oQfDLjgVChY8-jUuw_Jz2VVTOyVk,qrscene_3 oQfDLjgQv7fH4DNwGuMkwb0MQE5M,qrscene_3 oQfDLjvPHtylkFFNyT7C8JJgwmIM,qrscene_3 oQfDLjk5COnPcSZVobEtqrFD49WA,qrscene_3 oQfDLju1pelbJhIehEjOMCjONMkE,qrscene_3 oQfDLjktiScjBmLK5oCsuDQmM1NM,qrscene_3 oQfDLjrGJWCa4c1tQYuLb96YmT74,qrscene_3 oQfDLjiTP9hezFGdXXydqV5MKunc,qrscene_3 oQfDLjnLL0hfGmyCdpCaBQiCrGno,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_3 oQfDLjjQ5rtT1E_xfR4LBeytgBgM,qrscene_3 oQfDLjrUnG8fbsjrjDxuuIgrNq90,qrscene_3 oQfDLjqnkzIEiWjkCwmao1lZD5XI,qrscene_3 oQfDLjjGM-Oat1hwFX8lunJF21AA,qrscene_3 oQfDLjvuOgdQafvDw48afOGqX09I,qrscene_3 oQfDLjqqhouvZ-_jmRkPu1m9kemY,qrscene_3 oQfDLjuXmuF8TiHse-hDQsR1xOa8,qrscene_3 oQfDLjulu7ANxnVbUMwthxvgsYR0,qrscene_3 oQfDLjhXe6nc5jqLE6XzVpmoqTe0,qrscene_3 oQfDLjr8TpjvBCsB4pue9vWtGdqo,qrscene_1 oQfDLjoN-bFnj7KpjHO8cKyL8d9Q,qrscene_3 oQfDLjsMi_NW-EPES7uLIunECt3g,qrscene_3 oQfDLjlEIAmjI0vDvMtKlDYRAHsk,qrscene_3 oQfDLjtxkCeMHqGskdOzvNogRbRw,qrscene_1 oQfDLjjzMHuAXhb0ePMugUVIFNKE,qrscene_3 oQfDLjkShgK_k_ftTWuMSW5ED2A0,qrscene_3 oQfDLjnmrAArohoQPiGJonNrU71c,qrscene_3 oQfDLjs7R7JHfopV14NuT6uLKfKU,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_1 oQfDLjqay5d9ceJljsRZEOHxpDd4,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic";
        String [] strs =  aaa.split(",");
        for (String s : strs){
            String[] ss = s.split(" ");
            System.out.println("1");
            JRedisUtil.getInstance().sadd("set_" + ss[0], ss[1]);
        }
        Set<String> keys = JRedisUtil.getInstance().keys("set_" + PREFIX+"*");

        Map<String,Long>  map = new HashMap<String,Long>() ;
        JSONObject jb =  new JSONObject();
        for (String key  :keys){
            long count = JRedisUtil.getInstance().scard(key) ;
            map.put(key,count) ;
            jb.put(key,count) ;
        }
        inv.addModel("stats",map);
        return "@" + jb.toJSONString();
    }
    @Post("add_phone")
    public String add_phone( Invocation inv,@Param("phone") String phone,@Param("qrscene") String qrscene) {
        JRedisUtil.getInstance().set(qrscene,phone) ;
        return "@" + Constants.DONE;
    }

    public static void main(String[] args) {
          Set<java.lang.String>  ss =  JRedisUtil.getInstance().keys(PREFIX+"*");
          for (String s :ss ){
              System.out.println(s);
          }
//        System.out.println(System.currentTimeMillis());
//        String s = "<xml><ToUserName><![CDATA[gh_226cfc194264]]></ToUserName><FromUserName><![CDATA[ofhqduNm5nNDqE3zV_FIOSz9rJdA]]></FromUserName><CreateTime>1421837689</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[A地方法规和]]></Content><MsgId>6106746374681307894</MsgId></xml> ";
//        System.out.println(getToUser(s));
//        System.out.println(getFromUser(s));
//        System.out.println(getMtype(s));
//        System.out.println(getEvent(s));
    }
}
