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


/**
 * @author allen
 */
public class JRedisUtil {

    private Jedis jds;

    static Log logger = LogFactory.getLog(JRedisUtil.class);

    private static JRedisUtil instance = new JRedisUtil();

    private JRedisUtil() {
        jds = new Jedis("123.56.102.224") ;
    }

    public static JRedisUtil getInstance() {
        return instance;
    }

    public String  set(String key, String value){
        return jds.set(key,value);
    }

    public String  get(String key){
        return jds.get(key);
    }

    public static void main(String[] args) {
        JRedisUtil.getInstance().set("qrscene_3","18911125901");
        System.out.println(JRedisUtil.getInstance().get("qrscene_3"));
    }
}
