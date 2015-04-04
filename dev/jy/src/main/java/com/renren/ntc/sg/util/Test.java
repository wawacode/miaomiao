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

            System.out.println(URLDecoder.decode(
                    ">http://v.juhe.cn/sms/send?key=99209217f5a5a1ed2416e5e6d2af87fd&dtype=json&mobile=13701209785&tpl_id=777&tpl_value=%23address%23%3D%E6%9C%9B%E4%BA%AC%E8%A5%BF%E5%9B%AD2%E5%8C%BA%E8%B6%85%E5%B8%82+%28%29%E6%98%9F%E6%BA%90%E5%9B%BD%E9%99%85B%E5%BA%A7%E5%9B%BE%E6%96%87%E5%BF%AB%E5%8D%B0+13371791032%26%23status%23%3D%E7%94%A8%E6%88%B7%E4%B8%8B%E5%8D%95%2C%E6%94%AF%E4%BB%98%E6%96%B9%E5%BC%8F%EF%BC%9A%E8%B4%A7%E5%88%B0%E4%BB%98%E6%AC%BE.%26%23detail%23%3D%E5%8C%97%E5%86%B0%E6%B4%8B%E6%A9%99%E6%B1%81%E6%B1%BD%E6%B0%B4330ml*6+%E5%8D%95%E4%BB%B7+30.0+%E6%95%B0%E9%87%8F+1%2C%E6%80%BB%E8%AE%A1+%EF%BC%9A30.0+%E5%85%83"));;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
}