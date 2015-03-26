package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class CreateShopService {

    public static final long BASE_SHOP = 1;

    @Autowired
    public ShopDAO shopDao;

    @Autowired
    public CatStaffCommitDAO catstaffCommitDao;

    @Autowired
    public ShopCategoryDAO shopCategoryDao;

    @Autowired
    public RegistUserDAO registUserDAO;

    @Autowired
    public DeviceDAO deviceDao;

    @Autowired
    public ItemsDAO itemDao;

    @Autowired
    private CatStaffCommitDAO catStaffCommitDAO;

    private void del(long del_shop_id, ShopDAO shopDao, ShopCategoryDAO shopCategoryDao, RegistUserDAO registUserDAO, DeviceDAO deviceDao, ItemsDAO itemDao) {
        Shop shop = shopDao.getShop(del_shop_id);
        itemDao.del(SUtils.generTableName(BASE_SHOP), del_shop_id);
    }

    /**
     * description: TODO
     * 
     * @creater LQ
     * @param id
     * @return
     * @date 2015-3-24 下午12:29:21
     * @editer
     */
    public JSONObject createShop(long id) {

        CatStaffCommit catStaffCommit = catStaffCommitDAO.getCatStaffCommit(id);
        String onwer_phone = catStaffCommit.getShop_owner_phone();
        String admin_tel = catStaffCommit.getShop_tel();
        String admin_pwd = catStaffCommit.getShop_tel();
        String shop_address = catStaffCommit.getShop_address();
        String shop_name = catStaffCommit.getShop_name();
        String shop_print = catStaffCommit.getShop_print();
        String shop_ext = catStaffCommit.getShop_serveArea();
        JSONObject area = (JSONObject) JSON.parse(shop_ext);
        String shop_serveArea = area.getString("shop_serveArea");
        Date open_time = area.getDate("open_time");
        Date close_time = area.getDate("close_time");
        int base_price = area.getInteger("base_price");
        double lat = catStaffCommit.getShop_lat();
        double lng = catStaffCommit.getShop_lng();

        JSONObject jb = new JSONObject();
        //创建管理用户
        RegistUser regist = new RegistUser();
        regist.setPhone(admin_tel);
        regist.setName(admin_tel);
        regist.setPwd(admin_tel);
        long admin_id = registUserDAO.createUser(regist);
        jb.put("admin_id", admin_id);
        jb.put("admin_name", admin_tel);
        jb.put("admin_pwd", admin_pwd);

        LoggerUtils.getInstance().log(String.format("create new shop admin  %d , name %s ,  pwd %s ", admin_id, admin_tel, admin_pwd));
        // 初始化店铺
        Shop shop = new Shop();
        shop.setName(shop_name);
        shop.setOpen_time(open_time);
        shop.setClose_time(close_time);
        shop.setLat(lat);
        shop.setLng(lng);
        shop.setBase_price(base_price);
        shop.setOwner_phone(onwer_phone);
        shop.setTel(admin_tel);
        shop.setShop_address(shop_address);
        shop.setOwner_user_id(admin_id);
        shop.setShop_info(shop_serveArea);
        long shop_id = shopDao.insert(shop);
        LoggerUtils.getInstance().log(String.format("create new shop  %d, shop_name %s ", shop_id, shop_name));
        jb.put("shop_id", shop_id);
        jb.put("shop_name", shop_name);

        // 初始化 打印机配置
        if (!"none".equals(shop_print)) { //打印机不是必填项目
            Device dev = new Device();
            dev.setShop_id(shop_id);
            long device_id = deviceDao.updateShop_id(shop_id, shop_print);
            LoggerUtils.getInstance().log(String.format("create new printer  %d", device_id));
            jb.put("device_id", device_id);
        }
        //初始化商品库
        List<ShopCategory> ls = shopCategoryDao.getCategory(BASE_SHOP);
        for (ShopCategory s : ls) {
            s.setShop_id(shop_id);
            shopCategoryDao.insert(s);
        }

        /**
         * TODO @editer 2015/3/24 13:30 llc添加
         */
        int from = 0;
        int offset = 100;
        List<Item> itl;

        do {
            itl = itemDao.getItems(SUtils.generTableName(BASE_SHOP), BASE_SHOP, from, offset);
            for (Item it : itl) {
                it.setShop_id(shop_id);
                itemDao.insert(SUtils.generTableName(shop_id), it);
            }
            from += offset;
        } while (itl != null && itl.size() != 0);

        /**
         * TODO @editer 2015/3/24 13:30 llc注释
         */
        //        List<Item> itl = itemDao.getItems(SUtils.generTableName(BASE_SHOP), BASE_SHOP, 0, 3);
        //        for (Item it : itl) {
        //            it.setShop_id(shop_id);
        //            itemDao.insert(SUtils.generTableName(shop_id), it);
        //        }
        JSONObject shop_info = new JSONObject();
        shop_info.put("shop_id", shop_id);
        shop_info.put("shop_url", "http://www.mbianli.com/sg/shop?shop_id=" + shop_id);
        catstaffCommitDao.update(id, shop_id, shop_info.toJSONString());
        // 结束并打印程序
        LoggerUtils.getInstance().log(String.format("mov 3 item "));
        return jb;
    }
}
