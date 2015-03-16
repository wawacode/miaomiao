package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.io.IOException;
import java.util.List;


public class MegerShopItems {

    private static long shop_id = 10032;
    private static long to_shop_id = 10025;
    private static int category_id = 15;


    public MegerShopItems() throws IOException {

    }


    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        int offset = 100;
        for (int k=15; k<29 ;k++){
            category_id = k ;
        for (int i = 0; i < 100000; ) {
            System.out.println( "get " + i + " " + offset );
            List<Item> itemls = itemDao.getItems(SUtils.generTableName(shop_id), shop_id,category_id, i, offset);
            if (itemls.size() == 0) {
                break;
            }
            for (Item item : itemls) {
                    item.setShop_id(to_shop_id);
                     Item ii = itemDao.getItem(SUtils.generTableName(to_shop_id), item.getSerialNo());
                    if (null == ii) {
                           System.out.println("insert " + item.getSerialNo());
                           itemDao.insert(SUtils.generTableName(to_shop_id), item);
                    }else{
                          System.out.println("update" + item.getSerialNo() + " " + item.getId() );
                    }
            }
            i = i + offset;
        }
        }
    }


}