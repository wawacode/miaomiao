package com.renren.ntc.sg.interceptors;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.DenyConsoleCommonAccess;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.biz.dao.RegistUserDAO;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.ControllerInterceptorAdapter;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Interceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.annotation.Annotation;

@Interceptor(oncePerRequest = true)
public class ConsoleAccessCommonInterceptor extends ControllerInterceptorAdapter {

    @Autowired
    private RegistHostHolder hostHolder;

    @Autowired
    private RegistUserDAO registUserDAO;


    private static final Logger logger = LoggerFactory.getLogger(ConsoleAccessCommonInterceptor.class);

    public ConsoleAccessCommonInterceptor(){
    	setPriority(10000);
    }

    protected Class<? extends Annotation> getDenyAnnotationClass() {
        return DenyConsoleCommonAccess.class;
    }

    @Override
    protected Object before(Invocation inv) throws Exception {
    	String path = inv.getRequest().getRequestURI() ;
        if(!path.startsWith("/console")){
            return true;
        }
        RegistUser u = null    ;
        String uuid  = CookieManager.getInstance().getCookie(inv.getRequest(), Constants.COOKIE_KEY_REGISTUSER);
        LoggerUtils.getInstance().log("Console accesss " + "abc");
        if(null  != uuid) {
            u = registUserDAO.getUser(SUtils.unwrapper(uuid));
            hostHolder.setUser(u);
        }
        return true;
	}
    
    protected Object after(Invocation inv, Object instruction) throws Exception {

        return instruction;
    }

}
