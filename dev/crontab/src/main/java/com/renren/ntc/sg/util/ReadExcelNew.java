package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
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


public class ReadExcelNew {
    HSSFWorkbook xwb;

    public ReadExcelNew() throws IOException {
//        xwb = new XSSFWorkbook("E:\\products.xls");
        InputStream is = new FileInputStream("E:\\products.xls");
        xwb = new HSSFWorkbook(is);

    }

    public HSSFSheet get(int i) {
        return xwb.getSheetAt(i);
    }


    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        ReadExcelNew xwb = new ReadExcelNew();
        for (int k = 0; k < 1; k++) {

            HSSFSheet sheet = xwb.get(k);
            HSSFRow row;
            String cell;
            for (int i = sheet.getFirstRowNum(); i < sheet.getPhysicalNumberOfRows(); i++) {
                if (0 == i ){
                    continue ;
                }
                row = sheet.getRow(i);
                Product it = new Product();
                long shop_id = 1;
                for (int j = row.getFirstCellNum(); j < row.getPhysicalNumberOfCells(); j++) {
                    cell = row.getCell(j).toString().trim();
                    if (j == 0) {
                        cell = cell.trim();
                        it.setSerialNo(cell);
                    }
                    if (j == 1) {
                        cell = cell.trim();
                        it.setName(cell);
                    }
                    if (j == 4) {
                        cell = cell.trim();
                        it.setName(it.getName() + " " + cell);
                    }

//                    if (j == 5) {
//                        cell = cell.trim();
//                        it.setPic_url(cell);
//                    }
                }
                if (  !StringUtils.isEmpty(it.getSerialNo()) ) {
                      Item ii = itemDao.getItem(SUtils.generTableName(1),it.getSerialNo()) ;
                      if (ii == null){
                          continue;
                      }
                      it.setCategory_id(ii.getCategory_id());
                      pdDao.insert(it);
                } else {
                    System.out.println("drop " + i + " " + it.getPic_url() + "   " + it.getSerialNo());
                }
            }
        }
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