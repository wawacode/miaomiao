package com.renren.ntc.sg.controllers;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.dao.SWPOrderDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.CookieManager;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.List;

@Path("")
@DenyCommonAccess
public class HomeController {

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    public ShopDAO shopDao;

    /**
	 * 用于处理用户喜欢和不喜欢的ajax请求，成功返回1，失败返回0
	 * @return
	 */
    @Get("")
    @Post("")
    public String index( Invocation inv) {
           return "home";
    }


    @Get("query")
    public String query (Invocation inv ,@Param("chn") String chn){
        JSONArray jarr =  new JSONArray();
        if ("print".equals(chn)){
        List<Device>  ls = deviceDAO.getDevs();
        for (Device d :ls ){
            JSONObject jb =   new JSONObject();
            Shop shop = shopDao.getShop(d.getShop_id());
            if(null == shop ){
                continue;
            }
            jb.put(shop.getName()  ,d.getStatus() + "_" + d.getUpdate_time());
            jarr.add(jb);
        }
        }
        return "@" + jarr.toJSONString(1);
    }
}
