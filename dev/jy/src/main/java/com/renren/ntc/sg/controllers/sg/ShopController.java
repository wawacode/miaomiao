package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Path("shop")
public class ShopController {


    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public ItemsDAO itemsDAO;

    @Autowired
    public ShopCategoryDAO shopCategoryDAO;

    @Get("hot")
    public String hot (Invocation inv,@Param("shop_id") long shop_id ){
        // 校验合法性
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }
        //获取 热门分类
        List<Item> itemls = itemsDAO.hot(SUtils.generTableName(shop_id),shop_id,0,10);
        JSONObject jb =  new JSONObject() ;
        JSONObject shopob =  (JSONObject)JSON.toJSON(shop) ;
        JSONObject data =  new JSONObject() ;
        data.put("shop",shopob);
        data.put("items", itemls);
        jb.put("data",data);
        jb.put("code",0);
        return "@" + jb.toJSONString();
    }



    @Get("shopList")
    public String getlist (Invocation inv,@Param("city") String city ,@Param("district") String district ,
                           @Param("from") int from ,@Param("offset") int offset ){

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 50 ;
        }
        //获取 热门分类
        List<Shop> shops = shopDAO.getAuditedShops(from, offset);
        long now = System.currentTimeMillis();
        SUtils.forV(shops,now) ;
        inv.addModel("shops", shops);

        JSONObject jb =  new JSONObject() ;
        JSONArray jarr =  new JSONArray() ;
        for (Shop s : shops ){
            JSONObject it = (JSONObject) JSONObject.toJSON(s);
            jarr.add(it);
        }

        JSONObject data =  new JSONObject() ;
        data.put("shop",jarr);

        jb.put("data",data);
        jb.put("code",0);
        return "@" + jb.toJSONString() ;
    }



    @Get("")
    public String index (Invocation inv,@Param("shop_id") long shop_id){

        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
             LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
              shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }
//        List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shop.getId());
//        List<ShopCategory4v> shopCategoryls =  new ArrayList< ShopCategory4v >() ;
//        for (ShopCategory category : categoryls)  {
//            ShopCategory4v s  =  new ShopCategory4v();
//            s.setName(category.getName());
//            s.setCategory_id(category.getCategory_id());
//            List<Item> itemls = itemsDAO.getItems(SUtils.generTableName(shop_id),shop_id,category.getCategory_id(),0,10);
//            s.setItemls(itemls);
//            shopCategoryls.add(s);
//        }
//
//        inv.addModel("categoryls",shopCategoryls);
        long now = System.currentTimeMillis();
        SUtils.forV(shop,now);

        JSONObject jb =  new JSONObject() ;
        JSONObject shopJson = (JSONObject) JSONObject.toJSON(shop);
        JSONObject data =  new JSONObject() ;
        data.put("shop",shopJson);

        jb.put("data",data);
        jb.put("code",0);

        return "@" + jb.toJSONString() ;
//        inv.addModel("shop",shop);
//        return "shop" ;
    }

    @Get("category/get")
    @Post("category/get")
    public String category (Invocation inv,@Param("shop_id") long shop_id){

        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
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
        JSONObject jb =  new JSONObject() ;
        JSONObject data =  new JSONObject() ;
        JSONObject shopob =  (JSONObject)JSON.toJSON(shop) ;
        JSONArray  jarr  = (JSONArray)JSON.toJSON(shopCategoryls);

        data.put("shop",shopob);
        data.put("categoryls", jarr) ;
        jb.put("code",0);
        jb.put("data",data);
        return "@" + jb.toJSONString() ;
    }


    @Get("getitems")
    @Post("getitems")
    public String getitems (Invocation inv,@Param("shop_id") long shop_id ,@Param("category_id") int category_id,
                             @Param("from") int from ,@Param("offset") int offset){
        // 校验合法性
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 50 ;
        }

        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }
        List<Item> itemls = itemsDAO.getItems(SUtils.generTableName(shop_id),shop_id, category_id, from, offset);
        inv.addModel("items", itemls);

        JSONObject jb =  new JSONObject() ;
        JSONArray jarr =  new JSONArray() ;
        for (Item i : itemls ){
            JSONObject it =  new JSONObject() ;
            it.put("id" ,i.getId()) ;
            it.put("score" ,i.getScore()) ;
            it.put("price_new" ,i.getPrice_new()) ;
            it.put("price" ,i.getPrice()) ;
            it.put("count" ,i.getCount()) ;
            it.put("pic_url" ,i.getPic_url()) ;
            it.put("category_id" ,i.getCategory_id()) ;
            it.put("name" ,i.getName()) ;
            it.put("shop_id" ,i.getShop_id()) ;
            jarr.add(it);
        }
        JSONObject data =  new JSONObject() ;
        JSONObject shopob =  (JSONObject)JSON.toJSON(shop) ;

        data.put("shop",shopob);
        data.put("items", jarr) ;
        jb.put("code",0);
        jb.put("data",data);
        return "@" + jb.toJSONString() ;
    }


    @Get("create")
    public String query (Invocation inv ,@Param("chn") String chn){

        return "@" ;
    }

}


