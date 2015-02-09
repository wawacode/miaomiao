package com.renren.ntc.sg.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-2-9
 * Time: 下午8:23
 * To change this template use File | Settings | File Templates.
 */
public class ConfigProperties {

    private Properties po;
    private static ConfigProperties configProperties  =  new ConfigProperties();

    public static ConfigProperties getInstance(){
        return  configProperties ;
    }
    public ConfigProperties(){
        po = new Properties();
        InputStream io = Thread.currentThread().getContextClassLoader().getResourceAsStream("apiconfig.properties");
        try {
            po.load(io);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public String  getValue(String key){
         return  (String) po.get(key);
    }
}
