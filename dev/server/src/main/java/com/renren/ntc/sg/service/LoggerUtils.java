package com.renren.ntc.sg.service;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-2
 * Time: 下午1:48
 * To change this template use File | Settings | File Templates.
 */
public class LoggerUtils {

    private static LoggerUtils instance = new  LoggerUtils();

    private LoggerUtils(){


    }
    public static LoggerUtils getInstance (){
        return instance;
    }
    public void log (String message){
              System.out.println(System.currentTimeMillis()   + " " + message);
    }

}
