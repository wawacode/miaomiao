package com.renren.ntc.sg.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class FileUtil {
	public static List<String> readFile(String fileName){
		List<String>  list = new ArrayList<String>();
		File file = new File (fileName);
        if(file.isFile() && file.exists()){ //判断文件是否存在
            InputStreamReader read = null  ;
            try {
                  read = new InputStreamReader(
                   new FileInputStream(file),"utf-8");//考虑到编码格式
            BufferedReader bufferedReader = new BufferedReader(read);
            String lineTxt = null;
             while((lineTxt = bufferedReader.readLine()) != null){
                 String [] arr = lineTxt.split("\t");
                 String id = arr[1] ;
                 list.add(id);
                }
             return list;
            }catch ( Exception e){
                e.printStackTrace();
            }finally {
                if (null != read) {
                    try {
                        read.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return list;
	}
}
