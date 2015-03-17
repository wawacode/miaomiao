package com.renren.ntc.sg.controllers.wx;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.service.LoggerUtils;
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
import java.util.List;
import java.util.Map;

@Path("")
public class WXController {
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
        if ("event".equals(mtype)) {
            String event = getEvent(body);
            String eventKey = getEventKey(body);
            if ("about_miaomiao".equals(eventKey)){
            LoggerUtils.getInstance().log( String.format(" rec event from wx fromUser  %s  event %s ,eventKey %s",fromUser, event ,eventKey));
            String response = CONTENT2.replace("{message}", MESSAGE);
            response = response.replace("{toUser}",fromUser);
            response = response.replace("{fromUser}",toUser);
            response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
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

    private static String getEventType(String body) {
        String s = "<Event><![CDATA[";
        String e = "]]></Event>";
        int start =body.indexOf(s);
        int end =body.indexOf(e);
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

    public static void main(String[] args) {
        System.out.println(System.currentTimeMillis());
        String s = "<xml><ToUserName><![CDATA[gh_226cfc194264]]></ToUserName><FromUserName><![CDATA[ofhqduNm5nNDqE3zV_FIOSz9rJdA]]></FromUserName><CreateTime>1421837689</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[A地方法规和]]></Content><MsgId>6106746374681307894</MsgId></xml> ";
        System.out.println(getToUser(s));
        System.out.println(getFromUser(s));
        System.out.println(getMtype(s));
        System.out.println(getEvent(s));
    }
}