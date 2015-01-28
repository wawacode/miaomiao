package com.renren.ntc.sg.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.OrderInfo;
import com.renren.ntc.sg.service.PrinterService;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-11-21
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
public class SUtils {

    public static String toString(byte[] text) {
        try {
            return new String(text, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String span (String response){
                if (null == response) {
                    return null;
                }
        response =  response.replaceAll("会所","会_所");
        response =  response.replaceAll("公寓","公_寓");
        response =  response.replaceAll("乡巴佬","乡_巴_佬");
        return response;
    }

    public static boolean isOk(String response) {
        if(null == response){
            return false;
        }
        JSONObject ob = JSON.parseObject(response);
        if ("0".equals(ob.getString("error_code"))) {
            return true;
        }
        return false;
    }


    public static int getShopId (String key){
           String  shop_id =  CookieHepler.getInstance().getCookie(key) ;
           int id = 0;
           try {
                id = Integer.valueOf(shop_id);
           }catch (Exception e){
             e.printStackTrace();
           }
           return id;

    }
    public static String forURL(String url, String appkey, String tid, String mobile, String value) {
        return url + "?key=" + appkey + "&dtype=json&mobile=" + mobile + "&tpl_id=" + tid + "&tpl_value=" + value;

    }





    public static  JSONArray from (List<OrderInfo> ls){
        JSONArray jarry =   new JSONArray();
        if (null == ls )  {
            return jarry ;
        }
        for ( OrderInfo o :  ls) {
            JSONObject jb = new JSONObject ();
            jb.put( "order_id" , o.getOrder_id());
            jb.put( "info" ,o.getInfo());
            jb.put( "create_time",o.getCreate_time());
            jarry.add(jb);
        }
        return jarry;
    }

//    private static String del(String info) {
//        info = info.replaceAll("</tr>","") ;
//        info = info.replaceAll("</td>","") ;
//        info = info.replaceAll("</td>","") ;
//        info = info.replaceAll("<tr>","") ;
//        info = info.replaceAll("  ","");
//        return info;
//    }

    public static String getOrderId() {

        StringBuffer sb  = new StringBuffer();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String nowdate  = sdf.format(new Date());
        Random r = new Random();
        int abc = r.nextInt(1000000);
        sb.append("C").append(nowdate).append(pad(abc + ""));
        return sb.toString();
    }

    private static String pad(String abc) {
        StringBuffer sb  = new StringBuffer();
        int l = abc.length();
        for (int i =0 ;i < 7-l; i++  ){
          sb.append("0");
        }
        sb.append(abc);
        return sb.toString();
    }

    public static boolean islegal(String order_id) {
        if (StringUtils.isBlank(order_id) || !order_id.startsWith("C")|| order_id.length()!= 22){
            return false;
        }
        return true;
    }



    public static String generName() {
        StringBuffer sb  = new StringBuffer();
        String ref = System.currentTimeMillis() + "";
        Random r = new Random();
        int abc = r.nextInt(10000);
        sb.append("cat_").append(ref).append(pad(abc + ""));
        return sb.toString();

    }

    public static String wrap(String key) {
        StringBuffer sb = new StringBuffer()   ;
        sb.append("%") ;
        sb.append(key) ;
        sb.append("%") ;
        return sb.toString();
    }

    public static  String getResourceFullLocation(HttpServletRequest request) {
        StringBuffer sb = request.getRequestURL();
        String url = sb.toString();
        String queryString = request.getQueryString();
        if (queryString != null) {
            url = url + "?" + queryString;
        }
        try {
            return URLEncoder.encode(url, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            return url;
        }
    }

    public  static long unwrapper(String uid) {
        String [] arr = uid.split("_");
        long id = 0;
        if ( 2 != arr.length){
            return id ;
        }
        String u =  arr[1];
        try {
            id = Long.valueOf(u);
        }catch (Exception e){
            e.printStackTrace();
        }
        return id ;
    }

    public  static String wrapper(long uid) {

        StringBuffer sb = new  StringBuffer();
        UUID uuid = UUID.randomUUID();
        String u = uuid.toString().replace("-","") ;
        sb.append(u);
        sb.append("_");
        sb.append(uid) ;
        return sb.toString();
    }

    public static String generTableName(long shop_id) {
        StringBuffer sb  = new StringBuffer("items_");
        long mod = shop_id % 1000;
        return sb.append(mod).toString();
    }


    public static JSONObject parse(Item item) {
        JSONObject jb =  new JSONObject();
        jb  = (JSONObject)JSON.toJSON(item);
        return jb;
    }

    public static void  main(String [] args){
        Item it = new Item();
        it.setPic_url("1212") ;
        System.out.println(parse(it).toJSONString());
    }


}
