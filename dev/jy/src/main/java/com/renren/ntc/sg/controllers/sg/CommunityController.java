package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.geo.GeoQueryResult;
import com.renren.ntc.sg.geo.ShopLocation;
import com.renren.ntc.sg.service.GeoCommunityService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
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


@Path("commy")
public class CommunityController {


    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public ItemsDAO itemsDAO;

    public static final String SURL = "http://10.170.239.52:9988/suggestion/query?q={q}&count=50";

    @Autowired
    public GeoCommunityService geoCommunityService;

    @Autowired
    public CommunityDAO communityDao;
    @Autowired
    public Shop_CommunityDAO shop_communityDao;
    @Autowired
    public ShopCategoryDAO shopCategoryDAO;


    @Get("getshop")
    @Post("getshop")
    public String getlist(Invocation inv, @Param("c_id") long c_id) {
        JSONObject jb = new JSONObject();
        JSONArray jarr = new JSONArray();
        JSONObject data = new JSONObject();

        if (0 >= c_id) {
            data.put("shop", jarr);
            jb.put("data", data);
            jb.put("code", 0);
            return "@json:" + jb.toJSONString();
        }
        List<Long> shopids = shop_communityDao.get(c_id);
        List<Shop> shops = shopDAO.getAuditedShops(shopids);
        long now = System.currentTimeMillis();

        SUtils.forV(shops, now);
        inv.addModel("shops", shops);

        for (Shop s : shops) {
            if (s.getAudit() == 0) {
                continue;
            }
            JSONObject it = (JSONObject) JSONObject.toJSON(s);
            jarr.add(it);
        }
        data.put("shop", jarr);
        jb.put("data", data);
        jb.put("code", 0);
        return "@json:" + jb.toJSONString();
    }

    @Get("query")
    @Post("query")
    public String query(Invocation inv, @Param("q") String q) {
        long now = System.currentTimeMillis();
        JSONArray communitys = new JSONArray();
        String url = SURL.replace("{q}", q);
        String respone = SHttpClient.get(url, "");
        if (null == respone) {
            JSONObject response = new JSONObject();
            JSONObject data = new JSONObject();
            data.put("communitys", communitys);
            response.put("data", data);
            response.put("code", 0);
            return "@" + response.toJSONString();
        }
        JSONObject jb = (JSONObject) JSON.parse(respone);
        JSONArray arr = jb.getJSONArray("data");
        JSONArray cmm = new JSONArray();
        for (int i = 0; i < arr.size(); i++) {
            JSONObject o = arr.getJSONObject(i);
            long cid = o.getLong("id");
            List<Long> shop_ids = shop_communityDao.get(cid);
            if( shop_ids == null || shop_ids.size() == 0 ) {
                 continue;
            }
            List<Shop> shops = shopDAO.getAuditedShops(shop_ids);

            if( shops == null || shops.size() == 0 ) {
                continue;
            }
            SUtils.forV(shops, now);
            o.put("shops", JSON.toJSON(shops));
            cmm.add(o);
        }
        JSONObject response = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("communitys", cmm);
        response.put("data", data);
        response.put("code", 0);
        return "@" + response.toJSONString();
    }


    @Get("near")
    @Post("near")
    public String query(Invocation inv, @Param("lat") float lat, @Param("lng") float lng) {
        long now = System.currentTimeMillis();
        JSONArray communitys = new JSONArray();
        if (lat != 0 && lng != 0) {
            ShopLocation loc = new ShopLocation();
            loc.setLongitude(lng);
            loc.setLatitude(lat);
            // 20 公里
            List<GeoQueryResult> resuls = geoCommunityService.queryNear(loc, 2000, 20);
            if (resuls != null && resuls.size() > 0) {
                for (GeoQueryResult res : resuls) {
                    ShopLocation shopLoc = res.getShopLocation();
                    JSONObject com = new JSONObject();
                    LoggerUtils.getInstance().log(String.format("near find  shop_id  %d ,lat %f , lng %f ", shopLoc.getShop_id(), shopLoc.getLatitude(), shopLoc.getLongitude()));
                    //这里 其实是小区ID；
                    Community community = communityDao.get(shopLoc.getShop_id());
                    if (null == community) {
                        continue;
                    }
                    long cid = shopLoc.getShop_id();
                    List<Long> shopids = shop_communityDao.get(cid);
                    if (shopids != null && shopids.size() != 0) {
                        List<Shop> shops = shopDAO.getAuditedShops(shopids);
                        SUtils.forV(shops, now);
                        community.setShops(shops);
                    }
                    try {
                        double distinct = distinct(lat, lng, community.getLat(), community.getLng());
                        community.setDistinct(distinct);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    communitys.add(JSON.toJSON(community));
                }
            } else {
                LoggerUtils.getInstance().log(String.format("miss loc ,use default shop_id"));
            }
        }
        JSONObject response = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("communitys", communitys);
        response.put("data", data);
        response.put("code", 0);
        return "@" + response.toJSONString();
    }

    @Get("search")
    @Post("search")
    public String search(Invocation inv, @Param("key") String key) {
        long now = System.currentTimeMillis();
        JSONArray communitys = new JSONArray();
        if (StringUtils.isBlank(key)) {
            JSONObject response = new JSONObject();
            JSONObject data = new JSONObject();
            data.put("communitys", communitys);
            response.put("data", data);
            response.put("code", 0);
            return "@json:" + response.toJSONString();

        }
        key = SUtils.wrap(key);
        List<Community> cls = communityDao.like(key);
        for (Community c : cls) {
            JSONObject com = new JSONObject();
            List<Long> shopids = shop_communityDao.get(c.getId());
            if (shopids != null && shopids.size() != 0) {
                List<Shop> shops = shopDAO.getAuditedShops(shopids);
                SUtils.forV(shops, now);
                c.setShops(shops);
            }
            communitys.add(JSON.toJSON(c));
        }
        JSONObject response = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("communitys", communitys);
        response.put("data", data);
        response.put("code", 0);
        return "@json:" + response.toJSONString();
    }


    private double distinct(double lat, double lng, double lat1, double lng1) {
        double[] from = new double[]{lat, lng};
        double[] to = new double[]{lat1, lng1};
        return geoCommunityService.calDistance(from, to);
    }

}


