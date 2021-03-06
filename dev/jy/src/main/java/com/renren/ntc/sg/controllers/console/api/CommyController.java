package com.renren.ntc.sg.controllers.console.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.geo.GeoQueryResult;
import com.renren.ntc.sg.geo.ShopLocation;
import com.renren.ntc.sg.service.GeoCommunityService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("commy")
@DenyCommonAccess
public class CommyController {


    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public ItemsDAO itemsDAO;

    @Autowired
    public CommunityDAO communityDao;
    @Autowired
    public Shop_CommunityDAO shop_communityDao;

    @Get("add_link")
    @Post("add_link")
    public String add_link(Invocation inv, @Param("shop_id") long shop_id, @Param("c_id") String c_ids) {
        String[] strs = c_ids.split(",");
        for (String s : strs) {
            try{
            int c_id = Integer.valueOf(s);
            if (!validate(shop_id, c_id)) {
                return "@json:" + Constants.PARATERERROR;
            }
            Shop_Community shop_c = new Shop_Community();
            shop_c.setShop_id(shop_id);
            shop_c.setCommunity_id(c_id);
            shop_c.setExt("");
            shop_communityDao.insert(shop_c);
            // 提升排序
            communityDao.upScore(c_id);
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        return "@json:" + Constants.DONE;
    }
    @Get("get_links")
    @Post("get_links")
    public String get_links(Invocation inv, @Param("shop_id") long shop_id) {

           List <Community> cs = null;
            try{
                List <Long > c_ids = shop_communityDao.getCmmy(shop_id);
                 cs = communityDao.gets(c_ids);
            }catch(Exception e){
                e.printStackTrace();
            }
        return "@json:" + ((JSONArray)JSON.toJSON(cs)).toJSONString();
    }


    @Get("del_link")
    @Post("del_link")
    public String del_link(Invocation inv, @Param("shop_id") long shop_id, @Param("c_id") long c_id) {
        if (!validate(shop_id, c_id)) {
            return "@json:" + Constants.PARATERERROR;
        }
        shop_communityDao.del(shop_id, c_id);

        return "@json:" + Constants.DONE;
    }

    private boolean validate(long shop_id, long c_id) {
        Shop shop = shopDAO.getShop(shop_id);
        Community community = communityDao.get(c_id);
        if ((null != shop) && (null != community)) {
            return true;
        }
        LoggerUtils.getInstance().log(String.format("can't find link shop %d ,community %d", shop_id, c_id));
        return false;
    }

}


