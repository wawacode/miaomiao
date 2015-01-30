package com.renren.ntc.sg.controllers.console.api;

import java.util.ArrayList;
import java.util.List;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopCategory;
import com.renren.ntc.sg.bean.ShopCategory4v;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;

/**
 * 
 * Regist
 */

@DenyCommonAccess
@LoginRequired
@Path("shop")
public class ShopConsoleController extends BasicConsoleController{

	@Autowired
	private ShopDAO shopDAO;

    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;

    @Autowired
    private ItemsDAO itemsDAO ;

    ShopConsoleController(){
    }

	@Post("")
    @Get("")
	public String index(Invocation inv,@Param("shop_id") long shop_id,
									   @Param("category_id") int category_id ,
									   @Param("from") int from, 
									   @Param("offset") int offset){
		
		Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
        long shopId = shop.getId();
        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 50 ;
        }
        List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shopId);
        JSONObject result = new JSONObject();
        result.put("shop",shop);
        if ( 0 == category_id ){
            if (categoryls.size() > 0){
            category_id =   categoryls.get(0).getCategory_id();
            }else{
                LoggerUtils.getInstance().log(String.format(" category is 0  && no category find on shop %d ",shopId));
                return "@json:"+result.toJSONString();
            }
        }
        List<Item> itemls = itemsDAO.getItemsWithZero(SUtils.generTableName(shopId),shopId,category_id,from,offset);
        if(from != 0){
        	int begin = from;
        	begin = begin - offset;
        	result.put("previous_f", begin< 0?0:begin);
        }
        if(itemls.size() >=  offset){
           result.put("next_f", from  + offset);
        }
        result.put("itemls", itemls);
        result.put("categoryls",categoryls);
        result.put("curr_cate_id",category_id);
        return "@json:"+getDataResult(0, result);
	}
	

	@Get("category/get")
    @Post("category/get")
    public String get (Invocation inv,@Param("shop_id") long shop_id){
		Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
        List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shop.getId());
        List<ShopCategory4v> shopCategoryls =  new ArrayList< ShopCategory4v >() ;
        for (ShopCategory category : categoryls)  {
            ShopCategory4v s  =  new ShopCategory4v();
            s.setName(category.getName());
            s.setCategory_id(category.getCategory_id());
            List<Item> itemls = itemsDAO.getItems(SUtils.generTableName(shop_id),shop_id,category.getCategory_id(),0,10);
            s.setItemls(itemls);
            shopCategoryls.add(s);
        }
        JSONObject data =  new JSONObject() ;
        JSONObject shopob =  (JSONObject)JSON.toJSON(shop) ;
        JSONArray  jarr  = (JSONArray)JSON.toJSON(shopCategoryls);

        data.put("shop",shopob);
        data.put("categoryls", jarr) ;
        return "@json:"+getDataResult(0, data);
    }
}
