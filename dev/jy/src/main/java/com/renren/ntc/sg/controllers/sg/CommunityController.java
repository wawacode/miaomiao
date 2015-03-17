package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.geo.GeoQueryResult;
import com.renren.ntc.sg.geo.ShopLocation;
import com.renren.ntc.sg.service.GeoCommunityService;
import com.renren.ntc.sg.service.GeoService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;


@Path("commy")
public class CommunityController {


    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public ItemsDAO itemsDAO;

    public   static final String SURL = "http://10.170.239.52:9988/suggestion/query?q={q}";

    @Autowired
    public GeoCommunityService geoCommunityService  ;

    @Autowired
    public CommunityDAO communityDao;
    @Autowired
    public Shop_CommunityDAO shop_communityDao;
    @Autowired
    public ShopCategoryDAO shopCategoryDAO;


    @Get("getshop")
    @Post("getshop")
    public String getlist (Invocation inv,@Param("c_id") long c_id ){
        JSONObject jb =  new JSONObject() ;
        JSONArray jarr =  new JSONArray() ;
        JSONObject data =  new JSONObject() ;

        if ( 0 >= c_id){
            data.put("shop",jarr);
            jb.put("data",data);
            jb.put("code",0);
            return "@json:" + jb.toJSONString() ;
        }
        List<Long>  shopids = shop_communityDao.get(c_id) ;
        List<Shop> shops = shopDAO.getAuditedShops(shopids);
        long now = System.currentTimeMillis();

        SUtils.forV(shops,now) ;
        inv.addModel("shops", shops);

        for (Shop s : shops ){
            if(s.getAudit() == 0){
                continue;
            }
            JSONObject it = (JSONObject) JSONObject.toJSON(s);
            jarr.add(it);
        }
        data.put("shop",jarr);
        jb.put("data",data);
        jb.put("code",0);
        return "@json:" + jb.toJSONString() ;
    }

    @Get("sg")
    @Post("sg")
    public String query (Invocation inv ,@Param("q") String q ){
        long now = System.currentTimeMillis();
        JSONArray communitys = new JSONArray();
        String url = SURL.replace("{q}",q);
        String respone = SHttpClient.get(url,"");
        if (null == respone){
            JSONObject response =  new JSONObject();
            JSONObject data =  new JSONObject();
            data.put("communitys",communitys) ;
            response.put("data", data);
            response.put("code", 0);
            return "@" + response.toJSONString();
        }
        JSONObject jb = (JSONObject)JSON.parse(respone) ;
        JSONArray arr = jb.getJSONArray("data");

        for( int i =0 ;i< arr.size();i++ ){
            JSONObject  o = arr.getJSONObject(i);
            long cid =  o.getLong("id");
            List<Long> shop_ids  = shop_communityDao.get(cid);
            List <Shop> shops= shopDAO.getAuditedShops(shop_ids);
            SUtils.forV(shops,now);
            o.put("shops",JSON.toJSON(shops));
        }
        JSONObject response =  new JSONObject();
        JSONObject data =  new JSONObject();
        data.put("communitys",arr) ;
        response.put("data", data);
        response.put("code", 0);
        return "@" + response.toJSONString();
    }



    @Get("near")
    @Post("near")
    public String query (Invocation inv ,@Param("lat") float lat, @Param("lng") float lng){

        JSONArray communitys = new JSONArray();
        Community community = null;
        if (lat != 0 && lng != 0) {
            ShopLocation loc =    new ShopLocation();
            loc.setLongitude(lng);
            loc.setLatitude(lat);
            // 20 公里
            List<GeoQueryResult>  resuls = geoCommunityService.queryNear(loc, 2000,20);
            if (resuls != null &&  resuls.size() > 0){
                long now = System.currentTimeMillis();
                for (GeoQueryResult  res : resuls){
                    ShopLocation shopLoc =  res.getShopLocation();
                    LoggerUtils.getInstance().log( String.format("near find  shop_id  %d ,lat %f , lng %f ",shopLoc.getShop_id(),shopLoc.getLatitude(),shopLoc.getLongitude()));
                    //这里 其实是小区ID；
                    long cid  = shopLoc.getShop_id();
                    community = communityDao.get(cid);
                    if (null == community){
                        continue;
                    }
                    communitys.add(JSON.toJSON(community));
                }
            }else{
                LoggerUtils.getInstance().log( String.format("miss loc ,use default shop_id"));
            }
        }
        JSONObject response =  new JSONObject();
        JSONObject data =  new JSONObject();
        data.put("communitys",communitys) ;
        response.put("data", data);
        response.put("code", 0);
        return "@" + response.toJSONString();
    }

}


