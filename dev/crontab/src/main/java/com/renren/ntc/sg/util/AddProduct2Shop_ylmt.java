package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.*;

public class AddProduct2Shop_ylmt {

    private static int shop_id = 10073;

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        String filePath = "C:\\shop\\又来玛特扫描数据.txt";
        readTxtFile1(filePath, pdDao, itemDao);

    }

    public static void readTxtFile1(String filePath, ProductDAO pdDao, ItemsDAO itemDao) {
        InputStreamReader read = null;
        try {
            String encoding = "utf8";
            File file = new File(filePath);
            if (file.isFile() && file.exists()) { //判断文件是否存在
                read = new InputStreamReader(new FileInputStream(file), encoding);//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = null;
                int m = 0;
                int n = 0;
                while ((lineTxt = bufferedReader.readLine()) != null) {
                    String serialNo = lineTxt;
                    System.out.println("serialNo " + serialNo);
                    serialNo = upacage(serialNo);
                    Product p = pdDao.geProductsByserialNo("kr_" + serialNo);

                    if (StringUtils.isBlank(serialNo)) {
                        continue;
                    }
                    if (p != null) {
                        n++;
                        if (p.getCategory_id() == 15) {
                            continue;
                        }
                        if (p.getCategory_id() == 0) {
                            p.setCategory_id(28);
                        }
                        Item it = new Item();
                        it.setName(p.getName());
                        it.setSerialNo(p.getSerialNo());
                        it.setCategory_id(p.getCategory_id());
                        it.setPic_url(p.getPic_url() == null ? "" : p.getPic_url());
                        it.setPrice(p.getPrice());
                        it.setScore(p.getScore());
                        it.setCount(1000);
                        it.setShop_id(shop_id);
                        JSONObject ob = (JSONObject) JSON.toJSON(it);
                        System.out.println(ob.toJSONString());
                        itemDao.insert(SUtils.generTableName(shop_id), it);
                    } else {
                        m++;
                    }
                }
                System.out.println(n + "<>" + m);
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

    public static void readTxtFile(String filePath, ProductDAO pdDao, ItemsDAO itemDao) {
        InputStreamReader read = null;
        try {
            int m = 0;
            int k = 0;
            int n = 0;
            int g = 0;
            String encoding = "Unicode";
            File file = new File(filePath);
            if (file.isFile() && file.exists()) { //判断文件是否存在
                read = new InputStreamReader(new FileInputStream(file), encoding);//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = null;
                while ((lineTxt = bufferedReader.readLine()) != null) {
                    System.out.println(lineTxt);
                    String[] args = lineTxt.split("\t");
                    if (null != args && args.length < 3) {
                        System.out.println("drop " + lineTxt);
                        System.out.println(">>>:" + args.length);
                        return;
                    }
                    String serialNo = args[0].trim();
                    serialNo = upacage(serialNo);
                    String name = args[1].trim();
                    String price_str = args[2].trim();
                    int price = (int) (Float.valueOf(price_str) * 100);
                    Product p = pdDao.geProductsByserialNo(serialNo);

                    Item it = new Item();
                    it.setName(name);
                    it.setSerialNo("kr_" + serialNo);
                    it.setCount(1000);
                    it.setShop_id(shop_id);

                    if (p != null) {
                        System.out.println("数据库中有:" + ++m);
                        System.out.println(">>>:" + serialNo + ":" + name);

                        if (p.getCategory_id() == 15) {
                            continue;
                        }
                        if (p.getCategory_id() == 0) {
                            p.setCategory_id(28);
                        }

                        if (price == 0) {
                            price = p.getPrice();
                        }

                        it.setCategory_id(p.getCategory_id());
                        it.setPic_url(p.getPic_url() == null ? "" : p.getPic_url());
                        it.setPrice(price);
                        it.setScore(p.getScore());

                    } else {
                        System.out.println("数据库中没有:" + ++k);
                        System.out.println(">>>:" + serialNo + ":" + name);

                        it.setCategory_id(28);
                        it.setPic_url("");
                        it.setPrice(price);
                        it.setScore(0);

                    }

                    JSONObject ob = (JSONObject) JSON.toJSON(it);
                    System.out.println(ob.toJSONString());
                    itemDao.insert(SUtils.generTableName(shop_id), it);
                }

                System.out.println("数据库中 共有：" + m + ":" + k);
                System.out.println(n + "<>" + g);
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

    private static String upacage(String serialNo) {
        while (serialNo.startsWith("0")) {
            serialNo = serialNo.substring(1, serialNo.length());
        }
        return serialNo;
    }

}
