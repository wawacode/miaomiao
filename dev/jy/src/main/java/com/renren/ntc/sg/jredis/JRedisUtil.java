package com.renren.ntc.sg.jredis;

import com.mongodb.*;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import redis.clients.jedis.Jedis;

import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;


/**
 * @author allen
 */
public class JRedisUtil {

    private Jedis jds;

    static Log logger = LogFactory.getLog(JRedisUtil.class);

    private static JRedisUtil instance = new JRedisUtil();

    private JRedisUtil() {
        jds = new Jedis("10.251.6.245") ;
    }

    public static JRedisUtil getInstance() {
        return instance;
    }

    public String  set(String key, String value){
        return jds.set(key,value);
    }


    public long  sadd( String key, String value){
        return jds.sadd(key,value);
    }

    public long  scard ( String key){
        return jds.scard(key);
    }

    public String  get(String key){
        return jds.get(key);
    }

    public Set<String> keys(String prefix){
        return jds.keys(prefix);
    }

    public static void main(String[] args) {
//        JRedisUtil.getInstance().set("qrscene_3","18911125901");
        JRedisUtil.getInstance().set("qrscene_3","18600326217");
        System.out.println(JRedisUtil.getInstance().get("qrscene_3"));
    }
}
