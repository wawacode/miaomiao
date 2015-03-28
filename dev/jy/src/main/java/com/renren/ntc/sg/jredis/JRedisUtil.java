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
        jds = new Jedis("10.170.239.52") ;
//        jds = new Jedis("123.56.145.69");
    }

    public static JRedisUtil getInstance() {
        return instance;
    }

    public String  set(String key, String value){
        return jds.set(key,value);
    }

    public long  expire(String key, int seconds){
        return jds.expire(key, seconds);
    }


    public long  incr(String key){
        return jds.incr(key);
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
        JRedisUtil.getInstance().set("qrs2222e_3","33");
    }
}
