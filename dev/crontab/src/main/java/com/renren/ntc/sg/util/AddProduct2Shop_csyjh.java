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

public class AddProduct2Shop_csyjh {

    private static int shop_id = 10082;//1155

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        shop_id = Integer.valueOf(args[0]);
        // 读取第一章表格内容
        String filePath = "C:\\shop\\csyjh.txt";
        readTxtFile(filePath, pdDao, itemDao);

    }

    public static void readTxtFile(String filePath, ProductDAO pdDao, ItemsDAO itemDao) {
        InputStreamReader read = null;
        try {
            String encoding = "utf-8";
            File file = new File(filePath);
            if (file.isFile() && file.exists()) { //判断文件是否存在
                read = new InputStreamReader(new FileInputStream(file), encoding);//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = null;
                int k = 0;
                int n = 0;
                int m = 0;
                int l = 0;
                while ((lineTxt = bufferedReader.readLine()) != null) {

                    String serialNo = lineTxt.trim();
                    serialNo = upacage(serialNo);
                    System.out.println("serialNo " + serialNo);

                    Product p = pdDao.geProductsByserialNo(serialNo);

                    if (p == null) {
                        p = pdDao.geProductsByserialNo("kr_" + serialNo);
                        k++;
                        System.out.println("韩国：" + k);
                    }

                    if (p != null) {
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

                        if (p.getPrice() == 0 || p.getPic_url() == null || "".equals(p.getPic_url())) {
                            it.setCount(0);
                            l++;
                            System.out.println("库里0：" + l);
                        }

                        it.setShop_id(shop_id);
                        JSONObject ob = (JSONObject) JSON.toJSON(it);
                        System.out.println(ob.toJSONString());
                        itemDao.insert(SUtils.generTableName(shop_id), it);
                        n++;
                        System.out.println("库里：" + n);

                    } else {
                        Item it = new Item();
                        it.setName(serialNo);
                        it.setSerialNo(serialNo);
                        it.setCategory_id(28);
                        it.setPic_url("");
                        it.setPrice(0);
                        it.setScore(0);
                        it.setCount(0);
                        it.setShop_id(shop_id);
                        JSONObject ob = (JSONObject) JSON.toJSON(it);
                        System.out.println(ob.toJSONString());
                        itemDao.insert(SUtils.generTableName(shop_id), it);
                        m++;
                        System.out.println("库无:" + m);
                    }
                }
                System.out.println(k + "<>" + m + "<>" + n + "<>" + l);
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
