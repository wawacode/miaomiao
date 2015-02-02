package com.qunar.sg.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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

    public static String span(String response) {
        if (null == response) {
            return null;
        }
        response = response.replaceAll("会所", "会_所");
        response = response.replaceAll("公寓", "公_寓");
        response = response.replaceAll("乡巴佬", "乡_巴_佬");
        return response;
    }

    public static boolean isOk(String response) {
        if (null == response) {
            return false;
        }
        JSONObject ob = JSON.parseObject(response);
        if ("0".equals(ob.getString("error_code"))) {
            return true;
        }
        return false;
    }



    public static String forURL(String url, String appkey, String tid, String mobile, String value) {
        return url + "?key=" + appkey + "&dtype=json&mobile=" + mobile + "&tpl_id=" + tid + "&tpl_value=" + value;

    }



    public static String getOrderId() {

        StringBuffer sb = new StringBuffer();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String nowdate = sdf.format(new Date());
        Random r = new Random();
        int abc = r.nextInt(1000000);
        sb.append("C").append(nowdate).append(pad(abc + ""));
        return sb.toString();
    }

    private static String pad(String abc) {
        StringBuffer sb = new StringBuffer();
        int l = abc.length();
        for (int i = 0; i < 7 - l; i++) {
            sb.append("0");
        }
        sb.append(abc);
        return sb.toString();
    }

    public static boolean islegal(String order_id) {
        if (StringUtils.isBlank(order_id) || !order_id.startsWith("C") || order_id.length() != 22) {
            return false;
        }
        return true;
    }


    public static String generName() {
        StringBuffer sb = new StringBuffer();
        String ref = System.currentTimeMillis() + "";
        Random r = new Random();
        int abc = r.nextInt(10000);
        sb.append("cat_").append(ref).append(pad(abc + ""));
        return sb.toString();

    }

    public static String wrap(String key) {
        StringBuffer sb = new StringBuffer();
        sb.append("%");
        sb.append(key);
        sb.append("%");
        return sb.toString();
    }

    public static String getResourceFullLocation(HttpServletRequest request) {
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

    public static long unwrapper(String uid) {
        String[] arr = uid.split("_");
        long id = 0;
        if (2 != arr.length) {
            return id;
        }
        String u = arr[1];
        try {
            id = Long.valueOf(u);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return id;
    }

    public static String wrapper(long uid) {

        StringBuffer sb = new StringBuffer();
        UUID uuid = UUID.randomUUID();
        String u = uuid.toString().replace("-", "");
        sb.append(u);
        sb.append("_");
        sb.append(uid);
        return sb.toString();
    }

    public static String generTableName(long shop_id) {
        StringBuffer sb = new StringBuffer("items_");
        long mod = shop_id % 1000;
        return sb.append(mod).toString();
    }


    public static String generOrderTableName(long shop_id) {
        StringBuffer sb = new StringBuffer("orders_");
        long mod = shop_id % 1000;
        return sb.append(mod).toString();
    }




    public static void main(String[] args) {
        System.out.println(generToken("cat_1232"));
    }


    public static boolean Tokenislegal(String token) {
        return true;

    }

    public static String generToken(String token) {
        String[] tet = token.split("_");
        StringBuffer sb = new StringBuffer();
        String uuid = UUID.randomUUID().toString();
        uuid = uuid.replaceAll("-", "");
        sb.append(tet[0]).append("_").append(uuid.substring(0, 8));
        return sb.toString();
    }






}
