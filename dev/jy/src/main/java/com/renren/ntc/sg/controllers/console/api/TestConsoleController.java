package com.renren.ntc.sg.controllers.console.api;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopCategory;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.umeng.push.Demo;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.FileUploadUtils;
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
import java.util.List;

@DenyCommonAccess
@Path("test")
public class TestConsoleController extends BasicConsoleController{
	@Autowired
	private ShopDAO shopDAO;

    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;

    @Autowired
    private OrdersDAO ordersDAO ;

    @Autowired
    private ItemsDAO itemsDAO ;


    TestConsoleController(){
    }
    
    @Post("")
    @Get("")
    public String test(Invocation inv, @Param("itemId") long id,@Param("shop_id") long shop_id){
        Demo demo = new Demo("54cb1485fd98c571bd000243", "uopev2ouz3kt9h0foca3nzn9yambvqgc");
        try {
            demo.sendAndroidUnicast();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "@json:"+ Constants.DONE;
    }



}
