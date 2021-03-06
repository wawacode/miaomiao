package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.OrderInfo;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopArea;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.ShopAreaDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.dao.SWPOrderDAO;
import com.renren.ntc.sg.geo.GeoQueryResult;
import com.renren.ntc.sg.geo.ShopLocation;
import com.renren.ntc.sg.service.GeoService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Path("")
public class HomeController {

    private static int DEFAULT_SHOP_ID = 1;

    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public ShopAreaDAO shopAreaDAO;

    @Autowired
    public SWPOrderDAO  orderDAO;

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    GeoService geoService  ;


    private  List <Long>  getCartInfo( Invocation inv){
           return Collections.emptyList();
    }

    @Get("loading")
    public String loadingPage (Invocation inv){

        String code =  inv.getParameter("code");
        String state =  inv.getParameter("state");
        LoggerUtils.getInstance().log(String.format("code %s, state %s",code ,state ));

        return "loadingPage";
    }
    @Get("loading2")
    public String loadingPage2 (Invocation inv){

        String code =  inv.getParameter("code");
        String state =  inv.getParameter("state");
        LoggerUtils.getInstance().log(String.format("code %s, state %s",code ,state ));

        return "loadingPage";
    }
    @Get("loading3")
    public String loadingPag3 (Invocation inv){

        String code =  inv.getParameter("code");
        String state =  inv.getParameter("state");
        LoggerUtils.getInstance().log(String.format("code %s, state %s",code ,state ));

        return "loadingPage";
    }

    @Get("f")
    @Post("f")
    public String f (Invocation inv ,@Param("lat") float lat, @Param("lng") float lng){
        long shop_id = Constants.DEFAULT_SHOP_ID;

        if (lat == 0 || lng == 0 ){
            JSONObject response =  new JSONObject();
            JSONObject data =  new JSONObject();
            response.put("data", data);
            response.put("code", 0);
            return "@" + response.toJSONString();
//            return "r:/sg/loading#/findshop";
        }
        Shop shop = null;
        if (lat != 0 && lng != 0) {
            ShopLocation  loc =    new ShopLocation();
            loc.setLongitude(lng);
            loc.setLatitude(lat);
            // 20 公里

            List<GeoQueryResult>  resuls = geoService.queryNear(loc, 20000);
            if (resuls != null &&  resuls.size() > 0){
                shop_id = resuls.get(0).getShopLocation().getShop_id();
                for (GeoQueryResult  res : resuls){
                    long now = System.currentTimeMillis();
                    ShopLocation shopLoc =  res.getShopLocation();
                    LoggerUtils.getInstance().log( String.format("near find  shop_id  %d ,lat %f , lng %f ",shopLoc.getShop_id(),shopLoc.getLatitude(),shopLoc.getLongitude()));
                    shop_id  = shopLoc.getShop_id();
                    shop = shopDAO.getShop(shop_id);
                    if(SUtils.online(now, shop)){
                         shop_id = shop.getId();
                         break;
                    }
                }
            }else{
                LoggerUtils.getInstance().log( String.format("can't find near shop .return []"));

                JSONObject response =  new JSONObject();
                JSONObject data =  new JSONObject();
                response.put("data", data);
                response.put("code", 0);
                return "@" + response.toJSONString();
            }
        }

        JSONObject response =  new JSONObject();
        JSONObject data =  new JSONObject();
        if(null != shop) {
           data.put("shop",shop);
        }
        response.put("data", data);
        response.put("code", 0);
        return "@json:" + response.toJSONString();
    }

