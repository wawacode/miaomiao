package com.renren.ntc.sg.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelUtils {
	
	public static final String OFFICE_EXCEL_2003_2007_POSTFIX = ".xls";
	public static final String OFFICE_EXCEL_2010_POSTFIX = ".xlsx";

//	public static void main(String[] args) {
//		//File file = new File( "D:\\Users\\Administrator\\Desktop\\test\\金兴超市商品信息.xls");
//		 File file = new File("D:\\Users\\Administrator\\Desktop\\test\\test.xlsx");
//		String filePath = file.getPath();
//		String fileSuffix = filePath.substring(filePath.lastIndexOf("."),
//				filePath.length());
//		Map<String, Integer> map = null;
//		if (OFFICE_EXCEL_2003_2007_POSTFIX.equals(fileSuffix)) {
//			map = readXLS2Map(file);
//		}
//		if (OFFICE_EXCEL_2010_POSTFIX.equals(fileSuffix)) {
//			map = readXLSX2Map(file);
//		}
//
//		for (Entry<String, Integer> entry : map.entrySet()) {
//			System.out.println("key= " + entry.getKey() + " and value= "
//					+ entry.getValue());
//		}
//	}

	/**
	 * key seriNo value price
	 * 
	 * @param file
	 * @return
	 */
	public static Map<String, Integer> readXLSX2Map(File file) {
		if (null == file) {
			return null;
		}
		Map<String, Integer> map = new HashMap<String, Integer>();
		XSSFWorkbook xssfWorkbook = null;
		try {
			xssfWorkbook = new XSSFWorkbook(file);
			XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);
			int firstRowIndex = xssfSheet.getFirstRowNum();// 第一行
			int lastRowIndex = xssfSheet.getLastRowNum();// 最后一行
			for (int rIndex = firstRowIndex; rIndex <= lastRowIndex; rIndex++) {// 遍历第一个有效行和最后一行之间的值
				XSSFRow xssfRow = xssfSheet.getRow(rIndex);// 获取一行
				if (null != xssfRow) {
					XSSFCell serialNo = xssfRow.getCell(0);// 获取一个单元格
					XSSFCell price = xssfRow.getCell(1);// 获取第2个单元格
					if (null != serialNo) {
						int pric = 0;
						if (null != price) {
							pric = Integer.valueOf(price.toString());
						}
						if (serialNo.toString().length() <= 24) {
							map.put(serialNo.toString(), pric);
						}
					}
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InvalidFormatException e) {
			e.printStackTrace();
		} finally {
			if (null != xssfWorkbook) {
				try {
					xssfWorkbook.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return map;
	}

	/**
	 * key seriNo value price
	 * 
	 * @param file
	 * @return
	 */
	@SuppressWarnings("resource")
	public static Map<String, Integer> readXLS2Map(File file) {
		if (null == file) {
			return null;
		}
		Map<String, Integer> map = new HashMap<String, Integer>();
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			HSSFWorkbook wb = new HSSFWorkbook(fis);
			HSSFSheet sh = wb.getSheetAt(0);// 获取第一个工作空间
			for (int rIndex = sh.getFirstRowNum(); rIndex <= sh.getLastRowNum(); rIndex++) {// 遍历第一个有效行和最后一行之间的值
				HSSFRow row = sh.getRow(rIndex);// 获取一行
				if (row != null) {
					HSSFCell serialNo = row.getCell(0);// 获取第1个单元格
					HSSFCell price = row.getCell(1);// 获取第2个单元格
					if (null != serialNo) {
						int pric = 0;
						if (null != price) {
							pric = Integer.valueOf(price.toString());
						}
						if (serialNo.toString().length() > 11 && serialNo.toString().length() < 15) {
							map.put(serialNo.toString(), pric);
						}
					}
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != fis) {
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return map;
	}
}