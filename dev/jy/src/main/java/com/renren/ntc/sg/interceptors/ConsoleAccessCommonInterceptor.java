package com.renren.ntc.sg.interceptors;

import java.lang.annotation.Annotation;

import com.renren.ntc.sg.biz.dao.CatStaffDAO;
import net.paoding.rose.web.ControllerInterceptorAdapter;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Interceptor;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.renren.ntc.sg.annotations.DenyConsoleCommonAccess;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.biz.dao.RegistUserDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
import com.renren.ntc.sg.util.SUtils;

@Interceptor(oncePerRequest = true)
public class ConsoleAccessCommonInterceptor extends ControllerInterceptorAdapter {

    @Autowired
    private RegistHostHolder hostHolder;

    @Autowired
    private RegistUserDAO registUserDAO;
    
    @Autowired
    private ShopDAO shopDAO;

    @Autowired
    private CatStaffDAO catstaffDao;


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
        if(null  != uuid) {
            if(SUtils.isStaffKey(uuid)){
                long catstaff_id = SUtils.unwrapper(SUtils.unwrapperStaffKey(uuid));
                u = catstaffDao.getCatStaffbyId(catstaff_id);
                hostHolder.setUser(u);
                return true;
            }
            u = registUserDAO.getUser(SUtils.unwrapper(uuid));
            hostHolder.setUser(u);
        }else {
			String cookie = inv.getRequest().getParameter("token");
			if(StringUtils.isNotBlank(cookie)){
                if(SUtils.isStaffKey(cookie)){
                    long catstaff_id = SUtils.unwrapper(SUtils.unwrapperStaffKey(cookie));
                    u = catstaffDao.getCatStaffbyId(catstaff_id);
                    hostHolder.setUser(u);
                    return true;
                }
				 u = registUserDAO.getUser(SUtils.unwrapper(cookie));
		         hostHolder.setUser(u);
			}
		}
        return true;
	}
    
    protected Object after(Invocation inv, Object instruction) throws Exception {
        String path = inv.getRequest().getRequestURI() ;
        if(path.startsWith("/console/api")){
    	  inv.getResponse().setHeader("Access-Control-Allow-Origin","*");
        }
        return instruction;
    }

}
