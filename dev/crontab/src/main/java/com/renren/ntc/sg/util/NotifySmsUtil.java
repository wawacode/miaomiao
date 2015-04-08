package com.renren.ntc.sg.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
/**
 * 需要先申请短信模板的id再进行发送
 * @author chunhai.li
 *
 */
public class NotifySmsUtil {
		private static final String  message = "测试";
		private static final String  smsPhoneFile = "d:\\leordern_1.txt";
		private static final String SMS_TEMPLATE_ID = Constants.TID;
		public static void main(String[] args) {
			NotifySmsUtil.readTxtFileAndSendSms(smsPhoneFile);
			//NotifySmsUtil.sendSms(1, "18612035379", message,SMS_TEMPLATE_ID);
		}
		public static void readTxtFileAndSendSms(String filePath) {
	        InputStreamReader read = null;
	        try {
	            String encoding = "utf-8";
	            File file = new File(filePath);
	            if (file.isFile() && file.exists()) { //判断文件是否存在
	                read = new InputStreamReader(new FileInputStream(file), encoding);//考虑到编码格式
	                BufferedReader bufferedReader = new BufferedReader(read);
	                String lineTxt = null;
	                int k = 0;
	                while ((lineTxt = bufferedReader.readLine()) != null) {
	                k++;
	                   if(StringUtils.isBlank(lineTxt) || !NumberUtils.isNumber(lineTxt)){
	                	   System.out.println("drop line ="+lineTxt);
	                	   continue;
	                   }
	                   lineTxt = lineTxt.trim();
	                   System.out.println("read line number="+k+",linetext="+lineTxt);
	                   sendSms(k,lineTxt, message,SMS_TEMPLATE_ID);
	                }
	            } else {
	                System.out.println("找不到指定的文件");
	            }

	        } catch (Exception e) {
	            System.out.println("读取文件内容出错");
	            e.printStackTrace();
	        } finally {
	            if (null != read) {
	                try {
	                    read.close();
	                } catch (IOException e) {
	                    e.printStackTrace();
	                }
	            }
	        }

	    }
	  
	  private static void sendSms(int lineNumber,String phone,String message,String smsTemplateId){
		  try {
			String url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, smsTemplateId, phone, message);
			  System.out.println(String.format("Send  SMS mobile %s ,%s ", phone, url));
			  byte[] resultByteArr = SHttpClient.getURLData(url, "");
			  String smsSendResult = SUtils.toString(resultByteArr);
			  System.out.println(String.format("Post Shop SMS message : %s , %s  %s ", smsSendResult, phone, url));
		} catch (IOException e) {
			System.out.println(String.format("send sms error line=%d,phone=%s,message=%s", lineNumber,phone,message));
			e.printStackTrace();
		}
	  }
}
