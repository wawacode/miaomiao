package com.renren.ntc.sg.util;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.service.LoggerUtils;

public class FileUploadUtils {

	public static boolean  uploadFile(MultipartFile multipartFile,String savePath,String fileName) {
		 File file = new File(savePath, fileName);
		try {  

            multipartFile.transferTo(file);  
            return true;
        } catch (IllegalStateException e) {  
        	e.printStackTrace();
        } catch (IOException e) {  
        	e.printStackTrace();
        }   
		return false;
	}
	
	public static boolean uploadFileToRemote(String serialNo,long shopId, MultipartFile pic){
		String picName = pic.getOriginalFilename();
    	String[] picNameArr = pic.getOriginalFilename().split("\\.");
    	if(pic!=null && picNameArr.length ==2){
    		picName = serialNo+"."+picNameArr[1];
    	}else {
    		LoggerUtils.getInstance().log(String.format("uploadPic format is wrong,serialNo=%s",serialNo));
    		 return false;
		}
    	String savePicPath = SgConstant.SAVE_PIC_PATH.replace("{shop_id}", String.valueOf(shopId));
    	boolean isSuc = uploadFile(pic, savePicPath,picName);
		if(!isSuc){
			return false;
		}
		return true;
	}
	
	public static String getPicViewUrl(long shopId,String picName){
		String imageUrl = SgConstant.REMOTE_FILE_PATH_PRE.replace("{shop_id}", String.valueOf(shopId));
		String picUrl = imageUrl.concat(picName);
		return picUrl;
	}
	/**
	 * 
	 * @param file
	 * @param fileName
	 * @param savePath
	 * @return
	 * @author zhaoxiufei
	 */
	public static File uploadFile2(MultipartFile file, String fileName, String savePath) {
		File f = new File(savePath);
		File f2 = null;
		if  (!f .exists()  && !f .isDirectory()){
			System.out.println("--路径不存在--");
			 f .mkdir(); //新建
		}
		try {
			f2 = new File(savePath,fileName);
			file.transferTo(f2);
		} catch (IllegalStateException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		return f2;
	}
}
