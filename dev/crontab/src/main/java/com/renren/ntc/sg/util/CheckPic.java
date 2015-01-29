package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class CheckPic {


    private static long  shop_id= 10030;

    public CheckPic() throws IOException {

    }



    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        int offset = 100;
        for (int i=0 ;i < 100000 ; ){

            List<Item> itemls =  itemDao.getItems(SUtils.generTableName(shop_id), shop_id, i, offset);
            if(itemls.size() == 0){
                break;
            }
            for ( Item item :  itemls ){
                String pic = item.getPic_url();
                if (!StringUtils.isBlank(pic)){
                    byte [] ss =  SHttpClient.getURLData(pic, "mbianli.com");
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    if (null == ss){
                        System.out.println( pic );
                        continue;
//                        itemDao.updateforSerialNo(SUtils.generTableName(shop_id), pic, item.getSerialNo());
                    }
                    String html = SUtils.toString(ss);
                }
              }
            i = i + offset;
        }
    }

    private static String repare(String html) {
        html = html.replaceAll("<!--.*?-->", "");
        html = html.replaceAll("<script>.*?<\\script>", "");
        html = html.replaceAll("<SCRIPT.*?<\\SCRIPT>", "");
        // html = html.replaceAll(" +", "");
        html = html.replaceAll("\\t*", "");
        html = html.replaceAll("\\n|\\r", "");
//        System.out.println(html);
        return html;
    }






}