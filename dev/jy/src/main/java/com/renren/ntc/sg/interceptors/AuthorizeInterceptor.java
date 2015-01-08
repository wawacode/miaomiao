package com.renren.ntc.sg.interceptors;

import com.renren.ntc.sg.annotations.AuthorizeCheck;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.ShopDAO;
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
* 标注:{@link com.renren.ntc.sg.interceptors.AuthorizeInterceptor}
*
* @author [yunming.zhu@opi-corp.com]
*
* @date Mar 25, 2011 02:40:40 AM
*
*/

public class AuthorizeInterceptor extends ControllerInterceptorAdapter {

	@Autowired
	private RegistHostHolder hostHolder;


    @Autowired
    private ShopDAO shopDAO;



    private static final Logger logger = LoggerFactory.getLogger(AuthorizeInterceptor.class);



	public AuthorizeInterceptor(){
		setPriority(1000);
	}

	@Override
	public Class<? extends Annotation> getRequiredAnnotationClass() {
		return AuthorizeCheck.class;
	}


	@Override
	public Object before(Invocation inv) throws Exception {
        RegistUser user = hostHolder.getUser();
        if (user == null) {
            String origURL = SUtils.getResourceFullLocation(inv.getRequest());
            LoggerUtils.getInstance().log("the origURL is " + origURL);

            return "r:" + "/console/login?rf=s&domain="
                    + Constants.DOMAIN_URL + "&origURL="
                    + origURL;
        }
        String  shop_id = inv.getRequest().getParameter("shop_id");
        long shopId = 0 ;
        try {
            shopId = Long.valueOf(shop_id) ;
        }catch (Exception e ){
              e.printStackTrace();
        }
        LoggerUtils.getInstance().log("shop  id  "  + shopId);
        Shop shop = shopDAO.getShop(shopId) ;
        if (null == shop){
            inv.addModel("msg", "未知错误，请重试");
            return  "error";
        }
        LoggerUtils.getInstance().log("shop owner id  "  +  shop.getOwner_user_id() + "user id  " +  user.getId());
        if (shop.getOwner_user_id() != user.getId()){

          inv.addModel("msg", "没有权限");
          return "error";
        }
        return true;
	}




}
