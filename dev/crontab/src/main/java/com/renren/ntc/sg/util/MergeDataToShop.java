package com.renren.ntc.sg.util;

import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

import com.alibaba.fastjson.JSON;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.ItemsDAO;

public class MergeDataToShop {
	public static void main(String[] args) {
		String fromShopIdStr = args[0];
		String toShopIdStr = args[1];
		if(StringUtils.isBlank(fromShopIdStr) || StringUtils.isBlank(toShopIdStr)){
			System.out.println("param is null");
			return;
		}
		if(!NumberUtils.isNumber(fromShopIdStr) || !NumberUtils.isNumber(toShopIdStr)){
			System.out.println("param is not number");
			return;
		}
		int fromShopId = Integer.parseInt(fromShopIdStr);
		int toShopId = Integer.parseInt(toShopIdStr);
		RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        int offset = 100;
        for (int i = 0; i < 100000; ) {
            System.out.println( "get " + i + " " + offset );
            //获取 测试又来马特 的 list 
            List<Item> itemls = itemDao.getOrignItems(SUtils.generTableName(fromShopId), fromShopId, i, offset);
            if (itemls.size() == 0) {
                break;
            }
            for (Item item : itemls) {
            		if(item == null){
            			continue;
            		}
                     //线上马特
                     Item toMergtItem = itemDao.getItem(SUtils.generTableName(toShopId), item.getSerialNo(),toShopId);
                    if (toMergtItem != null) {
                    	   if( toMergtItem.getCount() == 0 || toMergtItem.getOnsell() ==0){
                    		   String name = StringUtils.isBlank(item.getName()) ? "":item.getName();
                    		   int count = 1000;
                    		   if(StringUtils.isBlank(item.getPic_url()) || item.getPrice() ==0){
                    			   count = 0;
                    		   }
                    		   itemDao.updateItemsBaseInfo(SUtils.generTableName(toShopId), item.getSerialNo(), name, item.getPic_url(), item.getPrice(), count,item.getCategory_id());
                    		   System.out.println("update shopId="+toShopId+"--"+JSON.toJSONString(item));
                    	   }else {
                    		   System.out.println("count is no zero shopId="+toShopId+"--"+JSON.toJSONString(toMergtItem));
						}
                    }else{
                    	 int count =1000;
                    	 if( item.getCount() == 0 || item.getOnsell() ==0){
                    		 count =0;
                    	 }
                    	 item.setCount(count);
                    	 item.setShop_id(toShopId);
                         itemDao.insertItemsBaseInfo(SUtils.generTableName(toShopId), item);
                         System.out.println("insert to shopId="+toShopId+"--"+JSON.toJSONString(item));
                    }
            }
            i = i + offset;
        }
	}
}
