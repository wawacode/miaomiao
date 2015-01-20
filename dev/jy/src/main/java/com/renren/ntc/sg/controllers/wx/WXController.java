package com.renren.ntc.sg.controllers.wx;

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

import java.util.List;

@Path("")
public class WXController {

    @Get("")
    @Post("")
    public String index( Invocation inv,@Param("echostr") String echostr) {
           return "@" + echostr;
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
