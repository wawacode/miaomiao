package com.renren.ntc.sg.util;

import java.io.*;
import java.util.Properties;

/**
 * Created by allen on 11/9/14.
 */
public class PrinterHeplerV2 {

    private static String  FILE = "/opt/cat/webapps/printer.env";
    private static PrinterHeplerV2 instance = new PrinterHeplerV2();
    Properties po = null;


    public static PrinterHeplerV2 getInstance(){

        return instance;

    }

    public String getKey(String key ){
        return po.getProperty(key);
    }

    private PrinterHeplerV2(){

        po = new Properties();
        File f = new  File(FILE);
        InputStream io  = null;
        try {
            io = new FileInputStream(f);
            po.load(io);
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                io.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }


   public void  reload(){
       po = new Properties();
       File f = new  File(FILE);
       InputStream io  = null;
       try {
           io = new FileInputStream(f);
           po.load(io);
       } catch (IOException e) {
           e.printStackTrace();
       }finally {
           try {
               io.close();
           } catch (IOException e) {
               e.printStackTrace();
           }
       }

   }

    public static void main (String [] args){
        System.out.println(PrinterHeplerV2.getInstance().getKey("PID"));
        System.out.println(PrinterHeplerV2.getInstance().getKey("TOKEN"));
        PrinterHeplerV2.getInstance().writeProperties(10,"toooken");
    }


    public  void writeProperties(long pid, String token){
        writePropertiesFile(FILE,pid,token) ;
    }


    //写资源文件，含中文
    public  void writePropertiesFile(String filename,long pid,String token)
    {
        Properties properties = new Properties();
        OutputStream outputStream = null;
        try
        {
            outputStream = new FileOutputStream(filename);
            properties.setProperty("PID", pid + "");
            properties.setProperty("TOKEN", token);
            properties.store(outputStream,"ert");
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        finally{
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


}
