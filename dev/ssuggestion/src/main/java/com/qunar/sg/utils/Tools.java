package com.qunar.sg.utils;

import com.qunar.sg.bean.Item;
import com.qunar.sg.dao.ItemsDAO;
import com.qunar.sg.dao.SuggestionDAO;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-2-2
 * Time: 下午4:57
 * To change this template use File | Settings | File Templates.
 */
public class Tools {
    public static  final long shop_id = 10030;

    public static void main(String[] args) {

        RoseAppContext rose = new RoseAppContext();
        SuggestionDAO suggestDao =  rose.getBean(SuggestionDAO.class);
        ItemsDAO itemDao =  rose.getBean(ItemsDAO.class);
        int offset = 100;
        for (int i=0 ;i < 100000 ; ){

            List<Item> itemls =  itemDao.getItems(SUtils.generTableName(shop_id), shop_id,i, offset);
            if(itemls.size() == 0){
                break;
            }
            for (Item item : itemls){
                suggestDao.add(item.getName(),10,shop_id);
            }
        }
    }
}
