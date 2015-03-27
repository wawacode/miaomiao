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
                    "http://v.juhe.cn/sms/send?key=99209217f5a5a1ed2416e5e6d2af87fd&dtype=json&mobile=15510645263&tpl_id=777&tpl_value=%23address%23%3D%E4%B9%90%E9%82%BB-%E6%99%A8%E5%85%89%E5%AE%B6%E5%9B%AD%E5%BA%97+%E6%99%A8%E5%85%89%E5%AE%B6%E5%9B%AD321%E5%8F%B7%E6%A5%BC5%E5%8D%95%E5%85%837002+18511866012%26%23status%23%3D%E7%94%A8%E6%88%B7%E4%B8%8B%E5%8D%95%2C%E6%94%AF%E4%BB%98%E6%96%B9%E5%BC%8F%EF%BC%9A%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98.%26%23detail%23%3D%E7%87%95%E4%BA%AC%E5%95%A4%E9%85%92%E5%90%AC%E8%A3%85500ml+%E5%8D%95%E4%BB%B7+5.0+%E6%95%B0%E9%87%8F+3%2C%E6%80%A1%E5%86%A0%E5%9B%AD%E7%B4%A0%E7%89%9B%E7%AD%8B130g+%E5%8D%95%E4%BB%B7+4.0+%E6%95%B0%E9%87%8F+2%2C%E6%80%BB%E8%AE%A1+%EF%BC%9A23.0+%E5%85%83"));;
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
}