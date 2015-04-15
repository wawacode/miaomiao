package com.renren.ntc.sg.util;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.biz.dao.ItemsDAO;

public class DeleteShopItems {
	/**
	 * +-------+----------------------------------+
| 10067 |              测试圣馨便利点-勿动 |
| 10069 |             测试-方舟苑测试-勿动 |
| 10070 |             测试-鑫世纪华联-勿动 |
| 10071 |                 测试-福奈特-勿动 |
| 10072 |           测试-望京西园二区-勿动 |
| 10075 |               测试-京诚超市-勿动 |
| 10076 |             测试-大西洋新城-勿动 |
| 10077 |                测试-108测试-勿动 |
| 10078 |                 测试-花家地-勿动 |
| 10079 |               测试-金隅立港-勿动 |
| 10080 |                    测试-219-勿动 |
	 */
	
//    private static long shop[] = { 10067,10069, 10070,10071,10072,10075,10076,10077,10078,10079,10080};
    private static long shop[]  = {10104};
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

//    private static void deletePriceZero() {
//        RoseAppContext rose = new RoseAppContext();
//        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
//        itemDao.del(SUtils.generTableName(shop_id), shop_id);
//        System.out.println("删除完成");
//    }
//
//    private static void deleteCategory() {
//        RoseAppContext rose = new RoseAppContext();
//        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
//        itemDao.delCategory(SUtils.generTableName(shop_id), shop_id, 15);
//        System.out.println("删除完成");
//    }
}
