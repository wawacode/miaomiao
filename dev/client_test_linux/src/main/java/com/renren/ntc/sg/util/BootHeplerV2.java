package com.renren.ntc.sg.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Random;

/**
 * Created by allen on 11/9/14.
 */
public class BootHeplerV2 {

    private static BootHeplerV2 instance = new BootHeplerV2();
    Properties po = null;

    public static BootHeplerV2 getInstance(){

        return instance;


    }

    public String getKey(String key ){
        PrinterHeplerV2.getInstance().reload();
        String pid = PrinterHeplerV2.getInstance().getKey(Constants.PID);
        String token = PrinterHeplerV2.getInstance().getKey(Constants.TOKEN);
        if("token".equals(token)){
            Random  random = new Random();
            token ="CATDTE_" + random.nextInt(120000);
        }
        String value = po.getProperty(key);
        value = value.replace("{pid}",pid);
        value = value.replace("{token}",token);
        return value;
    }

    private BootHeplerV2(){

        po = new Properties();
        InputStream io = Thread.currentThread().getContextClassLoader().getResourceAsStream("runtimeV2.env");
        try {
            po.load(io);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
