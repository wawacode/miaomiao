package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.service.LoggerUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Date;

/**
 * 取得汉字拼音码.
 * 支持GBK大字符集.
 * @author Zhao Honghui
 * @version 1.0
 */
public class Test {


    public static void main (String [] args ){

//        try {
//
//            System.out.println(URLDecoder.decode(
//                    " http://v.juhe.cn/sms/send?key=99209217f5a5a1ed2416e5e6d2af87fd&dtype=json&mobile=15110081323&tpl_id=777&tpl_value=%23address%23%3D%E5%87%A4%E9%BA%9F%E6%B4%B2%E8%B6%85%E5%B8%82+%E5%A7%9A%E5%AE%B6%E5%9B%AD%E8%A5%BF%E9%87%8C%E4%B8%89%E5%8F%B7%E9%99%A2+13910449038%26%23status%23%3D%E7%94%A8%E6%88%B7%E4%B8%8B%E5%8D%95%2C%E6%94%AF%E4%BB%98%E6%96%B9%E5%BC%8F%EF%BC%9A%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98.%26%23detail%23%3D%E5%85%BB%E4%B9%90%E5%A4%9A%EF%BC%885%E7%93%B6%EF%BC%89+%E5%8D%95%E4%BB%B7+12.0+%E6%95%B0%E9%87%8F+2%2C%E5%91%B3%E5%85%A8%E6%B4%BB%E6%80%A7%E4%B9%B3%E9%85%B8%E8%8F%8C%E5%8E%9F%E5%91%B3435ml+%E5%8D%95%E4%BB%B7+7.0+%E6%95%B0%E9%87%8F+1%2C%E9%85%92%E9%AC%BC50%E5%BA%A6%E9%A6%A5%E9%83%81%E9%A6%99%E5%9E%8B%E7%99%BD%E9%85%92500ml" +
//                            "+%E5%8D%95%E4%BB%B7+4.0+%E6%95%B0%E9%87%8F+1%2C%E6%80%BB%E8%AE%A1+%EF%BC%9A18.5+%E5%85%83"));;
//        } catch (Exception e) {
//            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//        }
    	try {
			 String message = Constants.SEND_BOSS_WX_PAY_BY_USER_CONFIRM_SMS.replace("{date}", "2015-04-20").replace("{totalCount}", 1+"").replace("{total_price}", ((float)100/100)+"").replace("{confirm_price}", ((float)100/100)+"").replace("{confirm_count}", 2+"").replace("{final_confirm_price}", ((float)100/100)+"");
			 message = SUtils.span(message);
	         message = URLEncoder.encode(message, "utf-8");
		     sendSmsInfo(Constants.SEND_BOSS_WX_PAY_BY_USER_CONFIRM_SMS_TID, "18612035379", message, "send wx total pay to boss shopid="+1);
			} catch (IOException e) {
				e.printStackTrace();
			}
    }
    
    public static void sendSmsInfo(String smsTempId,String phone,String message,String desc) throws IOException{
      	 String url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, smsTempId, phone, message);
           LoggerUtils.getInstance().log(String.format("Send %s SMS mobile %s ,%s ",desc, phone, url));
           byte[] t = SHttpClient.getURLData(url, "");
           String response = SUtils.toString(t);
           LoggerUtils.getInstance().log(String.format("Post %s SMS message : %s , %s  %s ", desc,response, phone, url));
      }
}