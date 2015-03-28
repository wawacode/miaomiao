package com.renren.ntc.sg.util;

import java.io.IOException;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;


public class Refresh2Produdce {

    private static long  shop_id= 10068;

    public Refresh2Produdce() throws IOException {

    }



    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        int offset = 1000;
        for (int i=0 ;i < 100000 ; ){

            List<Item> itemls =  itemDao.getItems(SUtils.generTableName(shop_id), shop_id,i, offset);
            if(itemls.size() == 0){
                break;
            }
            for ( Item item :  itemls ){
                String pic = item.getPic_url();
                Product p =  new Product();
                p.setCategory_id(item.getCategory_id());
                p.setScore(item.getScore());
                p.setPic_url(item.getPic_url());
                p.setPrice(item.getPrice());
                p.setName(item.getName());
                p.setSerialNo(item.getSerialNo());
                Product pp = pdDao.geProductsByserialNo(item.getSerialNo());
                if (null != pp){
                    System.out.println("update into " + p.getSerialNo());
                    if(p.getPrice() <= pp.getPrice()){
                    	p.setPrice(pp.getPrice());
                    }else {
						System.out.println("商品的价格比product高,serialNo="+item.getSerialNo());
					}
                    pdDao.updateInfo(p,item.getSerialNo()) ;
                 }else{
                    System.out.println("insert into " + p.getSerialNo());
                    pdDao.insert(p) ;
                }

            }
            i = i + offset;
        }
    }






}