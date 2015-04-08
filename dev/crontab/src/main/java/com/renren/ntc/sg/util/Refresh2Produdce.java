package com.renren.ntc.sg.util;

import java.io.IOException;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;

public class Refresh2Produdce {

    private static long  shop_id= 10066;

    public Refresh2Produdce() throws IOException {

    }


    public static void main(String[] args) throws IOException {
    	String shopId = args[0];
    	shop_id = Long.parseLong(shopId);
    	System.out.println("load shopId="+shop_id);
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        int offset = 1000;
        int m = 0;
        for (int i = 0; i < 100000;) {

            List<Item> itemls = itemDao.getItems(SUtils.generTableName(shop_id), shop_id, i, offset);
            if (itemls.size() == 0) {
            	System.out.println("=======done=========");
                break;
            }
            for (Item item : itemls) {
                Product p = new Product();
                p.setCategory_id(item.getCategory_id());
                p.setScore(item.getScore());
                p.setPic_url(item.getPic_url());
                p.setPrice(item.getPrice());
                p.setName(item.getName());
                String serialNoStr = upacage(item.getSerialNo());
                p.setSerialNo(serialNoStr);
                Product pp = pdDao.geProductsByserialNo(serialNoStr);
                if (null != pp){
                    System.out.println("update into " + p.getSerialNo());
//                    if(p.getPrice() <= pp.getPrice()){
//                    	p.setPrice(pp.getPrice());
//                    }else {
//						System.out.println("商品的价格比product高,serialNo="+item.getSerialNo());
//					}
                    pdDao.updateInfo(p,serialNoStr) ;
                 }else{
                    System.out.println("insert into " + p.getSerialNo());
                    pdDao.insert(p) ;
                }
            }
            i = i + offset;
        }
    }
    
    private static String upacage(String serialNo) {
        while (serialNo.startsWith("0")){
            serialNo = serialNo.substring(1,serialNo.length());
        }
        return serialNo;
    }
}
