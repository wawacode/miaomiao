package com.renren.ntc.sg.util.fixShop;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.CatStaffCommit;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.CatStaffCommitDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.io.*;


public class AddProduct2Shop {

    private static int catstaff_commit_id = 29 ;
    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        CatStaffCommitDAO catStaffCommitDao = rose.getBean(CatStaffCommitDAO.class);
        ShopDAO shopDAODao = rose.getBean(ShopDAO.class);
        // 读取第一章表格内容

       CatStaffCommit catstaff  = catStaffCommitDao.getCatStaffCommit(catstaff_commit_id);
        Shop shop =  new Shop ();
        shop.setId(10029);
        shop.setName(catstaff.getShop_name());
        shop.setOwner_user_id(30);
        shop.setOwner_phone("84725236");
        shop.setShop_address(catstaff.getShop_address());
        shop.setLat(catstaff.getShop_lat());
        shop.setLng(catstaff.getShop_lng());
//        shopDAODao.updateALl(shop);
    }





}