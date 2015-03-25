package com.renren.ntc.sg.util;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.biz.dao.ItemsDAO;

public class DeleteShopItems {

    private static long shop_id = 10063;

    //private static long shop[] = { 10044, 10058, 10053, 10048, 10049, 10051, 10041, 10059, 10043, 10042, 10047, 10045, 10062 };
    private static long shop[] = { 10063 };

    public static void main(String[] args) {
        deleteAllItems();
    }

    private static void deleteAllItems() {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        for (int i = 0; i < shop.length; i++) {
            itemDao.del(SUtils.generTableName(shop[i]), shop[i]);
            System.out.println(":::" + shop[i]);
        }

        System.out.println("删除完成");
    }

    private static void deletePriceZero() {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        itemDao.del(SUtils.generTableName(shop_id), shop_id);
        System.out.println("删除完成");
    }

    private static void deleteCategory() {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        itemDao.delCategory(SUtils.generTableName(shop_id), shop_id, 15);
        System.out.println("删除完成");
    }
}
