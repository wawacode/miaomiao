package com.renren.ntc.sg.controllers.console.api;

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
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("commy")
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
    public String add_link (Invocation inv,@Param("shop_id") long shop_id,  @Param("c_id") long c_id ){
        if(validate(shop_id,c_id)){
            return "@json:" + Constants.PARATERERROR ;
        }
        Shop_Community  shop_c =   new Shop_Community();
        shop_c.setShop_id(shop_id);
        shop_c.setCommunity_id(c_id);
        shop_communityDao.insert(shop_c);

        return "@json:" + Constants.DONE ;
    }

    private boolean validate(long shop_id, long c_id) {
       Shop shop =  shopDAO.getShop(shop_id);
        Community community =  communityDao.get(c_id);
        return (null != shop) && (null != community);
    }

}


