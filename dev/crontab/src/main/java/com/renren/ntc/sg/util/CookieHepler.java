package com.renren.ntc.sg.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by allen on 11/9/14.
 */
public class CookieHepler {

    private static CookieHepler instance = new CookieHepler();
    Properties po = null;

    public static CookieHepler getInstance(){

        return instance;


    }

    public String getCookie(String key ){
        return po.getProperty(key);
    }

    private CookieHepler(){

        po = new Properties();
        InputStream io = Thread.currentThread().getContextClassLoader().getResourceAsStream("cookies.txt");
        try {
            po.load(io);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
