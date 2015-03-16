package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;


public class CreateShop {
    private static final long BASE_SHOP = 1 ;


    public static long del_shop_id = 3;

    private static enum ACTION { INSERT, UPDATE ,DEL }
    // insert|update
    public static  ACTION action = ACTION.INSERT;

    //116.34649,39.980869
    public static String shop_name = "苑" ;
    public static String admin_name = "admin_001" ;
    public static String admin_phone= "68944445" ;
    public static String admin_pwd = "admin_001" ;
    public static  String tel = "68955555" ;
    public static  double lat = 39.980869 ;
    public static double lng = 116.34649 ;

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ShopDAO shopDao  = rose.getBean(ShopDAO.class);
        ItemsDAO itemDao  = rose.getBean(ItemsDAO.class);
        DeviceDAO deviceDao  = rose.getBean(DeviceDAO.class);
        ShopCategoryDAO shopCategoryDao  = rose.getBean(ShopCategoryDAO.class);
        RegistUserDAO registUserDAO  = rose.getBean(RegistUserDAO.class);

        switch (action) {
            case INSERT:
                insert(shopDao, shopCategoryDao, registUserDAO,deviceDao,itemDao);
                break;
            case DEL :
                del(del_shop_id,shopDao, shopCategoryDao, registUserDAO,deviceDao,itemDao);
                break;
            default:
                 break;

        }
    }
    private static void del(long del_shop_id, ShopDAO shopDao, ShopCategoryDAO shopCategoryDao, RegistUserDAO registUserDAO, DeviceDAO deviceDao, ItemsDAO itemDao) {
        Shop  shop = shopDao.getShop(del_shop_id);
        itemDao.del(SUtils.generTableName(BASE_SHOP),del_shop_id);
    }


    private static void insert(ShopDAO shopDao, ShopCategoryDAO shopCategoryDao, RegistUserDAO registUserDAO,DeviceDAO deviceDao,ItemsDAO itemDao) {
        //创建管理用户

        RegistUser regist =   new RegistUser();
        regist.setPhone(admin_phone);
        regist.setName(admin_name);
        regist.setPwd(admin_pwd);
        long admin_id = registUserDAO.createUser(regist);
        System.out.println(String.format("create new shop admin  %d , name %s ,  pwd %s ",admin_id ,admin_name , admin_pwd));
        // 初始化店铺
        Shop shop =  new Shop();
        shop.setName(shop_name);
        shop.setLat(lat);
        shop.setLng(lng);
        shop.setOwner_phone(admin_phone);
        shop.setOwner_user_id(admin_id);
        long shop_id = shopDao.insert(shop) ;
        System.out.println(String.format("create new shop  %d, shop_name %s ",shop_id, shop_name));
        // 初始化 打印机配置
        Device dev =  new Device();
        dev.setShop_id(shop_id);
        dev.setToken("tooook");
        dev.setStatus("looping");
        dev.setSecret_key("secret_key");
        long device_id = deviceDao.insert(dev);
        System.out.println(String.format("create new printer  %d",device_id));
        //初始化商品库
        List<ShopCategory> ls = shopCategoryDao.getCategory(BASE_SHOP);
        for (ShopCategory s : ls ){
            s.setShop_id(shop_id);
            shopCategoryDao.insert(s);
        }
        List<Item>  itl =  itemDao.getItems(SUtils.generTableName(BASE_SHOP),BASE_SHOP,0,3);
        for (Item it : itl ){
            it.setShop_id(shop_id);
            itemDao.insert(SUtils.generTableName(shop_id),it) ;
        }
        // 结束并打印程序
        System.out.println(String.format("mov 3 item " ));

    }




}