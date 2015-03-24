package com.renren.ntc.sg.util;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.biz.dao.ItemsDAO;

public class DeleteShopItems {

    private static long shop_id = 10064;

    public static void main(String[] args) {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        itemDao.del(SUtils.generTableName(shop_id), shop_id);
        System.out.println("删除完成");
    }
}
