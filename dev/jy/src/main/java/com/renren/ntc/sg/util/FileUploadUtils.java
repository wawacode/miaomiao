package com.renren.ntc.sg.util;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtils {

	public boolean uploadFile(MultipartFile multipartFile,String savePath,String fileName) {
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
}
