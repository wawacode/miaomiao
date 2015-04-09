package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.PrinterHeplerV2;
import com.renren.ntc.sg.util.BootHeplerV2;
import com.renren.ntc.sg.util.SUtils;

import java.io.*;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-2
 * Time: 下午4:13
 * To change this template use File | Settings | File Templates.
 */
public class ScheduleTaskV2 {

    private static final int ACTION = 101 ;
    private static ScheduleTaskV2 instance = new ScheduleTaskV2();
    private Timer timer  ;
    private ConcurrentHashMap map = new  ConcurrentHashMap();
    private List<String> list   = new ArrayList<String>();


    public  static ScheduleTaskV2 getinstance(){
        return  instance;
    }
    public void start(long delay ,long loopTime,String url ){
        if (null != timer){
            timer.cancel();
        }
        timer = new Timer(true);
        LoggerUtils.getInstance().log(String.format("looper start .... %d, %d ",delay, loopTime));
        timer.schedule(new ScheduleTaskSupport( url ), delay, loopTime);
    }


    public class ScheduleTaskSupport extends TimerTask {
        String url ;
        private ScheduleTaskSupport(String url){
                     this.url = url ;
        }
        @Override
        public void run (){
            try{
                String main_url = BootHeplerV2.getInstance().getKey(Constants.MASTER_URL);
                String loopTime =  BootHeplerV2.getInstance().getKey(Constants.LOOPTIME);
                this.url = main_url.replace("{ver}",BootHeplerV2.getInstance().getKey(Constants.VER));
                get(this.url);
            }catch (Throwable e ){
                e.printStackTrace();
            }
        }
    }

    public void get(String url ){
        LoggerUtils.getInstance().log("loop get ....");
        try {

            LoggerUtils.getInstance().log( "query" + url);
            byte[] b  = SHttpClient.getURLData(url, "catxianguo.com");
            String response = SUtils.toString(b);
            System.out.println( "get" + response);


            JSONObject ob  = (JSONObject)JSONObject.parse(response);
            int code = ob.getIntValue("code") ;
            LoggerUtils.getInstance().log(  String.format("init get code %d " , code));
            if(ob.getIntValue("code") == ACTION){
                System.out.println("start update ...");
                String  token  =  ob.getString("token");
                long  pid = ob.getLong("pid");
                PrinterHeplerV2.getInstance().writeProperties(pid,token);
                LoggerUtils.getInstance().log( String.format("init printer  %d , token %s ",pid, token));
               // 更新
                return ;
            }
            // 这个判断后置
            if (!isOk(response)){
                return ;
            }

            try{
            String status = getPrinterStatus();
            printerfb(status);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
            String  data  = ob.getString("data");
            LoggerUtils.getInstance().log(" data : " + data);
            JSONArray jarr  = JSONArray.parseArray(data)  ;

            for (int i =0 ; i < jarr.size(); i++ ){
                JSONObject  oo = (JSONObject)  jarr.get(i);
                //检查是否在成功打印队列中
                String  oid  = oo.getString("order_id");
                if (null !=  map.get(oid)){
                    feedback (oo,true,"allreadyprint") ;
                    return ;
                } ;
                boolean re = print(oo);
                if (re) {
                    // 加入成功打印对了
                    map.put(oid,"1");
                    list.add(oid);
                    if (list.size() >100){
                        for (int j=0 ; j <20 ;j++ ){
                        String key  = list.get(0);
                        map.remove(key) ;
                        list.remove(key);
                        }
                    }
                }
            }
        }catch (Exception e){
                     e.printStackTrace();
        }

    }

    public boolean  isOk (String re){
        if (null == re | "".equals(re)){
            return false;
        }

        JSONObject ob  = (JSONObject)JSONObject.parse(re);
        if  (ob.getLong("code") != 0 ){
            return false           ;
        }
        return true;
    }


    public boolean print(JSONObject  o ){
         LoggerUtils.getInstance().log(String.format("loop print ..%s ..",o.toJSONString()));
         boolean re = PrinterV2.print(o);
         feedback(o,re,"printing");
         return re;
    }
    public boolean printerfb( String status){
        String feed_url = BootHeplerV2.getInstance().getKey(Constants.PRINTER_FEEDBACK_URL) ;
        LoggerUtils.getInstance().log(String.format("feed back printerfb ..%s ..",status));
        try{
            String pid =    PrinterHeplerV2.getInstance().getKey(Constants.PID) ;
            String token =    PrinterHeplerV2.getInstance().getKey(Constants.TOKEN) ;
            String ver =  BootHeplerV2.getInstance().getKey(Constants.VER) ;
            status = URLEncoder.encode(status);
            feed_url = feed_url.replace("{pid}",pid).replace("{status}",status).replace("{ver}",ver).replace("{token}",token) ;
            byte[] b  = SHttpClient.getURLData((feed_url), "catxianguo.com");
            String response = SUtils.toString(b);
            LoggerUtils.getInstance().log(String.format("fb url %s ,res %s " , feed_url, response) ) ;
            if (!isOk(response)){
                return  false;
            }
        } catch (Exception e){
            e.printStackTrace();
            return  false;
        }
        return true;
    }

    public boolean feedback(JSONObject  o , boolean re , String msg){
         String feed_url = BootHeplerV2.getInstance().getKey(Constants.FEEDBACK_URL) ;

        LoggerUtils.getInstance().log(String.format("feed back start ..%s ..",o.toJSONString()));
        try{
            String orderId = o.getString("order_id");
            feed_url = feed_url.replace("{id}",orderId).replace("{re}",re + "").replace("{msg}",msg) ;
            byte[] b  = SHttpClient.getURLData((feed_url), "catxianguo.com");
           String response = SUtils.toString(b);
           LoggerUtils.getInstance().log(String.format("fb url %s ,res %s " , feed_url, response) ) ;
           if (!isOk(response)){
               return  false;
           }
        } catch (Exception e){
              e.printStackTrace();
              return  false;
        }
        return true;
    }


    public static String getPrinterStatus(){
        String workstatus = "";
        try {
            Process p = Runtime.getRuntime().exec("cmd /c rundll32 printui.dll,PrintUIEntry  /Xg /n miaomiao.printer.usb" +
                    " /f \"C:\\Program Files\\cat\\webapps\\cli-1\\f.txt\"");
            p.waitFor();

            File file = new File("C:\\Program Files\\cat\\webapps\\cli-1\\f.txt") ;
            if(!file.exists()){
                workstatus = "file miss";
                return workstatus ;
            }
            BufferedReader reader = null;
            try {
                String encoding = "utf-16";
                InputStreamReader read = new InputStreamReader(new FileInputStream(file), encoding);//考虑到编码格式
                reader = new BufferedReader(read);
                String tempString = "";
                while ((tempString = reader.readLine()) != null) {
                    //"Attributes:	<Local|WorkOffline|>"
                    workstatus  = getAttributes(tempString);
                    if(workstatus != null && workstatus.trim().length() != 0){
                        break ;
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
                workstatus = e.getMessage();
            } finally {
                if (reader != null) {
                    try {
                        reader.close();
                    } catch (IOException e1) {
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return workstatus;
    }

    private static String getAttributes(String tempString) {
        int start =tempString.indexOf("Attributes:") ;
        if (-1 == start){
            return "";
        }
        return tempString.substring(start,tempString.length());
    }
}
