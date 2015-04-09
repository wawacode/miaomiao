package com.renren.ntc.sg.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by allen on 11/9/14.
 */
public class BootHepler {

    private static BootHepler instance = new BootHepler();
    Properties po = null;

    public static BootHepler getInstance(){

        return instance;


    }

    public String getKey(String key ){

        return po.getProperty(key);
    }

    private BootHepler(){

        po = new Properties();
        InputStream io = Thread.currentThread().getContextClassLoader().getResourceAsStream("runtime.env");
        try {
            po.load(io);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
