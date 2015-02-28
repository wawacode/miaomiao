package com.renren.ntc.sg.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * 取得汉字拼音码.
 * 支持GBK大字符集.
 * @author Zhao Honghui
 * @version 1.0
 */
public class Test {


    public static void main (String [] args ){

        try {
            System.out.println(URLEncoder.encode("http://www.mbianli/com/wx/rd"));
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
}