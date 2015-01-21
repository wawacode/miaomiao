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
            "<CreateTime>12345678</CreateTime>\n" +
            "<MsgType><![CDATA[text]]></MsgType>\n" +
            "<Content><![CDATA[{content}]]></Content>\n" +
            "</xml>";
    static final String content = "喵喵生活为您连接身边便利，在家动动手指，便利百货为您送货上门。\n" +
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
        LoggerUtils.getInstance().log(String.format("rec echostr %s  ",echostr));
        Map map =  inv.getRequest().getParameterMap();
        LoggerUtils.getInstance().log(String.format("rec echostr %s  ", JSON.toJSON(map)));
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



    private String parse(String body) {
        String response = CONTENT.replace("{content}",content);
        return  response;
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

}
