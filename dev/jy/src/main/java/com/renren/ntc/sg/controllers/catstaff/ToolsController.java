package com.renren.ntc.sg.controllers.catstaff;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.UUID;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.constant.CatstaffConstant;
import com.renren.ntc.sg.util.FileUploadUtils;
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
	
	@Get("")
	@Post("")
	public String index(Invocation inv) {
		System.out.println("tools index method");
		return "/views/catstaff/upload.vm";
	}
	/**
	 * 上传文件
	 * @param inv
	 * @param shop_id
	 * @param file
	 * @return
	 */
	@Get("uploadFile")
	@Post("uploadFile")
	public String uploadFile(Invocation inv, @Param("shop_id") long shop_id, @Param("file") MultipartFile file) {
		System.out.println("tools uploadFile method");
		if(null == file){
			return "@ File can't be empty!";
		}
		String type = file.getContentType();
		if(!"text/plain".equals(type)){
			return "@文件格式有误!";
		}
		String fileName = getUUIDFileName(shop_id, file.getOriginalFilename());
    	String savePath = inv.getServletContext().getRealPath("/") + CatstaffConstant.SAVE_UPLOAD_FILE_PATH;// 文件保存路径
		File f = FileUploadUtils.uploadFile2(file, fileName, savePath);
		if(null == f){
			return "@文件上传失败!";
    	}
		//删除初始商品
		itemDao.del(SUtils.generTableName(shop_id), shop_id);
		//读取文件
		boolean result = readFileAndSaveData(f, shop_id);
		if(!result){
			return "@内容格式错误!";
		}
		return "@上传成功!";
	}
	/**
	 * 读取文件并保存数据到库
	 * @param f
	 * @return
	 */
	private boolean readFileAndSaveData(File f, long shop_id) {
		System.out.println("tools readFileAndSaveData method");
		boolean flag = false;
		BufferedReader br = null;
    	String encoding = "UTF-8";
    	try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(f), encoding));
			String lineTxt = null;
			int count = 0;
            while ((lineTxt = br.readLine()) != null) {
            	if(StringUtils.isBlank(lineTxt)){
            		continue;
            	}
            	if(lineTxt.contains(",")){
            		String[] arr = getValiValue(lineTxt.split(","));//获取有效值
	            	if(!StringUtils.isBlank(arr[0])){
	            		saveData(shop_id, arr[0], Integer.valueOf(arr[1]));
	            		count++;
	            	}
	            	continue;
            	} else if(lineTxt.contains("\t")){
            		String[] arr = getValiValue(lineTxt.split("\t"));//获取有效值
	            	if(!StringUtils.isBlank(arr[0])){
	            		saveData(shop_id, arr[0], Integer.valueOf(arr[1]));
	            		count++;
	            	}
	            	continue;
            	}else{
            		String serialNo = upacage(lineTxt.trim());
	            	System.out.println("条码:"+ serialNo + "\t价格:" + 0);
	            	if(!StringUtils.isBlank(serialNo)){
	            		saveData(shop_id, serialNo, 0);
	            		count++;
	            	}
            	}
            }
            System.out.println("总计: " + count);
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
		it.setName(p == null ? "待编辑" : p.getName());
		it.setPrice(price);
		it.setCount(1000);
		it.setCategory_id(p == null ? 28 : p.getCategory_id() == 15 ? 15 : 28);//不是哈哈镜 其他分类
		it.setPic_url(p == null ? "" : p.getPic_url() == null ? "" : p.getPic_url());
		it.setScore(p == null ? 0 : p.getScore());
		JSONObject ob = (JSONObject) JSON.toJSON(it);
		System.out.println(ob.toJSONString());
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
