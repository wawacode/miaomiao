package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;


public class  ReadExcel6 {
    HSSFWorkbook xwb;

    public ReadExcel6() throws IOException {
//        xwb = new XSSFWorkbook("E:\\products.xls");
        InputStream is = new FileInputStream( "E:\\products.xls");
        xwb = new HSSFWorkbook( is);

    }

    public HSSFSheet get(int i) {
        return xwb.getSheetAt(i);
    }


    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        // 读取第一章表格内容
        ReadExcel6 xwb = new ReadExcel6();
        for (int k = 0; k < 1; k++) {
            HSSFSheet sheet = xwb.get(k);
            HSSFRow row;
            String cell;
            for (int i = sheet.getFirstRowNum(); i < sheet.getPhysicalNumberOfRows(); i++) {
                row = sheet.getRow(i);
                Product it = new Product();
                for (int j = row.getFirstCellNum(); j < row.getPhysicalNumberOfCells(); j++) {
                    cell = row.getCell(j).toString().trim();
                    if( j == 0 ){
                        cell = cell.trim();
                        it.setSerialNo(cell);
                    }
                }
                if ( !StringUtils.isEmpty(it.getSerialNo())) {
                    String serialNo = it.getSerialNo();
                    Product product = pdDao.geProductsByserialNo(serialNo) ;
                    if (null == product){
                        continue;
                    }
                    itemDao.updateNameforSerialNo(SUtils.generTableName(1),product.getName(), it.getSerialNo());
                }
            }
        }
    }

    private static int toPrice(String cell) {
        Float r = Float.valueOf(cell);
        return (int) (r * 100);
    }


}