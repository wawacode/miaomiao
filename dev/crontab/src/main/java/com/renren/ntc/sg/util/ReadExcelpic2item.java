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
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;


public class ReadExcelpic2item {
    XSSFWorkbook xwb;

    public ReadExcelpic2item() throws IOException {
//        xwb = new XSSFWorkbook("E:\\products.xls");
        xwb = new XSSFWorkbook("E:\\lelin.xls");

    }

    public XSSFSheet get(int i) {
        return xwb.getSheetAt(i);
    }


    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        ReadExcelpic2item xwb = new ReadExcelpic2item();
        for (int k = 0; k < 24; k++) {
            XSSFSheet sheet = xwb.get(k);
            XSSFRow row;
            String cell;
            for (int i = sheet.getFirstRowNum(); i < sheet.getPhysicalNumberOfRows(); i++) {
                row = sheet.getRow(i);
                Item it = new Item();
                for (int j = row.getFirstCellNum(); j < row.getPhysicalNumberOfCells(); j++) {
                    try{
                    cell = row.getCell(j).toString().trim();

                    if( j == 2 ){
                        cell = cell.trim();
                        it.setSerialNo(cell);
                    }
                    }catch(Exception e){
                        e.printStackTrace();
                        continue;
                    }
                }
                if ( !StringUtils.isEmpty(it.getSerialNo())) {
                    String serialNo = it.getSerialNo();
                    if( new File("d:\\webimg\\" + serialNo + ".jpg").exists()){
                        String url = "http://123.57.38.234/cat/images/"+ serialNo + ".jpg" ;
                        System.out.println(serialNo + " " + url );
                        itemDao.updateforSerialNo(SUtils.generTableName(1), url, it.getSerialNo());
                    }
                }
            }
        }
    }

    private static int toPrice(String cell) {
        Float r = Float.valueOf(cell);
        return (int) (r * 100);
    }


}