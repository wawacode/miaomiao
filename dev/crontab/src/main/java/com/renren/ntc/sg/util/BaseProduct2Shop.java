package com.renren.ntc.sg.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;

/**
 * shopid 
 * @author chunhai.li
 *
 */
public class BaseProduct2Shop {

    //private static int shop_id = 10074;
    private static Map<Long, String> SHOP_FILENAME_MAP = new HashMap<Long, String>();
    //private static String FILE_PRE = "d:\\product\\process\\txt\\";
    public static void main(String[] args) throws IOException {
    	String filePre = args[0];
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        BaseProduct2Shop addProduct = new BaseProduct2Shop();
        addProduct.getShopFileNameMap();
        //String filePath = "d:\\product\\leling1.txt";
        Iterator iterator = SHOP_FILENAME_MAP.keySet().iterator();
        while(iterator.hasNext()) {
        	long shopId = (Long)iterator.next();
        	String filePath = SHOP_FILENAME_MAP.get(shopId);
        	filePath = filePre + filePath;
            System.out.println("===========shopid="+shopId+",filePath="+filePath+"===============");
            readTxtFile(filePath,pdDao,itemDao,shopId);
        }
       

    }
    /**
     * 初始化 shopid 和 店铺商品文件名
     */
    private void getShopFileNameMap(){
    	SHOP_FILENAME_MAP.put(10067L, "2hao.txt");//108超市
    	SHOP_FILENAME_MAP.put(10069L, "fzy.txt");//方舟苑
    	SHOP_FILENAME_MAP.put(10070L, "xsj.txt");//鑫世纪
    	SHOP_FILENAME_MAP.put(10071L, "fnt.txt");//福奈特
    	SHOP_FILENAME_MAP.put(10072L, "望京西园二区商品.txt");
    	SHOP_FILENAME_MAP.put(10075L, "京诚超市.txt");//219便民超市
    	SHOP_FILENAME_MAP.put(10076L, "dxyxcbl.txt");//219便民超市
    	SHOP_FILENAME_MAP.put(10077L, "108.txt");//219便民超市
    	SHOP_FILENAME_MAP.put(10078L, "花家地超市.txt");//219便民超市
    	SHOP_FILENAME_MAP.put(10079L, "金隅丽港城超市.txt");//219便民超市
    	SHOP_FILENAME_MAP.put(10080L, "219.txt");//219便民超市
   	//SHOP_FILENAME_MAP.put(10070L, "xsj.txt");//219便民超市
//    	SHOP_FILENAME_MAP.put(10046L, "fnt.txt");//福奈特
//    	SHOP_FILENAME_MAP.put(10045L, "fzy.txt");//方舟苑
//    	SHOP_FILENAME_MAP.put(10043L, "dxyxcbl.txt");//大西洋新城便民店.txt
//    	SHOP_FILENAME_MAP.put(10057L, "108.txt");//108超市
//    	SHOP_FILENAME_MAP.put(10047L, "108.txt");//108超市
    }

    public static void readTxtFile(String filePath,ProductDAO pdDao,ItemsDAO itemDao,long shopId){
    	//Map<String, String> map = new HashMap<String, String>();
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
                	 System.out.println("lineTxt="+lineTxt);
                     String [] args = lineTxt.split("\t");
                     if(args == null || args.length<1){
                    	 System.out.println("arg is null or length 小于2");
                    	 continue;
                     }
                    String serialNo = args[0].trim();
                    if(StringUtils.isBlank(serialNo)){
                        continue;
                    }
                    serialNo = serialNo.trim();
                    serialNo = upacage(serialNo);
                    Product p = pdDao.geProductsByserialNo(serialNo);

                    
                    if (p != null )  {
                    	Item itemDb = null;
						try {
							itemDb = itemDao.getItem(SUtils.generTableName(shopId), serialNo, shopId);
						} catch (Exception e) {
							System.out.println("error items shopid="+shopId+",serialNo="+serialNo);
							e.printStackTrace();
							continue;
						}
                        if(itemDb != null){
                        	System.out.println("seralno is exist,seralno="+serialNo);
                        	continue;
                        }
                    	if (p.getCategory_id()==15){
                            continue;
                        }
                        if (p.getCategory_id()==0){
                            p.setCategory_id(28);
                        }
                        Item it =  new Item();
                        it.setName(p.getName());
                        it.setSerialNo(p.getSerialNo());
                        it.setCategory_id(p.getCategory_id());
                        it.setPic_url(p.getPic_url()== null ? "":p.getPic_url());
                        it.setScore(1000);
                        it.setShop_id(shopId);
                        JSONObject ob = (JSONObject)JSON.toJSON(it);
                        System.out.println(ob.toJSONString());
                        itemDao.insertBaseInfo(SUtils.generTableName(shopId),it) ;
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