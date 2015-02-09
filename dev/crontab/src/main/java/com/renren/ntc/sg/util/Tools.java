package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.SuggestionDAO;
import com.renren.ntc.sg.util.SUtils;
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
    public static  final long shop_id = 10020;

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
                suggestDao.add(item.getName(),item.getScore(),shop_id);
            }
            i = i + offset;
        }
    }
}
