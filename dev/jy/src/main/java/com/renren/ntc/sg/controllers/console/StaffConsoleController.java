package com.renren.ntc.sg.controllers.console;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.AuthorizeCheck;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.OrderService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.FileUploadUtils;
import com.renren.ntc.sg.util.ImagesUtils;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 
 * Regist
 */

@DenyCommonAccess
@Path("catstaff")
public class StaffConsoleController {

	@Autowired
	private ShopDAO shopDAO;

    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;

    @Autowired
    private OrdersDAO ordersDAO ;

    @Autowired
    private ItemsDAO itemsDAO ;

    @Autowired
    OrderService orderService ;

	@Autowired
	private RegistHostHolder hostHolder;

	@Autowired
	private CategoryDAO categoryDAO;

    private Map keys = new HashMap();


    StaffConsoleController(){
    }

    //注册的时候ajax校验用户名，违禁词和嫌疑词不让注册
	@Post("")
    @Get("")
	public String index(Invocation inv){
        return "@shop";
	}

}
