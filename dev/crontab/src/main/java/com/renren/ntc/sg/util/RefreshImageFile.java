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


public class RefreshImageFile {

    private static long  shop_id= 10030;

    public RefreshImageFile() throws IOException {

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
                if(!StringUtils.isBlank(pic) && -1 == pic.indexOf("cat/images")){
                    System.out.println( "download " + item.getSerialNo() + " "  + pic );
                    String fname = item.getSerialNo()+".jpg";
                    try {
                        writeFile (pic,fname);
                        String pic_url = "http://www.mbianli.com/cat/images/" + fname;
                        System.out.println("update "  +  pic);
                        if (new File("D:\\webimg2\\"+fname).exists()){
                           itemDao.update(SUtils.generTableName(shop_id),item.getSerialNo(),item.getName(),pic_url);
                        }
                    } catch (Throwable throwable) {
                        throwable.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                }
             }
            i = i + offset;
        }
    }

    public static void writeFile(String strUrl, String fileName) throws Throwable {
        String dir = "d:\\webimg2\\";
        if(new File(dir + fileName).exists()){
             return ;
        }
        int bytesRead = 0;
        URL url = null;
        OutputStream os = null;
        URLConnection is = null;
        InputStream i = null ;
        try {
            url = new URL(strUrl);
            is = url.openConnection();
            is.setConnectTimeout(3000);
            is.setReadTimeout(3000);
            i = is.getInputStream();
            File f = new File(dir);
            if(!f.exists()){
              f.mkdirs();
            }
            os = new FileOutputStream( dir + fileName);
            bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = i.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        } catch (Throwable e) {
            e.printStackTrace();
            throw  e;
        }
        finally {
            try {
                os.close();
                i.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }




}