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


public class ReadExcelpic2product {
    HSSFWorkbook xwb;

    public ReadExcelpic2product() throws IOException {
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
        ReadExcelpic2product xwb = new ReadExcelpic2product();
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
                    if( new File("d:\\webimg\\" + serialNo + ".jpg").exists()){
                        String url = "http://123.57.38.234/cat/images/"+ serialNo + ".jpg" ;
                        pdDao.update( url, it.getSerialNo());
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