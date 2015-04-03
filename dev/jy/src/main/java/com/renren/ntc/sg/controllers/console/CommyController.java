package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.Community;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.Shop_Community;
import com.renren.ntc.sg.biz.dao.CommunityDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.biz.dao.Shop_CommunityDAO;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

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


    @Get("")
    @Post("")
    public String index(Invocation inv, @Param("shop_id") long shop_id) {

        shop_communityDao.getCmmy(shop_id);

        return "@json:" + Constants.DONE;
    }

}


