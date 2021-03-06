package com.renren.ntc.sg.controllers.console.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.CategoryDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.ShopService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * Regist
 */

@DenyCommonAccess
@Path("cate")
public class CategroyConsoleController extends BasicConsoleController{
    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;

    @Autowired
    private CategoryDAO categoryDAO;

    @Post("up")
    @Get("up")
    public String category(Invocation inv,  @Param("id")String str_id,
                           @Param("value") String value){
        if( null == str_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",str_id));
            return "@" + Constants.PARATERERROR ;
        }
        String[] keys = str_id.split("-");
        if(keys.length != 4){
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",str_id));
            return "@" + Constants.PARATERERROR ;
        }
        if ( null == value ) {
            return "@" + Constants.PARATERERROR ;
        }
        long shop_id =  Long.valueOf(keys[1]);
        String  key = keys[2];
        long item_id =   Long.valueOf(keys[3]);
        shopCategoryDAO.update(item_id,key,value) ;
        return  "@"+Constants.DONE ;
    }

    @Post("del")
    @Get("del")
    public String category(Invocation inv,  @Param("shop_id") long  shop_id,
                           @Param("category_id") int category_id){
        inv.getResponse().setHeader("Access-Control-Allow-Origin", "*");
        if( 0 == shop_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",shop_id));
            return "@" + Constants.PARATERERROR ;
        }
        if ( 0 == category_id ) {
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",category_id));
            return "@" + Constants.PARATERERROR;
        }
        int result = shopCategoryDAO.del(shop_id,category_id) ;
            return  "@"+Constants.DONE  ;
    }

    @Get("add")
    @Post("add")
    public String addcate(Invocation inv,  @Param("shopId") long  shop_id,
                          @Param("categoryId") int category_id,
                          @Param("scorce") int score,
                          @Param("categoryName") String categoryName){
        inv.getResponse().setHeader("Access-Control-Allow-Origin", "*");
        if( 0 == shop_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",shop_id));
            return "@" + Constants.PARATERERROR ;
        }
        if(StringUtils.isBlank(categoryName)){
            LoggerUtils.getInstance().log(String.format("cate_add categoryName is null %d ",shop_id));
            return "@" + Constants.PARATERERROR ;
        }

        if (category_id == 0 ){
           category_id = shopCategoryDAO.max(shop_id) + 1 ;
        }

        ShopCategory shopCate = new ShopCategory();
        shopCate.setCategory_id(category_id);
        shopCate.setShop_id(shop_id);
        shopCate.setScore(score);
        shopCate.setName(categoryName);
        shopCategoryDAO.insert(shopCate);
        return  "@"+Constants.DONE  ;
    }
}
