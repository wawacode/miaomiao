package com.renren.ntc.sg.controllers.catstaff;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.UUID;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.CatstaffConstant;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.FileUploadUtils;
import com.renren.ntc.sg.util.MimeTypeUtils;
import com.renren.ntc.sg.util.SUtils;
/**
 * 地推人员工具
 * @author zhaoxiufei
 *
 */
@Path("tools")
public class ToolsController {

	@Autowired
	ProductDAO pDao;
	
	@Autowired
	ItemsDAO itemDao;
	
	@Autowired
	ShopDAO shopDAO;
	
	@Get("")
	@Post("")
	public String index(Invocation inv) {
		List<Shop> list = shopDAO.getAllShopsByNotOnline();
		inv.addModel("list", list);
		return "/views/catstaff/upload";
	}
	/**
	 * 上传文件 并将文件条码商品入库
	 * @param inv
	 * @param shop_id
	 * @param file
	 * @return
	 */
	@Get("uploadFile")
	@Post("uploadFile")
	public String uploadFile(Invocation inv, @Param("shop_id") long shop_id, @Param("file") MultipartFile file) {
		if(null == file){
			return "@ 文件不能为空!";
		}
		String contentType = file.getContentType();
		boolean b = valiContentType(contentType);
		if (!b) {
			return "@文件类型有误! 支持.txt,.xls,.xlsx 类型文件!";
		}
		String fileName = getUUIDFileName(shop_id, file.getOriginalFilename());
    	String savePath = inv.getServletContext().getRealPath("/") + CatstaffConstant.SAVE_UPLOAD_FILE_PATH;// 文件保存路径
		File f = FileUploadUtils.uploadFile2(file, fileName, savePath);
		if(null == f){
			return "@文件上传失败!";
    	}
		//删除初始商品
		itemDao.del(SUtils.generTableName(shop_id), shop_id);
		//保存数据到数据库
		if(MimeTypeUtils.TEXT_PLAIN.equals(contentType)){
			boolean result = readFileAndSaveData(f, shop_id);
			if(!result){
				return "@内容格式错误!";
			}
		}
		if (MimeTypeUtils.APPLICATION_EXCEL_2003_2007.equals(contentType)) {
			boolean result = readXLS(f, shop_id);
			if(!result){
				return "@内容格式错误!";
			}
		}
		if (MimeTypeUtils.APPLICATION_EXCEL_2010_2013.equals(contentType)) {
			boolean result = readXLSX(f, shop_id);
			if(!result){
				return "@内容格式错误!";
			}
		}
		LoggerUtils.getInstance().log(" OK!");
		return "@文件上传成功,数据已导入!";
	}
	/**
	 * 读取文件并保存数据到库
	 * @param f
	 * @return
	 */
	private boolean readFileAndSaveData(File f, long shop_id) {
		boolean flag = false;
		BufferedReader br = null;
    	String encoding = "UTF-8";
    	try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(f), encoding));
			String lineTxt = null;
            while ((lineTxt = br.readLine()) != null) {
            	if(StringUtils.isBlank(lineTxt)){
            		continue;
            	}
            	if(lineTxt.contains(",")){
            		String[] arr = getValiValue(lineTxt.split(","));//获取有效值
	            	if(!StringUtils.isBlank(arr[0])){
	            		saveData(shop_id, arr[0], Integer.valueOf(arr[1]));
	            	}
	            	continue;
            	} else if(lineTxt.contains("\t")){
            		String[] arr = getValiValue(lineTxt.split("\t"));//获取有效值
	            	if(!StringUtils.isBlank(arr[0])){
	            		saveData(shop_id, arr[0], Integer.valueOf(arr[1]));
	            	}
	            	continue;
            	}else{
            		String serialNo = upacage(lineTxt.trim());
            		
	            	if(!StringUtils.isBlank(serialNo)){
	            		saveData(shop_id, serialNo, 0);
	            	}
            	}
            }
            flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			try {
				if(null != br){
					br.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return flag;
	}
	/**2010-2013Excel*/
	public boolean readXLSX(File file, long shop_id) {
		boolean flag = false;
		XSSFWorkbook xssfWorkbook = null;
		try {
			xssfWorkbook = new XSSFWorkbook(file);
			XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);
			int firstRowIndex = xssfSheet.getFirstRowNum();// 第一行
			int lastRowIndex = xssfSheet.getLastRowNum();// 最后一行
			for (int rIndex = firstRowIndex; rIndex <= lastRowIndex; rIndex++) {// 遍历第一个有效行和最后一行之间的值
				XSSFRow xssfRow = xssfSheet.getRow(rIndex);// 获取一行
				if (null != xssfRow) {
					XSSFCell serialNoCell = xssfRow.getCell(0);// 获取一个单元格
					XSSFCell priceCell = xssfRow.getCell(1);// 获取第2个单元格
					if (null != serialNoCell) {
						int price = 0;
						if (null != priceCell) {
							price = Integer.valueOf(priceCell.toString());
						}
						String serialNo = upacage(serialNoCell.toString().trim());
						if (serialNo.toString().length() <= 24) {
							saveData(shop_id, serialNo, price);
						}
					}
				}
			}
			flag = true;
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
		return flag;
	}
	/**2003-2007 Excel*/
	public boolean readXLS(File file, long shop_id) {
		boolean flag = false;
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			HSSFWorkbook wb = new HSSFWorkbook(fis);
			HSSFSheet sh = wb.getSheetAt(0);// 获取第一个工作空间
			for (int rIndex = sh.getFirstRowNum(); rIndex <= sh.getLastRowNum(); rIndex++) {// 遍历第一个有效行和最后一行之间的值
				HSSFRow row = sh.getRow(rIndex);// 获取一行
				if (row != null) {
					HSSFCell serialNoCell = row.getCell(0);// 获取第1个单元格
					HSSFCell priceCell = row.getCell(1);// 获取第2个单元格
					if (null != serialNoCell) {
						int price = 0;
						if (null != priceCell) {
							price = Integer.valueOf(priceCell.toString());
						}
						String serialNo = upacage(serialNoCell.toString().trim());
						if (serialNo.toString().length() <= 24) {// 跟数据库长度有关
							saveData(shop_id, serialNo, price);
						}
					}
				}
			}
			flag = true;
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
		return flag;
	}
	/**
	 * 保存数据到库
	 * @param serialNo
	 * @param price
	 */
	private void saveData(long shop_id, String serialNo, int price) {
		Product p = pDao.geProduct(serialNo);
		Item it = new Item();
		it.setShop_id(shop_id);
		it.setSerialNo(serialNo);
		it.setName(p == null ? shop_id + "" : p.getName());
		it.setPrice(price);
		it.setCount(1000);
		it.setCategory_id(p == null ? 28 : p.getCategory_id());
		it.setPic_url(p == null ? "" : p.getPic_url() == null ? "" : p.getPic_url());
		it.setScore(p == null ? 0 : p.getScore());
		LoggerUtils.getInstance().log(" 产品名称:\t"+it.getName()+"\t价格:\t"+it.getPrice());
		itemDao.insert(SUtils.generTableName(shop_id), it);
	}
	
	/**
	 * 获取UUID文件名
	 * @param originFileName
	 * @author zhiaoxiufei
	 * @return shop_id + "_" + fileName + UUID + suffix
	 */
	private String getUUIDFileName(long shop_id, String originFileName) {
		int index = originFileName.lastIndexOf(".");
		String fileName = originFileName.substring(0, index);
		String suffix = originFileName.substring(index,  originFileName.length());
		return fileName = shop_id + "_" + fileName + UUID.randomUUID().toString().replace("-", "") + suffix;
	}
	/**
	 * 返回有效数值 [0] 条码  [1]价格
	 * @param arr
	 * @return
	 */
	private String[] getValiValue(String[] arr){
		String[] tempArr = new String[2];
    	int temp = 0;	//只取前两个有效数据  第一个 为条码 第二个为价格
    	for (int i = 0; i < arr.length; i++) {
			if(!StringUtils.isBlank(arr[i]) && temp == 0){
				tempArr[0] =  upacage(arr[i].trim());//去除空白和开头的0
				temp = 1;
				continue;
			}
			if(!StringUtils.isBlank(arr[i]) && temp == 1){
				tempArr[1] = arr[i].trim();
				temp = 0;
				break;
			}
		}
		return tempArr;
	}
	/**
	 *上传支持的文件类型
	 * @param contentType
	 * @return
	 */
	private boolean valiContentType(String contentType){
		if(MimeTypeUtils.TEXT_PLAIN.equals(contentType)) 
			return true;
		if (MimeTypeUtils.APPLICATION_EXCEL_2003_2007.equals(contentType))
			return true;
		if (MimeTypeUtils.APPLICATION_EXCEL_2010_2013.equals(contentType))
			return true;
		return false;
	}
	/**
	 * 去掉开头的0
	 * @param serialNo
	 * @return
	 */
	private String upacage(String serialNo) {
	    while (serialNo.startsWith("0")) {
	         serialNo = serialNo.substring(1, serialNo.length());
	    }
	    return serialNo;
	 }
	//显示未上线的店
	
}
