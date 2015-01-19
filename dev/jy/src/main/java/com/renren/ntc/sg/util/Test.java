package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.CatStaffCommit;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.service.CreateShopService;
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

//    public static void main(String [] args){
//
//
//
//        RoseAppContext rose = new RoseAppContext();
//        ShopDAO shopDao  = rose.getBean(ShopDAO.class);
//        ItemsDAO itemDao  = rose.getBean(ItemsDAO.class);
//        DeviceDAO deviceDao  = rose.getBean(DeviceDAO.class);
//        ShopCategoryDAO shopCategoryDao  = rose.getBean(ShopCategoryDAO.class);
//        CatStaffCommitDAO catStaffCommitDAO  = rose.getBean(CatStaffCommitDAO.class);
//        CreateShopService createShopService = rose.getBean(CreateShopService.class) ;
//
//        CatStaffCommit catStaffCommit = new CatStaffCommit();
//        catStaffCommit.setName("");
//        catStaffCommit.setPhone("");
//        catStaffCommit.setPwd("staff_pwd");
//        catStaffCommit.setShop_name("shop_name");
//        catStaffCommit.setShop_tel("shop_tel");
//        catStaffCommit.setShop_print("shop_print");
//        catStaffCommit.setShop_lat(3.222);
//        catStaffCommit.setShop_lng(3.222);
//        long catstaff_id = catStaffCommitDAO.insert(catStaffCommit);
//        JSONObject re = createShopService.createShop(catstaff_id);
//        System.out.println(re.toJSONString());
//    }
     public static void main(String [] args){
         RoseAppContext rose = new RoseAppContext();
         ShopDAO  shopDao = rose.getBean(ShopDAO.class);
         Shop shop = shopDao.getShop(1);
         System.out.println(shop.getOpen_time());
         System.out.println( shop.getClose_time());

     }
}
