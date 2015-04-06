package com.renren.ntc.sg.jredis;

import com.mongodb.*;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;


/**
 * @author allen
 */
public class JRedisUtil {


    static Log logger = LogFactory.getLog(JRedisUtil.class);

    private static JRedisUtil instance = new JRedisUtil();
    private static JedisPool  pool = null;
    static {
        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxActive(50);
        config.setMaxIdle(10);
        config.setMaxWait(10000);
        pool =  new JedisPool(config,"10.170.239.52") ; ;
    }
    private JRedisUtil() {
//        jds = new Jedis("10.170.239.52") ;
//        jds = new Jedis("123.56.145.69");
    }

    public static JRedisUtil getInstance() {
        return instance;
    }

    public String  set(String key, String value){
        LoggerUtils.getInstance().log(String.format("redis set key  %s  value %s ",key,value));
        Jedis j = pool.getResource();
        String re = "";
        try {
            re = j.set(key,value);
        }finally {
            pool.returnBrokenResource(j);
        }
        return   re;
    }

    public long  expire(String key, int seconds){
        Jedis j = pool.getResource();
        long re = 0;
        try {
            re = j.expire(key, seconds);
        }finally {
            pool.returnBrokenResource(j);
        }
        return re;
    }


    public long  incr(String key){
        Jedis j = pool.getResource();
        long re = 0;
        try {
            re = j.incr(key);
            LoggerUtils.getInstance().log(String.format("redis set key  %s  value %d ",key,re));
        }finally {
            pool.returnBrokenResource(j);
        }
        return re;

    }


    public long  sadd( String key, String value){
        Jedis j = pool.getResource();
        long re = 0;
        try {
            re = j.sadd(key, value);
            LoggerUtils.getInstance().log(String.format("redis set key  %s  value %d ",key,re));
        }finally {
            pool.returnBrokenResource(j);
        }
        return re;
    }

    public long  srem (String key,String value){
        Jedis j = pool.getResource();
        long re = 0;
        try {
            re = j.srem(key, value);
            LoggerUtils.getInstance().log(String.format("redis srem key  %s  value %d ",key,re));
        }finally {
            pool.returnBrokenResource(j);

        }
        return re;
    }

    public long  scard ( String key){
        Jedis j = pool.getResource();
        long re = 0;
        try {
            re = j.scard(key);
            LoggerUtils.getInstance().log(String.format("redis srem key  %s  value %d ",key,re));
        }finally {
            pool.returnBrokenResource(j);

        }
        return re;
    }

    public String  get(String key){
        LoggerUtils.getInstance().log(String.format("redis get key  %s ",key));
        Jedis j = pool.getResource();
        String re = "";
        try {
            re = j.get(key);
        }finally {
            pool.returnBrokenResource(j);
        }
        return re;
    }

    public long  getLong(String key){
        LoggerUtils.getInstance().log(String.format("redis getLong key  %s ",key));
        Jedis j = pool.getResource();
        String value = "";
        long count = 0;
        try {
            value = j.get(key);
            try{
                count = Long.valueOf(value);
            }catch (Exception e){
                LoggerUtils.getInstance().log(String.format("redis  getLong parse error", value));
            }
        }finally {
            pool.returnBrokenResource(j);
        }
        return count;
    }

    public Set<String> keys(String prefix){
        Jedis j = pool.getResource();
        Set<String> value = null;
        try {
            value = j.keys(prefix);
        }finally {
            pool.returnBrokenResource(j);
        }
        return value;
    }

    public static void main(String[] args) {
        JRedisUtil.getInstance().set("qrs2222e_3","33");
        JRedisUtil.getInstance().set("qrs2222e_5","334");
        System.out.println(JRedisUtil.getInstance().get("qrs2222e_3"));
    }

    public Set<String> smembers(String redisKey) {
        Jedis j = pool.getResource();
        Set<String> value = null;
        try {
            value = j.smembers(redisKey);
        }finally {
            pool.returnBrokenResource(j);
        }
        return  value;
    }
}
