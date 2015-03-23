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

public class AddProduct2Shop_Axsjhlcs {

    private static int shop_id = 10059;

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        AddProduct2Shop_Axsjhlcs addProduct = new AddProduct2Shop_Axsjhlcs();
        String filePath = "F:\\product\\20150323\\鑫世纪华联超市.txt";
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
                while ((lineTxt = bufferedReader.readLine()) != null) {
                    String[] args = lineTxt.split(",");
                    if (null != args && args.length < 2) {
                        System.out.println("drop " + lineTxt);
                        return;

                    }
                    String serialNo = args[0].trim();
                    System.out.println("serialNo " + serialNo);
                    serialNo = upacage(serialNo);
                    String price_str = args[1].trim();
                    System.out.println("price " + price_str);
                    int price = Integer.valueOf(price_str);
                    Product p = pdDao.geProductsByserialNo(serialNo);

                    if (StringUtils.isBlank(serialNo)) {
                        continue;
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
                        it.setPrice(price);
                        it.setScore(p.getScore());
                        it.setCount(1000);
                        it.setShop_id(shop_id);
                        JSONObject ob = (JSONObject) JSON.toJSON(it);
                        System.out.println(ob.toJSONString());
                        //                        itemDao.insert(SUtils.generTableName(shop_id),it) ;
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

    private static String upacage(String serialNo) {
        while (serialNo.startsWith("0")) {
            serialNo = serialNo.substring(1, serialNo.length());
        }
        return serialNo;
    }

}
