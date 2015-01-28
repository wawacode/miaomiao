package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;


public class DownFile {

    public DownFile() throws IOException {
        InputStream is = new FileInputStream("product.txt");

    }



    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);



    }

    public static void writeFile(String strUrl, String fileName) {
        if(new File("d:\\webimg\\" + fileName).exists()){
             return ;
        }
        int bytesRead = 0;
        URL url = null;
        OutputStream os = null;
        URLConnection is = null;
        InputStream i = null ;
        System.out.println("down load " + strUrl);
        try {
            url = new URL(strUrl);
            is = url.openConnection();
            is.setConnectTimeout(3000);
            is.setReadTimeout(3000);
            i = is.getInputStream();
            File f = new File("d:\\webimg\\");
            if(!f.exists()){
              f.mkdirs();
            }
            os = new FileOutputStream("d:\\webimg\\" + fileName);
            bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = i.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        } catch (Throwable e) {
            e.printStackTrace();
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

    private static int toPrice(String cell) {
        Float r = Float.valueOf(cell);
        return (int) (r * 100);
    }


}