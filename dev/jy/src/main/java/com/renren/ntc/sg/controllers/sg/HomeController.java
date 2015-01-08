package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.OrderInfo;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.dao.SWPOrderDAO;
import com.renren.ntc.sg.geo.GeoQueryResult;
import com.renren.ntc.sg.geo.ShopLocation;
import com.renren.ntc.sg.service.GeoService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.List;

@Path("")
public class HomeController {

    private static int DEFAULT_SHOP_ID = 1;

    @Autowired
    public ShopDAO shopDAO;
    @Autowired
    public SWPOrderDAO  orderDAO;

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    public SWPOrderDAO swpOrderDAO ;

    @Autowired
    GeoService geoService  ;


    private  List <Long>  getCartInfo( Invocation inv){
           return Collections.emptyList();
    }

    @Get("loading")
    public String loadingPage (Invocation inv){
        return "loadingPage";
    }

    @Get("f")
    @Post("f")
    public String f (Invocation inv ,@Param("lat") float lat, @Param("lng") float lng){
        long shop_id = Constants.DEFAULT_SHOP_ID;

        if (lat != 0 && lng != 0) {
            ShopLocation  loc =    new ShopLocation();
            loc.setLongitude(lng);
            loc.setLatitude(lat);
            // 20 公里
            List<GeoQueryResult>  resu = geoService.queryNear(loc, 20000);
            if (resu != null &&  resu.size() > 0){
                ShopLocation loc_shop = resu.get(0).getShopLocation();
                LoggerUtils.getInstance().log( String.format("near find  shop_id  %d ,lat %f , lng %f ",loc_shop.getShop_id(),loc_shop.getLatitude(),loc_shop.getLongitude()));
                shop_id  =  loc_shop.getShop_id();
            }else{
                LoggerUtils.getInstance().log( String.format("miss loc ,use default shop_id"));
            }
        }
        return "r:/sg/shop?shop_id=" + shop_id + "&lat=" + lat + "&lng=" + lng  ;
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
        return "@" + jarr.toJSONString();
    }
}
