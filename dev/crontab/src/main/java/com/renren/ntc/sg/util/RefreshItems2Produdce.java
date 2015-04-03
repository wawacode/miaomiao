package com.renren.ntc.sg.util;

import java.io.IOException;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;

/**
 * 测试总店1074更新product
 * @author chunhai.li
 *
 */
public class RefreshItems2Produdce {

    //private static long  shop_id= 10066;

    public RefreshItems2Produdce() throws IOException {

    }



    public static void main(String[] args) throws IOException {
    	String shopIdStr = args[0];
    	if(StringUtils.isBlank(shopIdStr)){
    		return;
    	}
    	long shopId = Long.parseLong(shopIdStr);
    	System.out.println("load shopId="+shopId+" data 2 product");
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        int offset = 1000;
        for (int i=0 ;i < 100000 ; ){

            List<Item> itemls =  itemDao.getItems(SUtils.generTableName(shopId), shopId,i, offset);
            if(itemls.size() == 0){
                break;
            }
            int j =0;
            for ( Item item :  itemls ){
                Product p =  new Product();
                p.setCategory_id(item.getCategory_id());
                //p.setScore(item.getScore());
                p.setPic_url(item.getPic_url());
                //p.setPrice(item.getPrice());
                p.setName(item.getName());
                String serialNoStr = upacage(item.getSerialNo());
                p.setSerialNo(serialNoStr);
                Product pp = pdDao.geProductsByserialNo(serialNoStr);
                JSONObject ob = (JSONObject)JSON.toJSON(p);
                if (null != pp){
                    System.out.println("update into " + ob.toJSONString());
                    pdDao.updateBaseInfo(p,serialNoStr) ;
                 }else{
                    System.out.println("insert into " + ob.toJSONString());
                    p.setScore(1000);
                    pdDao.insertBaseInfo(p) ;
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