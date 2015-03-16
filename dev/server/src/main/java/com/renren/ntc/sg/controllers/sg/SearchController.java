package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopCategory;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.dao.SWPOrderDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("search")
public class SearchController {

    private static int DEFAULT_SHOP_ID = 1;

    @Autowired
    public ShopDAO shopDAO;
    @Autowired
    public SWPOrderDAO  orderDAO;

    @Autowired
    public ItemsDAO itemsDAO;


    @Get("qvm")
    public String query (Invocation inv,@Param("shop_id") long shop_id, @Param("key")  String  key){
        // 校验合法性
        JSONObject o = new JSONObject();
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }
        key = SUtils.wrap(key);
        List<Item>  itemls =  itemsDAO.search(SUtils.generTableName(shop_id),shop_id,key);

        inv.addModel("shop",shop);
        inv.addModel("itemls",itemls);
//        JSONArray jarr = form(itemls) ;
//        o.put("data",jarr);
        return "search";
    }

    @Get("query")
    public String query2 (Invocation inv,@Param("shop_id") long shop_id, @Param("key")  String  key){
        // 校验合法性
        JSONObject o = new JSONObject();
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }
        key = SUtils.wrap(key);
        List<Item>  itemls =  itemsDAO.search(SUtils.generTableName(shop_id),shop_id,key);

        inv.addModel("shop",shop);
        inv.addModel("itemls",itemls);
        JSONArray jarr = form(itemls) ;
        o.put("data",jarr);
        return "@" + o.toJSONString();
    }

    private JSONArray form(List<Item> itemls) {
        JSONArray jarr = new  JSONArray();
        for (Item it : itemls) {
            JSONObject job = new JSONObject();
            job.put( "id",it.getId()) ;
            job.put( "name",it.getName()) ;
            job.put( "price",it.getPrice()) ;
            job.put( "category_id",it.getCategory_id()) ;
            job.put( "pic_url",it.getPic_url()) ;
            job.put( "count",it.getCount());
            job.put( "price_new",it.getPrice_new());
            job.put( "shop_id",it.getShop_id());
            job.put( "score",it.getScore());
            jarr.add(job);
        }
        return jarr;
    }


}


