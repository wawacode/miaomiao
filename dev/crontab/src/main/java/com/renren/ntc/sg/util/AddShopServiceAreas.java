package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.ShopArea;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopAreaDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class AddShopServiceAreas {

     private static long  shop_id = 10031;

    public AddShopServiceAreas() throws IOException {

    }



    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ShopAreaDAO shopareaDao = rose.getBean(ShopAreaDAO.class);
        List<ShopArea> shopAreas = shopareaDao.getShopArea(shop_id) ;
//        ShopArea area = new  ShopArea();
//        area.setShop_id(shop_id);
//        area.setArea_name("慧谷金色家园一期");
//        area.setMax_lng(116.473791);
//        area.setMin_lng(116.464304);
//        area.setMax_lat(40.011043);
//        area.setMin_lat(40.00629);
//        shopareaDao.insert(area);

        ShopArea area = new  ShopArea();
        area.setShop_id(shop_id);
        area.setArea_name("望京西园");
        area.setMax_lng(116.481843);
        area.setMin_lng(116.474405);
        area.setMax_lat(40.005474);
        area.setMin_lat(39.99844);
        shopareaDao.insert(area);

    }







}