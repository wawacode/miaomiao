package com.renren.ntc.sg.util;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.biz.dao.ItemsDAO;

/**
 * @className getItemCount
 * @description 获取商品总数量
 * @author LQ
 * @date 2015-3-24 下午10:53:13
 */
public class getItemCount {

    private static int shop_id = 10052;

    public static void main(String[] args) {
        getAllItemCount();
        getItemPrice0Count();
        getItemCategoryPrice0Count();
        getItemCategoryCount();
    }

    private static void getAllItemCount() {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        int count = itemDao.getItemsCount(SUtils.generTableName(shop_id), shop_id);
        System.out.println("商品数量：" + count);
    }

    private static void getItemPrice0Count() {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        int count = itemDao.getItemsPrice0Count(SUtils.generTableName(shop_id), shop_id);
        System.out.println("商品价格0数量：" + count);
    }

    private static void getItemCategoryPrice0Count() {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);

        for (int k = 15; k < 29; k++) {
            int count = itemDao.getItemsPrice0Count(SUtils.generTableName(shop_id), shop_id, k);
            System.out.println("分类" + k + "中价格为0的数：" + count);
        }
    }

    private static void getItemCategoryCount() {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);

        for (int k = 15; k < 29; k++) {
            int count = itemDao.getItemsCategoryCount(SUtils.generTableName(shop_id), shop_id, k);
            System.out.println("分类" + k + "的数：" + count);
        }
    }
}
