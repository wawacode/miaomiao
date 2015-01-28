package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;



public class ReadExcel {
//    XSSFWorkbook xwb;
//
//    public ReadExcel() throws IOException {
//        xwb = new XSSFWorkbook("E:\\lelin.xlsx");
//    }
//
//    public XSSFSheet get() {
//        return xwb.getSheetAt(0);
//    }
//
//    public static void main(String[] args) throws IOException {
//        RoseAppContext rose = new RoseAppContext();
//        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
//        // 读取第一章表格内容
//        ReadExcel xwb = new ReadExcel();
//        XSSFSheet sheet = xwb.get();
//        // 定义 row、cell
//        XSSFRow row;
//        String cell;
//
//
//        for (int i = sheet.getFirstRowNum(); i < sheet.getPhysicalNumberOfRows(); i++) {
//            if (i == 0){
//                continue;
//            }
//            row = sheet.getRow(i);
//            Item it  = new Item() ;
//            long  shop_id = 1;
//            it.setShop_id(shop_id);
//            it.setCategory_id(22);
//            for (int j = row.getFirstCellNum(); j < row.getPhysicalNumberOfCells(); j++) {
//                // 通过 row.getCell(j).toString() 获取单元格内容，
//                cell = row.getCell(j).toString().trim();
//                System.out.print(cell + "-" );
//                if(j == 2){
//
//                   it.setSerialNo(cell);
//                }
//                if(j == 3){
//                    if (StringUtils.isEmpty(cell)) {
//                        break;
//                    }
//                    it.setName(cell);
//                }
//                if(j == 5){
//                    it.setPrice(toPrice(cell));
//                }
//                if(j == 6){
//                    it.setPrice_new(toPrice(cell));
//                }
//
//            }
//            System.out.println("");
//            if (!StringUtils.isEmpty(it.getName()) && !StringUtils.isEmpty(it.getSerialNo()) ) {
//                itemDao.insert(SUtils.generTableName(shop_id) ,it);
//            }
//        }
//    }
//
//
//    private static int toPrice(String cell) {
//        Float r = Float.valueOf(cell);
//        return (int)(r*100);
//    }
//    XSSFWorkbook xwb;
//
//    public ReadExcel() throws IOException {
//        xwb = new XSSFWorkbook("E:\\lelin.xlsx");
//    }
//
//    public XSSFSheet get(int i) {
//        return xwb.getSheetAt(i);
//    }
//
//    public static void main(String[] args) throws IOException {
//        RoseAppContext rose = new RoseAppContext();
//        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
//        // 读取第一章表格内容
//        ReadExcel xwb = new ReadExcel();
//        HashMap<Integer,Integer> map = new HashMap<Integer,Integer>();
//        map.put(0,22);
//        map.put(1,18);
//        map.put(2,16);
//        map.put(3,16);
//        map.put(4,19);
//        map.put(5,20);
//        map.put(6,24);
//        map.put(7,25);
//        map.put(8,28);
//        map.put(9,0);
//        map.put(10,23)   ;
//        map.put(11,16);
//        map.put(12,0);
//        map.put(13,22);
//        map.put(14,17);
//        map.put(15,22);
//        map.put(16,28);
//        map.put(17,28);
//        map.put(18,26);
//        map.put(19,0);
//        map.put(20,0);
//        map.put(21,0);
//        map.put(22,0);
//        map.put(23,15);
//        for (int k =0 ; k < 24 ; k ++){
//        XSSFSheet sheet = xwb.get(k);
//        // 定义 row、cell
//        XSSFRow row;
//        String cell;
//
//
//        for (int i = sheet.getFirstRowNum(); i < sheet.getPhysicalNumberOfRows(); i++) {
//            if (i == 0){
//                continue;
//            }
//            row = sheet.getRow(i);
//            Item it  = new Item() ;
//            long  shop_id = 1;
//            it.setShop_id(shop_id);
//            it.setCategory_id(map.get((Integer)k));
//            for (int j = row.getFirstCellNum(); j < row.getPhysicalNumberOfCells(); j++) {
//                // 通过 row.getCell(j).toString() 获取单元格内容，
//                cell = row.getCell(j).toString().trim();
//                System.out.print(cell + "-" );
//                if(j == 2){
//
//                   it.setSerialNo(cell);
//                }
//                if(j == 3){
//                    if (StringUtils.isEmpty(cell)) {
//                        break;
//                    }
//                    it.setName(cell);
//                }
//                if(j == 5){
//                    it.setPrice(toPrice(cell));
//                }
//                if(j == 6){
//                    it.setPrice_new(toPrice(cell));
//                }
//
//            }
//            System.out.println("");
//            if (!StringUtils.isEmpty(it.getName()) && !StringUtils.isEmpty(it.getSerialNo()) ) {
//                itemDao.insert(SUtils.generTableName(shop_id) ,it);
//            }
//         }
//        }
//    }
//
//
//    private static int toPrice(String cell) {
//        Float r = Float.valueOf(cell);
//        return (int)(r*100);
//    }

