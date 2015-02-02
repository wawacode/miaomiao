package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.io.*;


public class AddProduct2Shop_GX_JP {

    private static int shop_id = 10027;
    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        AddProduct2Shop_GX_JP addProduct = new AddProduct2Shop_GX_JP();
        String filePath = "F:\\product\\gx_jp_2.txt";
        readTxtFile(filePath,pdDao,itemDao);

    }


    public static void readTxtFile(String filePath,ProductDAO pdDao,ItemsDAO itemDao){
        InputStreamReader read = null;
        try {

            String encoding="utf-8";
            File file=new File(filePath);
            if(file.isFile() && file.exists()){ //判断文件是否存在
                read = new InputStreamReader(
                        new FileInputStream(file),encoding);//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = null;
                while((lineTxt = bufferedReader.readLine()) != null){
                     String [] args = lineTxt.split("\t");
                     if (null != args && args.length < 5) {
                         System.out.println("drop " + lineTxt);
                                  continue;
                     }
                    String serialNo = args[2].trim();
                    serialNo = upacage(serialNo);
                    String name = args[0].trim();
                    String price_str = args[5].trim();
                    int price =(int)  (Float.valueOf(price_str)* 100);
                    Item item = itemDao.getItem(SUtils.generTableName(shop_id),serialNo);

                    if (item != null )  {
                        JSONObject ob = (JSONObject)JSON.toJSON(item);
                        System.out.println(ob.toJSONString());
                        itemDao.update(SUtils.generTableName(shop_id),item.getSerialNo(),"score" ,(long)item.getScore()+10) ;
                    }
                    else{
                        Item it=  new Item() ;
                        it.setName(name);
                        it.setScore(10);
                        it.setShop_id(shop_id);
                        it.setCategory_id(28);
                        it.setSerialNo(serialNo);
                        it.setCount(1000);
                        it.setPrice(price);
                        itemDao.insert(SUtils.generTableName(shop_id),it);
                    }
                }
            }else{
                System.out.println("找不到指定的文件");
            }

        } catch (Exception e) {
            System.out.println("读取文件内容出错");
            e.printStackTrace();
        }
        finally{
                if(null != read){
                    try {
                        read.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
        }

    }

    private static String upacage(String serialNo) {
        while (serialNo.startsWith("0")){
            serialNo = serialNo.substring(1,serialNo.length());
        }
        return serialNo;
    }


}