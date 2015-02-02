package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.CatStaffCommit;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.CatStaffCommitDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.net.URLDecoder;
import java.net.URLEncoder;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-14
 * Time: 上午11:25
 * To change this template use File | Settings | File Templates.
 */
public class Test {

    public static void main(String [] args){
        RoseAppContext rose =  new  RoseAppContext();
        CatStaffCommitDAO catStaffCommitDAO = rose.getBean(CatStaffCommitDAO.class);
        ShopDAO shopDao = rose.getBean(ShopDAO.class);
        CatStaffCommit catStaffCommit = catStaffCommitDAO.getCatStaffCommit(22);
        Shop shop =  new Shop();
        shop.setId(10025);
        shop.setName( catStaffCommit.getShop_name());
        shop.setShop_address(catStaffCommit.getShop_address());
        shop.setLat(catStaffCommit.getShop_lat());
        shop.setLng(catStaffCommit.getShop_lng());
        shop.setOwner_user_id(24);
        shop.setTel(catStaffCommit.getShop_tel());
        shop.setOwner_phone(catStaffCommit.getShop_owner_phone());
        shopDao.insert(shop) ;
    }
}