    XSSFWorkbook xwb;

    public ReadExcel() throws IOException {
        xwb = new XSSFWorkbook("E:\\lelin.xls");
    }

    public XSSFSheet get(int i) {
        return xwb.getSheetAt(i);
    }

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        // 读取第一章表格内容
        ReadExcel xwb = new ReadExcel();
        HashMap<Integer,Integer> map = new HashMap<Integer,Integer>();
        map.put(0,22);
        map.put(1,18);
        map.put(2,16);
        map.put(3,16);
        map.put(4,19);
        map.put(5,20);
        map.put(6,24);
        map.put(7,25);
        map.put(8,28);
        map.put(9,0);
        map.put(10,23)   ;
        map.put(11,16);
        map.put(12,0);
        map.put(13,22);
        map.put(14,17);
        map.put(15,22);
        map.put(16,27);
        map.put(17,28);
        map.put(18,26);
        map.put(19,0);
        map.put(20,0);
        map.put(21,0);
        map.put(22,0);
        map.put(23,15);
        for (int k =0 ; k < 24 ; k ++){
        XSSFSheet sheet = xwb.get(k);
        // 定义 row、cell
        XSSFRow row;
        String cell;


        for (int i = sheet.getFirstRowNum(); i < sheet.getPhysicalNumberOfRows(); i++) {
            if (i == 0){
                continue;
            }
            row = sheet.getRow(i);
            Item it  = new Item() ;
            long  shop_id = 1;
            it.setShop_id(shop_id);
            it.setCategory_id(map.get((Integer)k));
            for (int j = row.getFirstCellNum(); j < row.getPhysicalNumberOfCells(); j++) {
                // 通过 row.getCell(j).toString() 获取单元格内容，
                try{
                cell = row.getCell(j).toString().trim();
                }catch(Exception e){
                                    e.printStackTrace();
                    break;
                }
                 System.out.print(cell + "-" );
                if(j == 2){
//                    int flag = cell.indexOf("E");
//                    if ( -1 != flag) {
//                      cell = cell.substring(0,flag);
//                      cell =  cell.replace(".","");
//                    }
                    cell = cell.trim();
                   it.setSerialNo(cell);
                }
                if(j == 3){
                    if (StringUtils.isEmpty(cell)) {
                        break;
                    }
                    it.setName(cell);
                }
                if(j == 6){
                    it.setPrice(toPrice(cell));
                }
                if(j == 5){
                    it.setPrice_new(toPrice(cell));
                }

            }
            System.out.println("");
            if (!StringUtils.isEmpty(it.getName()) && !StringUtils.isEmpty(it.getSerialNo()) ) {
                itemDao.insert(SUtils.generTableName(shop_id) ,it);
            }
         }
        }
    }


    private static int toPrice(String cell) {
        Float r = Float.valueOf(cell);
        return (int)(r*100);
    }
}