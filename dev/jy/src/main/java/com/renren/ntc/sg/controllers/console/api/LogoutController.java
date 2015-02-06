package com.renren.ntc.sg.controllers.console.api;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.DenyConsoleCommonAccess;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.User;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * 
 * yunming.zhu
 */
@DenyCommonAccess
@DenyConsoleCommonAccess
@Path("logout")
public class LogoutController extends BasicConsoleController{

	@Autowired
	private RegistHostHolder hostHolder;

    @Autowired
    private RegistUserDAO userDAO;

    @Autowired
    private ShopDAO shopDAO ;

	@Autowired
	private RegistUserService userService;


	private static final Logger logger = LoggerFactory.getLogger(LogoutController.class);

	@Get ("")
    @Post ("")
	public String loginout(Invocation inv, @Param("phone")String phone) {
        RegistUser user  =  hostHolder.getUser();
        CookieManager.getInstance().clearCookie(inv.getResponse(),Constants.COOKIE_KEY_REGISTUSER,0,"/"
                );
		return "@json:" + Constants.DONE;
	}

}