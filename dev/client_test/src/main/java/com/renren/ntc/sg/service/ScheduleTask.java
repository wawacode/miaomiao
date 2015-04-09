package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.util.BootHepler;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;

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
public class ScheduleTask {

    private static ScheduleTask instance = new ScheduleTask();
    private Timer timer  ;
    private ConcurrentHashMap map = new  ConcurrentHashMap();
    private List<String> list   = new ArrayList<String>();


    public  static ScheduleTask getinstance(){
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
                get(this.url);
            }catch (Throwable e ){
                e.printStackTrace();
            }
        }
    }

    public void get(String url ){
        LoggerUtils.getInstance().log("loop get ....");
        try {
            byte[] b  = SHttpClient.getURLData(url, "catxianguo.com");
            String response = SUtils.toString(b);
            if (!isOk(response)){
                  return ;
            }

            JSONObject ob  = (JSONObject)JSONObject.parse(response);
            JSONArray jarr  = ob.getJSONArray("data")  ;
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
         boolean re = Printer.print(o);
         feedback(o,re,"printing");
         return re;
    }


    public boolean feedback(JSONObject  o , boolean re , String msg){
         String feed_url = BootHepler.getInstance().getKey(Constants.FEEDBACK_URL) ;
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
}