    @Get("near")
    @Post("near")
    public String near (Invocation inv ,@Param("lat") float lat, @Param("lng") float lng){

        JSONArray shops = new JSONArray();
        Shop shop = null;
        if (lat != 0 && lng != 0) {
            ShopLocation  loc =    new ShopLocation();
            loc.setLongitude(lng);
            loc.setLatitude(lat);
            // 20 公里
            List<GeoQueryResult>  resuls = geoService.queryNear(loc, 2000);
            if (resuls != null &&  resuls.size() > 0){
            	long now = System.currentTimeMillis();
                for (GeoQueryResult  res : resuls){
                    ShopLocation shopLoc =  res.getShopLocation();
                    LoggerUtils.getInstance().log( String.format("near find  shop_id  %d ,lat %f , lng %f ",shopLoc.getShop_id(),shopLoc.getLatitude(),shopLoc.getLongitude()));
                    long shop_id  = shopLoc.getShop_id();
//                    if (!isshopArea(shop_id,lat,lng)) {
//                        LoggerUtils.getInstance().log(String.format("shop %d , can't service %f ,%f",shop_id,lat,lng));
//                        continue;
//                    }
                    shop = shopDAO.getShop(shop_id);
                    if (null == shop){
                        continue;
                    }
                    if(shop.getAudit() == 0){
                        continue;
                    }
                    SUtils.forV(shop,now);
                    shops.add(JSON.toJSON(shop));
                }
            }else{
                LoggerUtils.getInstance().log( String.format("miss loc ,use default shop_id"));
            }


        }

        JSONObject response =  new JSONObject();
        JSONObject data =  new JSONObject();
        data.put("shops",shops) ;
        response.put("data", data);
        response.put("code", 0);
        return "@json:" + response.toJSONString();
    }

    private boolean isshopArea(long shop_id, float lat, float lng) {

        List <ShopArea>  shopAreas = shopAreaDAO.getShopArea(shop_id) ;
        if (shopAreas == null || shopAreas.size() ==0 ){
            return true;
        }
        for(ShopArea shoparea : shopAreas) {
            if(lat< shoparea.getMax_lat() &&
               lat>shoparea.getMin_lat()
                    && lng < shoparea.getMax_lng() &&
                    lng > shoparea.getMin_lng()){
                LoggerUtils.getInstance().log(String.format("find match area %s ,for %f ,%f",shoparea.getArea_name(),lat,lng));
                return true;
            }
        }
        LoggerUtils.getInstance().log(String.format("miss match area,for %f ,%f",lat,lng));
        return false;
    }

    @Post("feedback")
    @Get("feedback")
    public String feedback (Invocation inv ,@Param("feedback") String feedback,@Param("contact") String contact){
        System.out.println(String.format("Rec User feedback %s , %s ",feedback,contact));
        return "@done";
    }
    @Post("redirect")
    @Get("redirect")
    public String redirect (Invocation inv ){
        return "redirect";
    }

    @Get("query")
    public String query (Invocation inv ,@Param("chn") String chn){
        JSONArray jarr =  new JSONArray();
        if ("print".equals(chn)){
        List<Device>  ls = deviceDAO.getDevs();
        for (Device d :ls ){
            JSONObject jb =   new JSONObject();
            jb.put(d.getId()+ "" ,d.getStatus() + "_" + d.getUpdate_time());
            jarr.add(jb);
           }
        }

        if ("order".equals(chn)){
            List<OrderInfo>  ls = orderDAO.get10Orders();
            for (OrderInfo o :ls ){
                JSONObject jb =   new JSONObject();
                jb.put( o.getOrder_id() ,o.getStatus() + o.getInfo());
                jarr.add(jb);
             }
        }
        return "@json:"+ jarr.toJSONString();
    }

    @Get("about")
       @Post("about")
       public String about( Invocation inv) {
        String  wx_id = inv.getParameter("wx_id");
        String code =  inv.getParameter("code");
        String state =  inv.getParameter("state");
        LoggerUtils.getInstance().log(String.format("wx_id %s code %s, state %s",wx_id,code ,state ));
        return "about";
    }


    @Get("log")
    @Post("log")
    public String log( Invocation inv,@Param("msg") String msg) {
        LoggerUtils.getInstance().log(String.format("client send msg %s",msg ));
        return "about";
    }


}
