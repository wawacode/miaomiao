package com.renren.ntc.sg.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-2
 * Time: 下午1:48
 * To change this template use File | Settings | File Templates.
 */
public class LoggerUtils {

    private static final Logger logger = LoggerFactory.getLogger(LoggerUtils.class);

    private static LoggerUtils instance = new  LoggerUtils();

    private LoggerUtils(){


    }
    public static LoggerUtils getInstance (){
        return instance;
    }
    public void log (String message){
        DateFormat df=new SimpleDateFormat("yyyy-MM-dd EE hh:mm:ss");
        System.out.println(df.format(new Date())+ " " + message);
    }
}
