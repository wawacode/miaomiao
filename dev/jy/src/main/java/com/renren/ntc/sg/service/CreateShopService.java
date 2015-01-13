package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CreateShopService {
    public static final long BASE_SHOP = 1 ;
    @Autowired
    public ShopDAO shopDao;
    @Autowired
    public ShopCategoryDAO shopCategoryDao;
    @Autowired
    public  RegistUserDAO registUserDAO;
    @Autowired
    public DeviceDAO deviceDao;
    @Autowired
    public ItemsDAO itemDao;

    @Autowired
    private CatStaffCommitDAO catStaffCommitDAO;

    private  void del(long del_shop_id, ShopDAO shopDao, ShopCategoryDAO shopCategoryDao, RegistUserDAO registUserDAO, DeviceDAO deviceDao, ItemsDAO itemDao) {
        Shop  shop = shopDao.getShop(del_shop_id);
        itemDao.del(SUtils.generTableName(BASE_SHOP),del_shop_id);
    }


    public JSONObject createShop(long id ) {

        CatStaffCommit  catStaffCommit  = catStaffCommitDAO.getCatStaffCommit(id);
        String admin_phone = catStaffCommit.getShop_owner_phone();
        String admin_tel = catStaffCommit.getShop_tel();
        String admin_pwd = catStaffCommit.getShop_tel();
        String shop_address = catStaffCommit.getShop_address();
        String shop_name =   catStaffCommit.getShop_name();
        String shop_print = catStaffCommit.getShop_print();
        double lat =  catStaffCommit.getShop_lat();
        double lng =  catStaffCommit.getShop_lng();

        JSONObject jb =  new    JSONObject ();
        //创建管理用户
        RegistUser regist =   new RegistUser();
        regist.setPhone(admin_tel);
        regist.setName(admin_tel);
        regist.setPwd(admin_tel);
        long admin_id = registUserDAO.createUser(regist);
        jb.put("admin_id",admin_id);
        jb.put("admin_name",admin_tel);
        jb.put("admin_pwd",admin_pwd);

        LoggerUtils.getInstance().log(String.format("create new shop admin  %d , name %s ,  pwd %s ",admin_id ,admin_tel , admin_pwd));
        // 初始化店铺
        Shop shop =  new Shop();
        shop.setName(shop_name);
        shop.setLat(lat);
        shop.setLng(lng);
        shop.setOwner_phone(admin_phone);
        shop.setTel(admin_tel);
        shop.setShop_address(shop_address);
        shop.setOwner_user_id(admin_id);
        long shop_id = shopDao.insert(shop) ;
        LoggerUtils.getInstance().log(String.format("create new shop  %d, shop_name %s ",shop_id, shop_name));
        jb.put("shop_id",shop_id);
        jb.put("shop_name",shop_name);

        // 初始化 打印机配置
        Device dev =  new Device();
        dev.setShop_id(shop_id);
        long device_id = deviceDao.updateShop_id(shop_id,shop_print);
        LoggerUtils.getInstance().log(String.format("create new printer  %d",device_id));
        jb.put("device_id",device_id);

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
        LoggerUtils.getInstance().log(String.format("mov 3 item " ));
        return jb;
    }
}