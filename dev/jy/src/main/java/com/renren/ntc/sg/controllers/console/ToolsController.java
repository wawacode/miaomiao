package com.renren.ntc.sg.controllers.console;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
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
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Category;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.CategoryDAO;
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
	
	@Autowired
	CategoryDAO categoryDAO;
	
	@Get("")
	@Post("")
	public String index(Invocation inv) {
		List<Shop> list = shopDAO.getAllShopsByNotOnline();
		inv.addModel("list", list);
		List<Category> categoryList =  categoryDAO.getCategory();
		inv.addModel("categoryList", categoryList);
		return "tools";
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
		if (!MimeTypeUtils.TEXT_PLAIN.equals(file.getContentType())) {
			return "@文件类型有误! 只支持.txt类型文件!";
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
		BufferedReader br = null;
		Map<Integer,Integer>  saveCategoryNum = new HashMap<Integer, Integer>();//每个分类导入多少商品
		List<String> missingList = new ArrayList<String>();//丢弃多少项目的统计
		try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(f), "GBK"));
			String lineTxt = br.readLine();
			String regex = lineTxt.contains("\t") ? "\t" : lineTxt.contains(",") ? ", ": " ";
			int count = 0;
			do {
				if(!StringUtils.isBlank(lineTxt)){
					System.out.println(count);
					count++;//总计
					String[] arr = lineTxt.split(regex);
					String serialNo = arr[0].trim();
					if (serialNo.length() > 24) {
						missingList.add(serialNo);
						continue;
					}
					Product p = pDao.geProduct(serialNo);
					Item it = new Item();
					it.setShop_id(shop_id);
					it.setSerialNo(serialNo);
					it.setName(p == null ? serialNo : p.getName());
					it.setPrice(p == null ? 0 : arr.length == 2 ? Integer.valueOf(arr[1]) : p.getPrice());
					it.setCount(1000);
					int category_id = p == null ? 28 : p.getCategory_id();
					it.setCategory_id(category_id);
					it.setPic_url(p == null ? "" : p.getPic_url() == null ? "" : p.getPic_url());
					it.setScore(p == null ? 0 : p.getScore());
					
					LoggerUtils.getInstance().log("条形码:\t"+serialNo+" 产品名称:\t"+it.getName()+"\t价格:\t"+it.getPrice());
					itemDao.insert(SUtils.generTableName(shop_id), it);
					saveCategoryNum.put(category_id, saveCategoryNum.get(category_id) == null? 1 : saveCategoryNum.get(category_id) + 1);
				} 
			} while ((lineTxt = br.readLine()) != null);
			//遍历map集合  替换分类为中文名字
			Map<String, Integer>  saveCategoryNumCN = new HashMap<String, Integer>();//每个分类导入多少商品
			for (Map.Entry<Integer,Integer> entry : saveCategoryNum.entrySet()) {
				Category category =  categoryDAO.getCategory(entry.getKey());
				if(null != category)
				    saveCategoryNumCN.put(category.getName(), entry.getValue());
				else
					saveCategoryNumCN.put("没有分类", saveCategoryNumCN.get("没有分类") == null ? entry.getValue() :saveCategoryNumCN.get("没有分类") + entry.getValue());
			}
			inv.addModel("saveCategoryNumCN", saveCategoryNumCN); //成功
			inv.addModel("missingList", missingList); //丢失
			inv.addModel("count", count); //总数
			inv.addModel("successNum", count - missingList.size()); //总数
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				if(null != br){
					br.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
//		if (MimeTypeUtils.APPLICATION_EXCEL_2003_2007.equals(contentType)) {
//			boolean result = readXLS(f, shop_id);
//			if(!result){
//				return "@内容格式错误!";
//			}
//		}
//		if (MimeTypeUtils.APPLICATION_EXCEL_2010_2013.equals(contentType)) {
//			boolean result = readXLSX(f, shop_id);
//			if(!result){
//				return "@内容格式错误!";
//			}
//		}
		LoggerUtils.getInstance().log(" OK!");
		return "toolsDetail";
	}
	
	/**'
	 * 1.同步A店某一个分类到B店
	 * http://127.0.0.1:8080/catstaff/tools/mvShopItems?from_shop_id=1&category_id=15&to_shop_id=10083
	 * @param inv
	 * @param from_shop_id
	 * @param category_id
	 * @param to_shop_id
	 * @return
	 */
	@Get("mvShopItems")
	@Post("mvShopItems")
	public String mvCategory(Invocation inv, @Param("from_shop_id") long from_shop_id, @Param("category_id") int category_id, @Param("to_shop_id") long to_shop_id){
		int offset = 100;//每次查100条 如果够
	    for (int i = 0; i < 100000;) {
            System.out.println("get " + i + " " + offset);
            List<Item> itemls = itemDao.getItems(SUtils.generTableName(from_shop_id), from_shop_id, category_id, i, offset);
            if (itemls.size() == 0) {
                break;
            }
            for (Item item : itemls) {
                item.setShop_id(to_shop_id);
                item.setCount(1000);
                try {
                    Item ii = itemDao.getItem(SUtils.generTableName(to_shop_id), to_shop_id, item.getSerialNo());
                    if (null == ii) {
                        System.out.println("insert " + ">" + i + "<" + item.getSerialNo());
                        itemDao.insert(SUtils.generTableName(to_shop_id), item);
                    } else {
                        System.out.println("update" + item.getSerialNo() + " " + item.getId());
                        itemDao.updateforSerialNo(SUtils.generTableName(to_shop_id), item, item.getSerialNo());
                    }
                } catch (IncorrectResultSizeDataAccessException e) {
                    itemDao.del(SUtils.generTableName(to_shop_id), to_shop_id, item.getSerialNo());
                    itemDao.insert(SUtils.generTableName(to_shop_id), item);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            i = i + offset;
	    }
		return "@同步成功!";
	}
	
	/**
	 * 2.同步A店商品到主库
	 * @param inv
	 * @return
	 */
	@Get("refresh2Produdce")
	@Post("refresh2Produdce")
	public String refresh2Produdce(Invocation inv, @Param("shop_id") long shop_id) {
	    int offset = 1000;
        for (int i = 0; i < 100000;) {
            List<Item> itemls = itemDao.getItems(SUtils.generTableName(shop_id), shop_id, i, offset);
            if (itemls.size() == 0) {
                break;
            }
	        for (Item item : itemls) {
	            Product p = new Product();
	            p.setCategory_id(item.getCategory_id());
	            p.setScore(item.getScore());
	            p.setPic_url(item.getPic_url());
	            p.setPrice(item.getPrice());
	            p.setName(item.getName());
	            p.setSerialNo(item.getSerialNo());
	            Product pp = pDao.geProductsByserialNo(p.getSerialNo());
	            if (pp != null) {
	            	continue;
	            }
	            System.out.println("insert into " + p.getSerialNo());
	        	pDao.insert(p);
	        }
	        i = i + offset;
        }
		return "@同步完成!";
	}

	@Get("getCategoriesByShopId")
	@Post("getCategoriesByShopId")
	public String getCategoriesByShopId(Invocation inv, @Param("shop_id") long shop_id) {
		List<Item> shopCategoryList = itemDao.getCategoriesByShopId(SUtils.generTableName(shop_id));
		List<JSONObject> list = new ArrayList<JSONObject>();
		for (Item item : shopCategoryList) {
			Category category = categoryDAO.getCategory(item.getCategory_id());
			if (null != category) {
				JSONObject jo = new JSONObject();
				jo.put("id", item.getCategory_id());
				jo.put("name", category.getName());
				list.add(jo);
			}
		}
		return "@json:" + JSON.toJSONString(list);
	}
	/**2010-2013Excel*/
	@SuppressWarnings("unused")
	private boolean readXLSX(File file, long shop_id) {
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
	@SuppressWarnings({ "unused", "resource" })
	private boolean readXLS(File file, long shop_id) {
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
		it.setPrice(price == 0? p.getPrice() : price);
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
	@SuppressWarnings("unused")
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
	@SuppressWarnings("unused")
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
	
}
