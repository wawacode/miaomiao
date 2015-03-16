package com.renren.ntc.sg.controllers.console;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.RegistUserService;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 
 * Regist
 */

@DenyCommonAccess
@Path("regist")
public class RegisterController  {

	@Autowired
	private RegistUserService userService;

	@Autowired
	private RegistHostHolder hostHolder;


	//注册的时候ajax校验用户名，违禁词和嫌疑词不让注册
	@Post("")
    @Get("")
	public String index(Invocation inv, @Param("origURL") String origUrl){

        RegistUser user = hostHolder.getUser();
        if (user != null) {
            inv.addModel("msg","你已经登录了");
            return "r:" + origUrl;
        }
         return "regist";
	}

    @Post("regist")
    public String regist(Invocation inv,@Param("phone") String phone,@Param("name") String name,@Param("origURL") String origURL , @Param("pwd") String pwd){
        //校验
        if (StringUtils.isBlank(phone) ||StringUtils.isBlank(name) || StringUtils.isBlank(pwd) ){
            inv.addModel("msg","用户名 ，手机， pwd 无法满足条件 ");
            return "regist";
        }
        RegistUser u = userService.getUserByPhone(phone);
        if(null ==u ){
            inv.addModel("msg","手机 重复 ");
            return "regist";
        }

        u = userService.getUserByName(name);
        if(null ==u ){
            inv.addModel("msg","用户名 重复 ");
            return "regist";
        }

        try {
            origURL = URLEncoder.encode(origURL, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "r:/";
        }
        RegistUser user = userService.createUser(name,0,pwd,1);
        if(null == user){
            inv.addModel("msg","发生了一些错误 请稍后重试 ");
            return "regist";
        }
        inv.addModel("msg","手机 重复 .");
        return "regist_ok";
    }


}
