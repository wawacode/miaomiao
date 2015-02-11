package com.renren.ntc.sg.controllers.console;

import java.util.List;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.apache.velocity.tools.generic.DateTool;
import org.springframework.beans.factory.annotation.Autowired;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.CategoryDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;

/**
 * 
 * Regist
 */

@DenyCommonAccess
@LoginRequired
@Path("allshop")
public class AllShopConsoleController {

    @Autowired
    private ItemsDAO itemsDAO ;

	@Autowired
	private ProductDAO productDAO;

    @Autowired
    private ShopDAO shopDAO ;

    @Autowired
    private CategoryDAO categoryDAO;


	@Autowired
	private RegistHostHolder hostHolder;


    @Post("")
    @Get("")
    public String index(Invocation inv ,
                        @Param("from") int from, @Param("offset") int offset){

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 10 ;
        }

        List<Shop> shopls  =  shopDAO.getAllShops(from,offset);
        
        if(from != 0){
        	int begin = from;
        	begin = begin - offset;
           inv.addModel("previous_f", begin< 0?0:begin);
        }
        if(shopls.size() >=  offset){
           inv.addModel("next_f", from  + offset);
        }
        inv.addModel("shopls", shopls);
        inv.addModel("date", new DateTool()); 
        return "allshop";
    }



    @Post("del")
    @Get("del")
    public String del(Invocation inv, @Param("id") long id){

        return "items";
    }


    @Post("add")
    public String add(Invocation inv,@Param("item") String item){

        return  "@" ;
    }

    @Post("edit")
    public String edit(Invocation inv,@Param("id") String str_id,
            @Param("value") String value){
    	if( null == str_id){
            LoggerUtils.getInstance().log(String.format("all shop edit str_id is null %s ",str_id));
            return "@error" ;
        }
        String[] keys = str_id.split("-");
        if(keys.length != 3){
            LoggerUtils.getInstance().log(String.format("all shop edit length is not 3 str_id is null %s ",str_id));
            return "@error" ;
        }
        if ( null == value ) {
            return "@error" ;
        }
        long shop_id =  Long.valueOf(keys[1]);
        String  key = keys[2];
        if(StringUtils.isNotBlank(value)){
        	value = value.trim();
        }
        if("open_time".equals(key)){
        	value = Dateutils.getDateStrByCondition(value);
        }
        if("close_time".equals(key)){
        	value = Dateutils.getDateStrByCondition(value);
        }
        if("open_time".equals(key) || "close_time".equals(key)){
        	if(StringUtils.isBlank(value)){
        		value = null;
        	}
        }

        shopDAO.update(shop_id, key, value);
        return  "@"+Constants.DONE ;
    }

}
