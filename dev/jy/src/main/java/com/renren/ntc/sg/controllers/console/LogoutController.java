package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import org.springframework.beans.factory.annotation.Autowired;


@DenyCommonAccess
@LoginRequired
@Path("logout")
public class LogoutController {
	@Autowired
	private RegistHostHolder ntcHostHolder;
	@Get("")
	public String exit(Invocation inv){
		ntcHostHolder.setUser(null);
        CookieManager.getInstance().clearCookie(inv.getResponse(), Constants.COOKIE_KEY_REGISTUSER,1000,"");
		return "r:/";
	}
}
