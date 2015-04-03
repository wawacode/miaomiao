package com.renren.ntc.sg.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import net.paoding.rose.scanning.context.RoseAppContext;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;

public class AddProduct2Shop_A108bld {

   private static int shop_id = 10058;

    private static int to_shop_id = 10068;

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        String filePath = args[0];//"C:\\shop\\108zyc.txt";
        String formShopId = args[1];
        String toShopId =args[2];
        shop_id = Integer.parseInt(formShopId);
        to_shop_id = Integer.parseInt(toShopId);
        readTxtFile(filePath, pdDao, itemDao);

    }

    public static void readTxtFile(String filePath, ProductDAO pdDao, ItemsDAO itemDao) {
        InputStreamReader read = null;

        int n = 0;
        int m = 0;
        int l = 0;

        try {
            String encoding = "utf-8";
            File file = new File(filePath);
            if (file.isFile() && file.exists()) { //判断文件是否存在
                read = new InputStreamReader(new FileInputStream(file), encoding);//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = null;
                while ((lineTxt = bufferedReader.readLine()) != null) {
                    String serialNo = lineTxt.trim();
                    System.out.println("serialNo " + serialNo);
                    serialNo = upacage(serialNo);

                    Item iteminfo = itemDao.getItem(SUtils.generTableName(shop_id), serialNo, shop_id);

                    if (iteminfo != null) {
                    	iteminfo.setShop_id(to_shop_id);
                        JSONObject ob = (JSONObject) JSON.toJSON(iteminfo);
                        System.out.println("商店有：" + ++n + "<>" + ob.toJSONString());
                        itemDao.insert(SUtils.generTableName(to_shop_id), iteminfo);
                    } else {
                        Product p = pdDao.geProductsByserialNo(serialNo);
                        if (p != null) {

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

                            if (p.getPic_url() == null || "".equals(p.getPic_url()) || p.getPrice() == 0) {
                                it.setCount(0);
                            }

                            it.setShop_id(to_shop_id);
                            JSONObject ob = (JSONObject) JSON.toJSON(it);
                            System.out.println("库里有：" + ++m + "<>" + ob.toJSONString());
                            itemDao.insert(SUtils.generTableName(to_shop_id), it);
                        } else {
                            Item it = new Item();
                            it.setName(serialNo);
                            it.setSerialNo(serialNo);
                            it.setCategory_id(28);
                            it.setPic_url("");
                            it.setPrice(0);
                            it.setScore(0);
                            it.setCount(0);
                            it.setShop_id(to_shop_id);
                            JSONObject ob = (JSONObject) JSON.toJSON(it);
                            System.out.println("都没有：" + ++l + "<>" + ob.toJSONString());
                            itemDao.insert(SUtils.generTableName(to_shop_id), it);
                        }
                    }
                    System.out.println(n + "<>" + m + "<>" + l);
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

    private static String upacage(String serialNo) {
        while (serialNo.startsWith("0")) {
            serialNo = serialNo.substring(1, serialNo.length());
        }
        return serialNo;
    }

}
