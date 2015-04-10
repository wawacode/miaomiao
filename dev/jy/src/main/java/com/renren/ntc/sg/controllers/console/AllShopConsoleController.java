package com.renren.ntc.sg.controllers.console;

import java.util.List;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.velocity.tools.generic.DateTool;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.CategoryDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.OrderService;
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

	@Autowired
    private OrdersDAO ordersDAO ;

    @Autowired
    OrderService orderService ;

    @Post("")
    @Get("")
    public String index(Invocation inv ,
                        @Param("from") int from, @Param("offset") int offset){

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 100; //2015-04-09 update 100 by ZhaoXiuFei
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
    
    @Post("orders")
    @Get("orders")
    public String allShopOrders(Invocation inv,@Param("operation") String operation, @Param("shop_id") long shop_id,@Param("from") int from, @Param("offset") int offset){
    	if(shop_id == 0L){
    		shop_id = Constants.DEFAULT_SHOP;
    	}
    	if (StringUtils.isBlank(operation)){
        	operation = "order";//默认查询已完成订单
        }
    	//查询全部审核的店的id
    	List<Shop> shopList = shopDAO.getAllShopsByAudit(Constants.SHOP_ANDITED);
        if(CollectionUtils.isEmpty(shopList)){
        	return "";
        }
        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 20 ;
        }
        List<Order> orderls = null;
        if ("unfinishedOrder".equals(operation.trim())) {//未完成订单
        	orderls = ordersDAO.getUnfinishedOrders(SUtils.generOrderTableName(shop_id), shop_id, from, offset);
        	inv.addModel("operation","unfinishedOrder");
		}else if ("order".equals(operation.trim())){//已完成订单
			orderls = ordersDAO.get10Orders(shop_id,from,offset,SUtils.generOrderTableName(shop_id));
			inv.addModel("operation","order");
		}else{
			 LoggerUtils.getInstance().log("operation can't be empty!");
			 return "@error";
		}
       // List<Order> orderls = ordersDAO.get10Orders(shop_id,from,offset,SUtils.generOrderTableName(shop_id));
        orderls = orderService.forV(orderls);
        orderService.f(orderls);
        if(from != 0){
        	int begin = from;
        	begin = begin - offset;
           inv.addModel("previous_f", begin< 0?0:begin);
        }
        if(orderls.size() >=  offset){
           inv.addModel("next_f", from  + offset);
        }
        Shop shop = shopDAO.getShop(shop_id);
        inv.addModel("shop",shop);
        inv.addModel("orderls",orderls);
        inv.addModel("shops",shopList);
        inv.addModel("curr_shop_d",shop_id);
        return "all_shop_orders";
    }

}
