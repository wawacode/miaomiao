package com.renren.ntc.sg.interceptors;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.ControllerInterceptorAdapter;
import net.paoding.rose.web.Invocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;

/**
*
* 标注:{@link LoginRequiredInterceptor}
*
* @author [yunming.zhu@opi-corp.com]
*
* @date Mar 25, 2011 02:40:40 AM
*
*/

public class LoginRequiredInterceptor extends ControllerInterceptorAdapter {

	@Autowired
	private RegistHostHolder hostHolder;

    private static final Logger logger = LoggerFactory.getLogger(LoginRequiredInterceptor.class);


	private static enum displayMode  {
		page, popup, mobile, touch, iframe, hidden
	};

	public LoginRequiredInterceptor(){
		setPriority(1100);
	}

	@Override
	public Class<? extends Annotation> getRequiredAnnotationClass() {
		return LoginRequired.class;
	}

	@Override
	public List<Class<? extends Annotation>> getRequiredAnnotationClasses() {
	        Class clazz = LoginRequired.class;
	        List<Class<? extends Annotation>> list = new ArrayList<Class<? extends Annotation>>(2);
	        list.add(clazz);
	        return list;
	}

	@Override
	public Object before(Invocation inv) throws Exception {

        RegistUser user = hostHolder.getUser();
        if (user == null) {
            String origURL = SUtils.getResourceFullLocation(inv.getRequest());
            LoggerUtils.getInstance().log("the origURL is " + origURL);
            String path = inv.getRequest().getRequestURI() ;
            if(path.startsWith("/console/api")){
            	JSONObject result = new JSONObject();
            	result.put("code", -1);
            	result.put("msg", "");
            	result.put("origURL", "/console/login?rf=r&domain="
                        + Constants.DOMAIN_URL + "&origURL="
                        + origURL);
                return true;
            }else {
            	 return "r:" + "/console/login?rf=r&domain="
                         + Constants.DOMAIN_URL + "&origURL="
                         + origURL;
			}
        }
        return true;
	}




}
