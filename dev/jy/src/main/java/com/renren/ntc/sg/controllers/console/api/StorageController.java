package com.renren.ntc.sg.controllers.console.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.biz.dao.StorageDAO;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-3-10
 * Time: 下午7:49
 * To change this template use File | Settings | File Templates.
 */
 @Path("storage")
public class StorageController {
    @Autowired
    public ShopDAO shopDao ;

    @Autowired
    public StorageDAO storageDao;

    @Post("set")
    @Get("set")
    public String set(Invocation inv,@Param("token") String token, @Param("shop_id") long shop_id){
        if(StringUtils.isBlank(token)){
            token =  CookieManager.getInstance().getCookie(inv.getRequest(),Constants.COOKIE_KEY_USER);
        }
        long  userid = getUserId(token);
        storageDao.insertAndUpdate(userid,shop_id);
        return "@json;" + Constants.DONE;
    }

    private long getUserId(String token) {
        String [] args = token.split("_");
        String id = args[1] ;
        long uid = 0 ;
        try {
           uid = Long.valueOf(id);
        }catch(Exception e){
            e.printStackTrace();
        }
        return uid;
    }

    @Post("get")
    @Get("get")
    public String get(Invocation inv,@Param("token") String token ){
        if(StringUtils.isBlank(token)){
            token =  CookieManager.getInstance().getCookie(inv.getRequest(),Constants.COOKIE_KEY_USER);
        }
        long  userid = getUserId(token);
        long shop_id = storageDao.getShop(userid);
        Shop shop = shopDao.getShop(shop_id);
        JSONObject  jb = new JSONObject();
        jb.put("shop", (JSONObject)JSON.toJSON(shop));
        return "@json:" + getDataResult(0,jb);
    }

    protected String getDataResult(int code,JSONObject data) {
        JSONObject result = new JSONObject();
        result.put("code", code);
        result.put("data", data);
        return result.toJSONString();
    }


}
