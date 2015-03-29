package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.util.List;


public class RefreshFromProdudce {

    private static long  shop_id= 1;

    public RefreshFromProdudce() throws IOException {

    }



    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        int offset = 100;
        for (int i=0 ;i < 100000 ; ){
            System.out.println(i + " " + offset);
            List<Item> itemls =  itemDao.getItems(SUtils.generTableName(shop_id), shop_id,i, offset);
            if(itemls.size() == 0){
                break;
            }
            for ( Item item :  itemls ){
                String pic = item.getPic_url();
                    Product p = pdDao.geProductsByserialNo(item.getSerialNo());
                    if(p == null){
                        System.out.println("miss" +  item.getSerialNo() );
                        continue;
                    }
                    String p_pic_url = p.getPic_url();

                    if(!StringUtils.isBlank(p_pic_url)){
                        System.out.println(item.getSerialNo() +  " "+ p_pic_url);
                        itemDao.update(SUtils.generTableName(shop_id),item.getSerialNo(),item.getName(),p_pic_url);
                    }
            }
            i = i + offset;
        }
    }






}