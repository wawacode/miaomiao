package com.renren.ntc.sg.controllers.console.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.DenyConsoleCommonAccess;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.RegistUserDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.RegistUserService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * yunming.zhu
 */
@DenyCommonAccess
@DenyConsoleCommonAccess
@Path("login")
public class LoginController extends BasicConsoleController {

    @Autowired
    private RegistHostHolder hostHolder;

    @Autowired
    private RegistUserDAO userDAO;

    @Autowired
    private ShopDAO shopDAO;

    @Autowired
    private RegistUserService userService;


    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Get("")
    @Post("")
    public String newLogin(Invocation inv, @Param("origURL") String origURL) {
        inv.getResponse().setHeader("Access-Control-Allow-Origin", "*");
        JSONObject result = new JSONObject();
        result.put("code", -1);
        result.put("msg", "用户不存在");
        result.put("origURL", origURL);
//        RegistUser user = hostHolder.getUser();
//		if (user != null) {
//			 return "@json:" + result.toJSONString();
//		}
        if (origURL == null || origURL.equals("")) {
            origURL = Constants.DOMAIN;
        }
        try {
            origURL = URLEncoder.encode(origURL, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        result.put("code", 0);
        result.put("msg", "");
        result.put("origURL", "/console/login");
        return "@json:" + result.toJSONString();
    }


    @Get("valid")
    @Post("valid")
    public String Login(Invocation inv, @Param("phone") String phone, @Param("pwd") String pwd, @Param("origURL") String origURL) {
        inv.getResponse().setHeader("Access-Control-Allow-Origin", "*");
        JSONObject result = new JSONObject();
        result.put("code", -1);
        result.put("msg", "用户不存在");
        result.put("origURL", origURL);
//    	RegistUser user = hostHolder.getUser();
//        if (user != null) {
//            return "@json:" + result.toJSONString();
//        }
        if (origURL == null || origURL.equals("")) {
            origURL = Constants.DOMAIN;
        }
        try {
            origURL = URLEncoder.encode(origURL, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            result.put("code", 500);
            result.put("msg", "url解析错误");
            result.put("origURL", "/");
            return "@json:" + result.toJSONString();
        }
        result.put("origURL", origURL);
        RegistUser u = userDAO.getUser(phone, pwd);
        if (null == u) {
            result.put("code", -2);
            result.put("msg", "用户名字或密码不正确");
            return "@json:" + result.toJSONString();
        }
        Shop shop = shopDAO.getShopbyOwner_id(u.getId());
        if (null == shop) {
            result.put("code", -3);
            result.put("msg", "没有店铺");
            return "@json:" + result.toJSONString();
        }
        CookieManager.getInstance().saveCookie(inv.getResponse(), Constants.COOKIE_KEY_REGISTUSER, SUtils.wrapper(u.getId()));
        JSONObject resultJson = new JSONObject();
        JSONArray shops = new JSONArray();
        JSONObject s = (JSONObject) JSON.toJSON(shop);
        shops.add(s);
        resultJson.put("shop", shops);
        resultJson.put("token", SUtils.wrapper(u.getId()));
        return "@json:" + getDataResult(0, resultJson);
    }

    @Get("change_pwd")
    @Post("change_pwd")
    public String change_pwd(Invocation inv, @Param("phone") String phone, @Param("old_pwd") String old_pwd,
                             @Param("new_pwd") String new_pwd) {

        JSONObject result = new JSONObject();
        if (StringUtils.isBlank(phone) || StringUtils.isBlank(old_pwd) || StringUtils.isBlank(new_pwd)) {
            result.put("code", -2);
            result.put("msg", "新密码长度不够");
            return "@json:" + result.toJSONString();
        }

        RegistUser user = hostHolder.getUser();
        RegistUser u = userDAO.getUser(phone, old_pwd);

        if (null == u) {
            result.put("code", -2);
            result.put("msg", "用户名字或密码不正确");
            return "@json:" + result.toJSONString();
        }
        if (StringUtils.isBlank(new_pwd) || new_pwd.length() < 6) {
            result.put("code", -2);
            result.put("msg", "新密码长度不够");
            return "@json:" + result.toJSONString();
        }
        int r = userDAO.updatePwd(phone, new_pwd);
        return "@json:" + Constants.DONE;
    }
}