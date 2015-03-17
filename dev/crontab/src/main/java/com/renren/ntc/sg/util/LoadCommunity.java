package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Community;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.CommunityDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.io.*;


public class LoadCommunity {

    private static int shop_id = 10025;
    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        CommunityDAO itemDao = rose.getBean(CommunityDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        LoadCommunity addProduct = new LoadCommunity();
        String filePath = "F:\\community.txt";
        readTxtFile(filePath,itemDao);

    }


    public static void readTxtFile(String filePath,CommunityDAO cDao){
        InputStreamReader read = null;
        try {

            String encoding="gbk";
            File file=new File(filePath);
            if(file.isFile() && file.exists()){ //判断文件是否存在
                read = new InputStreamReader(
                        new FileInputStream(file),encoding);//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = null;
                while((lineTxt = bufferedReader.readLine()) != null){
                    String[] cc = lineTxt.split("\t");
                    Community c  = new Community();
                    c.setName(cc[0]);
                    c.setAddress(cc[10]+"_" + cc[1]);
                    c.setDistrict(cc[9]);
                    c.setCity(cc[8]);
                    c.setLat(Double.parseDouble(cc[5]));
                    c.setLng(Double.parseDouble(cc[4]));
                    if(null == cDao.getByName(c.getName())){
                        System.out.println((JSONObject)JSON.toJSON(c));
                        cDao.insert(c);
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