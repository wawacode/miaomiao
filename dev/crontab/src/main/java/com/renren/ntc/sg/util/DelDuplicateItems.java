package com.renren.ntc.sg.util;

import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.ItemsDAO;

class DelDuplicateItems {
	public static void main(String[] args) {
		    //long shopId = 10070L;
		    //long[] shopIdArr = new long[]{10067L,10068L,10069L,10070L,10071L,10072L,10075L,10076L,10077L,10078L,10079L,10080L};
		long[] shopIdArr = new long[]{10083L};
		    RoseAppContext rose = new RoseAppContext();
	        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
	        //ShopDAO shopDAO =rose.getBean(ShopDAO.class);
	        for(long shopId : shopIdArr){
	        	 List<String> serialNos = itemDao.getDupSerialList(SUtils.generTableName(shopId), shopId);
	 	        for(String serialNo : serialNos){
	 	        	System.out.println("shopId="+shopId+",serialNo="+serialNo);
	 	        	List<Item> items = itemDao.getItemList(SUtils.generTableName(shopId), serialNo, shopId);
	 	        	for(int i=0;i<items.size();i++){
	 	        		Item tempIt = items.get(i);
	 	        		if(i == items.size() -1){
	 	        			System.out.println("break itemid ="+tempIt.getId());
	 	        			break;
	 	        		}
	 	        		itemDao.delById(SUtils.generTableName(shopId), shopId, tempIt.getId());
	 	        		System.out.println("del shopid="+shopId+",serinalNo ="+serialNo+",item id="+tempIt.getId());
	 	        	}
	 	        	
	 	        	
	 	        }
	        }
	       
	        
	       
	        
	}
}
