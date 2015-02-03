package com.renren.ntc.sg.controllers.console.api;

import java.util.ArrayList;
import java.util.List;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopCategory;
import com.renren.ntc.sg.bean.ShopCategory4v;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;

/**
 * 
 * Regist
 */

@DenyCommonAccess
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

    @Get("getitems")
    @Post("getitems")
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
	
	@Get("updateShopInfo")
    @Post("updateShopInfo")
    public String updateShopInfo (Invocation inv,@Param("shop_id") long shop_id,
    											 @Param("name") String name,
    											 @Param("tel") String tel,
    											 @Param("owner_phone") String ownerPhone,
    											 @Param("open_time") String openTime,//08:00 AM
    											 @Param("close_time") String closeTime,//08:00 PM
    											 @Param("shop_address") String shopAddress,
    											 @Param("shopInfo") String shopInfo,//服务范围
    											 @Param("base_price") int basePrice,//起送价
    											 @Param("status") int status){
		Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
        String openShopTime = "";
        String closeShopTime = "";
        if(StringUtils.isNotBlank(openTime)){
        	openTime = Dateutils.getHMDateBycondition(openTime.trim());
        	openShopTime = Dateutils.getDateStrByCondition(openTime);
            if(StringUtils.isBlank(openShopTime)){
            	return "@json:" + getActionResult(1, "开店时间格式不正确,格式如08:00 AM");
            }
        }else {
			openShopTime = Dateutils.tranferDate2Str(shop.getOpen_time());
		}
        if(StringUtils.isNotBlank(closeTime)){
        	closeTime = Dateutils.getHMDateBycondition(closeTime.trim());
        	closeShopTime = Dateutils.getDateStrByCondition(closeTime);
            if(StringUtils.isBlank(closeShopTime)){
            	return "@json:" + getActionResult(1, "关店时间格式不正确,格式如08:00 PM");
            }
        }else {
        	closeShopTime = Dateutils.tranferDate2Str(shop.getClose_time());
		}
        if(status !=0){
        	status = 1;
        }
        int result = shopDAO.updateShopDetail(shop_id, name, tel, openShopTime, closeShopTime, shopAddress, shopInfo,status,basePrice);
        if(result == 1){
        	shop = shopDAO.getShop(shop_id);
        	JSONObject resultJson = new JSONObject();
        	resultJson.put("shop", shop);
        	return "@json:" + getDataResult(0, resultJson);
        }else {
        	return "@json:"+getActionResult(1, "修改店铺失败");
		}
    }
}
