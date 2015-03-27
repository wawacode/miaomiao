package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

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

        try {

            System.out.println(URLDecoder.decode("http://v.juhe.cn/sms/send?key=99209217f5a5a1ed2416e5e6d2af87fd&dtype=json&mobile=13681084222&tpl_id=778&tpl_value=%23address%23%3D%E9%91%AB%E4%B8%96%E7%BA%AA%E5%8D%8E%E8%81%94%E8%B6%85%E5%B8%82+%E5%BA%9A%E8%BE%B0%E5%9B%BE%E6%96%87%E4%B8%AD%E5%BF%83+17090368618+C201503261906350497803%26%23status%23%3D%E7%94%A8%E6%88%B7%E4%B8%8B%E5%8D%95%2C%E6%94%AF%E4%BB%98%E6%96%B9%E5%BC%8F%EF%BC%9A%E8%B4%A7%E5%88%B0%E4%BB%98%E6%AC%BE.%26%23price%23%3D32.0" +
                    ""));;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
}