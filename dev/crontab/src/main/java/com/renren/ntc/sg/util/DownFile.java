package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;


public class DownFile {

    public DownFile() throws IOException {
    }


    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        String filePath = "F:\\product\\ylmt.txt";
        readTxtFile(filePath, pdDao, itemDao);


    }

    public static void readTxtFile(String filePath, ProductDAO pdDao, ItemsDAO itemDao) {
        long shop_id = 10063;
        InputStreamReader read = null;
        try {

            String encoding = "utf-16";
            File file = new File(filePath);
            if (file.isFile() && file.exists()) { //判断文件是否存在
                read = new InputStreamReader(
                        new FileInputStream(file), encoding);//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = null;
                while ((lineTxt = bufferedReader.readLine()) != null) {
                    String[] args = lineTxt.split("\t");
                    if (null != args && args.length < 3) {
                        System.out.println("drop " + lineTxt);
                        continue;
                    }
                    try {
                        String serialNo = args[0];
                        String name = args[1];
                        String price = args[2];

                        int pp = (int) (Float.valueOf(price) * 100);
                        Item it = new Item();
                        if (args.length > 3) {
                            String pic_url = args[3];
                            String end = getSuffix(pic_url);
                            String pic_name = serialNo + end;

                            String url = "http://www.mbianli.com/cat/images/" + pic_name;
                            if (new File("d:\\webimg\\" + pic_name).exists()) {
                                it.setPic_url(url);
                            }
                        }
                        it.setSerialNo(serialNo);
                        it.setCategory_id(28);
                        it.setPrice(pp);
                        it.setShop_id(shop_id);
                        it.setName(name);
                        System.out.println("insert into " + JSON.toJSON(it).toString());
                        itemDao.insert(SUtils.generTableName(shop_id), it);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            } else {
                System.out.println("找不到指定的文件");
            }

        } catch (Exception e) {
            System.out.println("读取文件内容出错");
            e.printStackTrace();
        } finally {
            if (null != read) {
                try {
                    read.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    private static String getSuffix(String pic_url) {
        return ".jpg";
//        int f = pic_url.lastIndexOf(".");
//        return pic_url.substring(f,pic_url.length());  //To change body of created methods use File | Settings | File Templates.
    }

    public static void writeFile(String strUrl, String fileName) {
        if (new File("d:\\webimg\\" + fileName).exists()) {
            return;
        }
        int bytesRead = 0;
        URL url = null;
        OutputStream os = null;
        URLConnection is = null;
        InputStream i = null;
        System.out.println("down load " + strUrl);
        try {
            url = new URL(strUrl);
            is = url.openConnection();
            is.setConnectTimeout(3000);
            is.setReadTimeout(3000);
            i = is.getInputStream();
            File f = new File("d:\\webimg\\");
            if (!f.exists()) {
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
        } finally {
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