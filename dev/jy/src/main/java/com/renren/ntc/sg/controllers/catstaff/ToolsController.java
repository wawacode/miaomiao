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

import org.springframework.web.multipart.MultipartFile;

import com.renren.ntc.sg.constant.CatstaffConstant;
import com.renren.ntc.sg.util.FileUploadUtils;
/**
 * 地推人员工具
 * @author zhaoxiufei
 *
 */
@Path("tools")
public class ToolsController {
	
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
		if(!"text/plan".equals(file.getContentType())){
			return "@文件格式有误!";
		}
		String fileName = getUUIDFileName(shop_id, file.getOriginalFilename());
    	String savePath = inv.getServletContext().getRealPath("/") + CatstaffConstant.SAVE_UPLOAD_FILE_PATH;// 文件保存路径
		File f = FileUploadUtils.uploadFile2(file, fileName, savePath);
		if(null == f){
			return "@文件上传失败!";
    	}
		boolean result = readFile(f);
		if(!result){
			return "@文件内容有误!";
		}
		return "@上传成功!";
	}
	/**
	 * 读取文件
	 * @param f
	 * @return
	 */
	private boolean readFile(File f) {
		boolean flag = false;
		BufferedReader br = null;
    	String encoding = "UTF-8";
    	try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(f), encoding));
			String lineTxt = null;
            while ((lineTxt = br.readLine()) != null) {
            	if(lineTxt.contains(",")){
	            	String[] args = lineTxt.split(",");
	            	System.out.println("条码:"+ args[0] + "\t价格:" + args[1]);
            	} else if(lineTxt.contains("\t")){
	            	String[] args = lineTxt.split("\t");
	            	System.out.println("条码:"+ args[0] + "\t价格:" + args[args.length - 1]);
            	}else{
            		System.out.println("条码:"+ lineTxt);
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
	
}
