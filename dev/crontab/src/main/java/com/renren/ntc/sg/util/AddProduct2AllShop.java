package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * 把多家未发布的店 都导到一个总店中 并建店  在product表中有的就取出来插入新的店，没有就插入一个serialno到新店
 * @author chunhai.li
 *
 */
public class AddProduct2AllShop {

    private static int shop_id = 10074;
    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        AddProduct2AllShop addProduct = new AddProduct2AllShop();
        String filePath = "C:\\Users\\chunhai.li\\Downloads\\all_1.txt";
        readTxtFile(filePath,pdDao,itemDao);

    }


    public static void readTxtFile(String filePath,ProductDAO pdDao,ItemsDAO itemDao){
    	//itemDao.del(SUtils.generTableName(shop_id), shop_id);
    	Map<String, String> map = new HashMap<String, String>();
        InputStreamReader read = null;
        try {
            String encoding="GBK";
            File file=new File(filePath);
            if(file.isFile() && file.exists()){ //判断文件是否存在
                read = new InputStreamReader(
                        new FileInputStream(file),encoding);//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = null;
                int k = 0;
                while((lineTxt = bufferedReader.readLine()) != null){
                	k++;
                	if(k%200==0){
                		try {
							Thread.sleep(200);
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
                	}
                     String [] args = lineTxt.split("\t");
                     if (null != args && args.length < 1) {
                         System.out.println("drop " + lineTxt);
                                 continue;

                     }
                    String serialNo = args[0].trim();
                    serialNo = upacage(serialNo);
                    if(StringUtils.isBlank(serialNo)){
                    	System.out.println("serialNo is null");
                    	continue;
                    }
                    if(!NumberUtils.isNumber(serialNo)){
                    	System.out.println("serialNo is null number,serialNo="+serialNo);
                    	continue;
                    }
                    if(!map.containsKey(serialNo.trim())){
                    	map.put(serialNo.trim(), "0");
                    }else {
                    	System.out.println("map contain key="+serialNo.trim());
						continue;
					}
                    Product p = pdDao.geProductsByserialNo(serialNo);

                    if(StringUtils.isBlank(serialNo)){
                        continue;
                    }
                    if (p != null )  {
                        if (p.getCategory_id()==15){
                            continue;
                        }
                        if (p.getCategory_id()==0){
                            p.setCategory_id(28);
                        }
                        Item it =  new Item();
                        it.setName(p.getName());
                        it.setSerialNo(p.getSerialNo());
//                        if(StringUtils.isNotBlank(p.getName()) && StringUtils.isNotBlank(p.getSerialNo())){
//                        	 if(p.getName().equals(p.getSerialNo())){
//                             	it.setName(map.get(p.getSerialNo()));
//                             }
//                        }
                        it.setCategory_id(p.getCategory_id());
                        it.setPic_url(p.getPic_url()== null ? "":p.getPic_url());
                        it.setPrice(p.getPrice());
                        it.setScore(p.getScore());
                        it.setCount(1000);
                        it.setShop_id(shop_id);
                        JSONObject ob = (JSONObject)JSON.toJSON(it);
                        System.out.println(ob.toJSONString());
                        itemDao.insert(SUtils.generTableName(shop_id),it) ;
                    }else {
                    	Item it =  new Item();
                        it.setSerialNo(serialNo);
                        it.setName("");
                        it.setPic_url("");
                        it.setCategory_id(28);
                        it.setShop_id(shop_id);
                        //it.set
                    	try {
							itemDao.insert(SUtils.generTableName(shop_id),it) ;
						} catch (Exception e) {
							e.printStackTrace();
						}
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