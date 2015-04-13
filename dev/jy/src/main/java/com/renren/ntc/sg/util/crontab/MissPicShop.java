package com.renren.ntc.sg.util.crontab;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.*;
import java.util.List;


public class MissPicShop {

    private static int shop_id = 10086;
    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        itemDao.del(SUtils.generTableName(shop_id),shop_id);
        int offset = 1000;
        for (int i = 1 ; i < Integer.MAX_VALUE; ){
                List<Product> pl = pdDao.geProducts(0,i,offset);
               if (pl.size() == 0){
                   break;
               }
               for (Product p :pl){
                   if(StringUtils.isBlank(p.getPic_url())){
                       Item it  = new Item();
                       it.setPrice(p.getPrice());
                       it.setPic_url("");
                       it.setShop_id(shop_id);
                       it.setCount(1000);
                       it.setName(p.getName());
                       it.setSerialNo(p.getSerialNo());
                       it.setCategory_id(28);
                       it.setScore(p.getScore());
                       System.out.println("insert into " + it.getSerialNo());
                       itemDao.insert(SUtils.generTableName(shop_id),it);
                   }
               }
            i=i+offset;
        }

    }


    private static String upacage(String serialNo) {
        while (serialNo.startsWith("0")){
            serialNo = serialNo.substring(1,serialNo.length());
        }
        return serialNo;
    }


}