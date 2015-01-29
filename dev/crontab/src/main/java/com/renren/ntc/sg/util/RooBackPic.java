package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.File;
import java.io.IOException;
import java.util.List;


public class RooBackPic {


    private static long  shop_id= 10030;

    public RooBackPic() throws IOException {

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
                String[] pics =  pic.split("/");
                String filename = pics[pics.length-1];
                if (!StringUtils.isBlank(pic)){
                    String dir = "d:\\webimg\\";
                    if(new File(dir + filename).exists()){
                        System.out.println( "to del "+ item.getSerialNo());
                       itemDao.del(SUtils.generTableName(shop_id),shop_id,item.getSerialNo());
                    }
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