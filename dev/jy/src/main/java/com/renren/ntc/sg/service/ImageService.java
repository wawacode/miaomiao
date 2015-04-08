package com.renren.ntc.sg.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.renren.ntc.sg.util.ImagesUtils;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-2-23
 * Time: 上午11:50
 * To change this template use File | Settings | File Templates.
 */
@Service
public class ImageService {
	public String getSavePicName(MultipartFile pic,String savePicImgName){
		String picName = pic.getOriginalFilename();
    	String[] picNameArr = pic.getOriginalFilename().split("\\.");
    	if(pic!=null && picNameArr.length ==2){
    		picName = savePicImgName +"."+picNameArr[1];
    		return picName;
    	}
    	return "";
	}
	public boolean upLoadImg(MultipartFile pic,String picName,String savePicPath){
        try {
            boolean isSuc = ImagesUtils.convertImage(pic.getInputStream(), savePicPath + picName);
            if(!isSuc){
                return false ;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
	}
}
