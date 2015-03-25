package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import java.io.IOException;
import java.util.List;

public class mvShopItems {

    private static long shop_id = 1;

    private static long to_shop_id = 10055;

    private static int category_id = 15;

    private static long shop[] = { 10052 };

    public mvShopItems() throws IOException {

    }

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        int offset = 100;

        for (int m = 0; m < shop.length; m++) {
            to_shop_id = shop[m];

            for (int k = 15; k < 29; k++) {
                category_id = k;
                for (int i = 0; i < 100000;) {
                    System.out.println("get " + i + " " + offset);
                    List<Item> itemls = itemDao.getItems(SUtils.generTableName(shop_id), shop_id, category_id, i, offset);
                    if (itemls.size() == 0) {
                        break;
                    }
                    for (Item item : itemls) {
                        item.setShop_id(to_shop_id);
                        try {
                            Item ii = itemDao.getItem(SUtils.generTableName(to_shop_id), item.getSerialNo(), to_shop_id);
                            if (null == ii) {
                                System.out.println("insert " + item.getSerialNo());
                                itemDao.insert(SUtils.generTableName(to_shop_id), item);
                            } else {
                                System.out.println("update" + item.getSerialNo() + " " + item.getId());
                                itemDao.updateforSerialNo(SUtils.generTableName(to_shop_id), item, item.getSerialNo());
                            }
                        } catch (IncorrectResultSizeDataAccessException e) {
                            itemDao.del(SUtils.generTableName(to_shop_id), to_shop_id, item.getSerialNo());
                            itemDao.insert(SUtils.generTableName(to_shop_id), item);
                        } catch (Exception e) {

                            e.printStackTrace();
                        }
                    }
                    i = i + offset;
                }
            }
        }
    }

}
