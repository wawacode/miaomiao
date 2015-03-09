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
<<<<<<< HEAD
import java.util.Set;
=======
>>>>>>> bdcc6a9235d5a60467896977687cfa9b0b1bc75b


/**
 * @author allen
 */
public class JRedisUtil {

    private Jedis jds;

    static Log logger = LogFactory.getLog(JRedisUtil.class);

    private static JRedisUtil instance = new JRedisUtil();

    private JRedisUtil() {
<<<<<<< HEAD
        jds = new Jedis("10.251.6.245") ;
//        jds = new Jedis("123.56.102.224") ;
=======
        jds = new Jedis("123.56.102.224") ;
>>>>>>> bdcc6a9235d5a60467896977687cfa9b0b1bc75b
    }

    public static JRedisUtil getInstance() {
        return instance;
    }

    public String  set(String key, String value){
        return jds.set(key,value);
    }

<<<<<<< HEAD

    public long  sadd( String key, String value){
        return jds.sadd(key,value);
    }

    public long  scard ( String key){
        return jds.scard(key);
    }

=======
>>>>>>> bdcc6a9235d5a60467896977687cfa9b0b1bc75b
    public String  get(String key){
        return jds.get(key);
    }

<<<<<<< HEAD
    public Set<String> keys(String prefix){
        return jds.keys(prefix);
    }

    public static void main(String[] args) {
//        JRedisUtil.getInstance().set("qrscene_3","18911125901");
//        JRedisUtil.getInstance().set("qrscene_3","18600326217");
        String aaa = "qrscene_1 oQfDLjhxmkb509lIOlvg0mJO3g3s,qrscene_2 oQfDLjga8BA0kpAPD6wsO8kNWiu4,qrscene_3 oQfDLjjDBUX-jluf2qR_ZIwLnSGs,qrscene_3 oQfDLjuggR_mBLyAM9OXZQKpP_s4,qrscene_3 oQfDLjp8UmylfRwuJIYNigpU8IBg,qrscene_3 oQfDLjtNq4WX8Zv11xm-PzDkiWvk,qrscene_3 oQfDLjgxiOV4lqsYjWCmaMcEPlOE,qrscene_3 oQfDLjlyD3oDpJJQLU0d9TpAljVw,qrscene_3 oQfDLjkFkBf8RJP7QqUb7aLlllN8,qrscene_3 oQfDLjgCQqhrC5bImi5fB7vRZdfc,qrscene_3 oQfDLjm-S7SoaY0FNSVnVOgTXVyY,qrscene_3 oQfDLjh6G0X9blDiPsDe2Tzdcv2Q,qrscene_3 oQfDLjoxyGYMN2ZQkkr5LWecoM2w,qrscene_3 oQfDLjpbwdKJ6fxJslZVlcoIhoX8,qrscene_1 oQfDLjnPAfpwYrxYAMWPevI2_HWM,qrscene_1 oQfDLjiwQUMBRJ5eraL2_YMADJHA,qrscene_3 oQfDLjr9WQjaT8diMsOv5HuyaTn4,qrscene_1 oQfDLjhg0pbQEtxpDKPEyDQbti9c,qrscene_3 oQfDLjhMAXbKKFTWna9VnsmiCOq4,qrscene_1 oQfDLjnDfTvOz9RdndK988iq4-JE,qrscene_1 oQfDLjggOCwWkRpvuI9PN8Nx4b3U,qrscene_3 oQfDLjqbj7fh_fn_HYNifwuQ1B1w,qrscene_1 oQfDLjiLcQByooNQtcdAHubLkIQw,qrscene_1 oQfDLjv1vKQJrnVhWyFDxyt3Z_3w,qrscene_1 oQfDLjoXY7T7O2L1x5B81ELRZOAo,qrscene_1 oQfDLjmdI7Osu89A2myQPr7TLCvE,qrscene_3 oQfDLjubDDxSFetPakyyVD-7h5x4,qrscene_3 oQfDLjpR7QtHvTueaFthL6wCqBfI,qrscene_1 oQfDLjkdBSrdtvsyBkiZkcId-n_g,qrscene_1 oQfDLjrV312vUj2ZiZOT2w8Egmps,qrscene_1 oQfDLjhzgCFnyLGrLxdmWcq3QyxQ,qrscene_3 oQfDLjrQ6kO7FdFtJC7EZ6k7r8hE,qrscene_1 oQfDLjicFbPImHc_QhaFA8bTyiUI,qrscene_3 oQfDLjsft2U4KtqSRsUGCyn5KF1w,qrscene_1 oQfDLjhQAY6ZN90sUyJHvMJI0wEo,qrscene_3 oQfDLju1pelbJhIehEjOMCjONMkE,qrscene_1 oQfDLjiCjBDuofCw72cqwHTtM3C8,qrscene_3 oQfDLjlYD9GpNTycbmxbAUF9Bgmc,qrscene_1 oQfDLjmm0rr17v_eRUJbiksG0DY0,qrscene_1 oQfDLjk91jUxcMeW3jN0ACwVWAkM,qrscene_3 oQfDLjqZWh0-wkAqWn3AcURBg1ow,qrscene_1 oQfDLjvZd0X9hOtMfhFwlmZYjBJw,qrscene_1 oQfDLjlaNeP5I8uYN9enlTw5gitw,qrscene_1 oQfDLjvh2nE5rN8Nid7zGmHnov70,qrscene_3 oQfDLjmczUC3KyT61xazEQa6hWUg,qrscene_3 oQfDLjq88HBOEqXtYkX8YUtrsdXA,qrscene_3 oQfDLjmI8rpgcth5IeQ2bEviOjkY,qrscene_3 oQfDLjrMEf9RzX4Ob0T7K3JuVrRU,qrscene_3 oQfDLjuMmnoTI_jU1o8EmeZ8qneo,qrscene_3 oQfDLjqbhS4MdBBVsCYcsvrEK5N0,qrscene_3 oQfDLjmJPk7slZj0dIja6n2UFkQg,qrscene_1 oQfDLjvxMP0QjeMic-XGC4rNEmV4,qrscene_3 oQfDLjmjUIWwNcRYnFPC_KSCMJK4,qrscene_1 oQfDLjg6SlLnf9ajppqFU4mu9MRE,qrscene_2 oQfDLjn5b77Hh0i2l_FicA3FjyyA,qrscene_3 oQfDLjrsOa8XC6Af3FgtMfsD-12g,qrscene_3 oQfDLjrzNacBL2rkyHxm_aaJNcek,qrscene_3 oQfDLjpRK8411Tq5qq8qdj48aHUQ,qrscene_2 oQfDLjhubBTwbrNjcOjaOLx1M14w,qrscene_1 oQfDLjhs3DfN52ukdEo16RIiN8VE,qrscene_1 oQfDLjnMb6PbHLVWQwGFKs3WbfsM,qrscene_1 oQfDLjngXL4vAs4UXCiCs8yOQ0F8,qrscene_1 oQfDLjtmSjNcUM0bHkapPhnatXyw,qrscene_3 oQfDLjqKjGvYkm8x-CYEGFabKVfM,qrscene_3 oQfDLjghKVYg24vt9JOnyAL-QWFA,qrscene_3 oQfDLjsv5Ux3gjelxbc1ovAaXYbQ,qrscene_3 oQfDLjoEyMifrQTaEabKGifG4OjM,qrscene_3 oQfDLjnfX86Tv6COgKK65rwWp2MM,qrscene_2 oQfDLjsig7QjM1BThPNaEbCMBH48,qrscene_3 oQfDLjpdChsJKHBb4rVZVhXA7y9E,qrscene_2 oQfDLjqtPVU-OPCdWvFKnFqNHzt0,qrscene_2 oQfDLjgN0dHfTi-m8VTj7WJdKpQ8,qrscene_1 oQfDLjt42oL2MhUmawANrWiW1N2g,qrscene_1 oQfDLjnjyPbsSH8P80shxTIpcehc,qrscene_1 oQfDLjnwyLWpAAzfHlq_ve_oy8Yo,qrscene_3 oQfDLjs5Lz3gbvwWJCf4VTxApKak,qrscene_2 oQfDLjkjcibkJBaCD-pLtyL20bUI,qrscene_2 oQfDLjv4WwiqtYjvf_C95qc6Huqc,qrscene_3 oQfDLjsoPtC5Hn6VKdIytvTyYJxc,qrscene_3 oQfDLjmWbiVKewdIRtGm5Fi2LnPY,qrscene_3 oQfDLjqSdwKeJ2e6c_AUd3JvMSms,qrscene_3 oQfDLjgE4xhpucLutb_xDcx35YDg,qrscene_3 oQfDLjikTxvnYo3p3Pqm_W8z8Bgo,qrscene_3 oQfDLjnPibWzhs2Ie-Lwo-Au0gBs,qrscene_3 oQfDLjh-IjUiA2v1_QRplSCmCwaE,qrscene_3 oQfDLjguUU3jJBxC8D80euBZFEZg,qrscene_3 oQfDLjh--xZrslrk3BWsk6JmYSh0,qrscene_3 oQfDLjue53Wbd9BIbI5k2AY4NTdY,qrscene_3 oQfDLjo3AucLhbJAUEdB8FfcOZZw,qrscene_3 oQfDLjiTJQ-qNvZph3LaC2Fv0v3c,qrscene_1 oQfDLjgXoZ8tpUVD5W6zFQ0lvlzQ,qrscene_3 oQfDLji2exopszrC_84ArupOHiKc,qrscene_3 oQfDLjuuB1rP_BTwePG0n5mS4NZs,qrscene_3 oQfDLjtlUWUK5kRVWm1JZiBtmipI,qrscene_3 oQfDLjhcsJ_c3j3Be0R-zMw-rNo4,qrscene_2 oQfDLjmBOxOiu0LHIL4XtEXATyCQ,qrscene_2 oQfDLjvFbhSrnjhNhe5n4pG9om_Q,qrscene_2 oQfDLjuU_ew2ZfHFXM3mdkIYmwOI,qrscene_2 oQfDLjp_c6cttfDNtSbnEZ_joAfk,qrscene_1 oQfDLjoCnBd0dviJ53PxZt7Q4F8Y,qrscene_3 oQfDLjuzXp_QcihxB_ta66Du87ao,qrscene_3 oQfDLjkcQFQPhaGI-R6qKRD44zu0,qrscene_3 oQfDLjhG4x0JuXKbfJw1cJr5j95E,qrscene_3 oQfDLjqqDiLu79ogfdmYnLN2B0WM,qrscene_3 oQfDLjpNWCFylKH1bPJ60Cvm983M,qrscene_3 oQfDLjiHhMox-OZ9EVwQA1vyKjfQ,qrscene_3 oQfDLjl_IvfnYtbSUB0478iZVbok,qrscene_3 oQfDLjhtU9LCa58UBtxfrS0Tcfrs,qrscene_3 oQfDLjtPAtX9bO24Rnn1Pbekq-xY,qrscene_3 oQfDLjjhbDHWRh46j_q62euk1GjE,qrscene_3 oQfDLjmh1fz93mSBKH4rgsOPbHQU,qrscene_3 oQfDLjsTjJWbwqArqTkUW_1PLWUg,qrscene_3 oQfDLjmKx1xRH1nOaeLkLSTZVBqs,qrscene_3 oQfDLjm39zczQuu0bjOGrBZATc0I,qrscene_3 oQfDLjmj4MSN7thGBJWafmA7vosc,qrscene_3 oQfDLjhIEB3dgrqrxZgPCkEhLMvg,qrscene_3 oQfDLjv9tLeoyKLwlEcskzmE1Czs,qrscene_3 oQfDLjkwYWKDLYdVwt7YyuoBS3d8,qrscene_3 oQfDLjltrKY04451S0EHxI_iGThQ,qrscene_3 oQfDLjs6gy3_aFigVLxJCkVdsXQg,qrscene_3 oQfDLjsc-bH7tcoR-t_MDKI6aQyg,qrscene_3 oQfDLjuVvoHW3F8uhbaIgV6wmn4I,qrscene_3 oQfDLjjo2jv_juUubnY6RHP9NYpU,qrscene_3 oQfDLjiukGonCL7gLduAPqmgOp0E,qrscene_3 oQfDLjqBWRNrvM99l2ahlXVlzzUU,qrscene_3 oQfDLjvQLmQtv1fsdtkhNk-6jtMU,qrscene_3 oQfDLjsy7PdsqSJVQwKe4AZMCK8w,qrscene_3 oQfDLjrUC6i0n1iBm6RW3pDneuFw,qrscene_3 oQfDLjkPy_MPH6AY2vW0JaC2fhTE,qrscene_3 oQfDLjjtXEshzr5mjW8BUk8S5gpY,qrscene_3 oQfDLjqJy19REBqnWcFEjRMxYPCU,qrscene_3 oQfDLjotYvcE2mlc3lOtF2bS9BA8,qrscene_3 oQfDLjgJ6FORQpC-kpsKjCdSC5vA,qrscene_3 oQfDLjljXssluVN6QT8ex4x0XNJE,qrscene_3 oQfDLjgqM1vqE3q2d1dWOsP80bc8,qrscene_3 oQfDLjpqedMiTeilsnyI6Mhru9jA,qrscene_3 oQfDLjop5EQzfgD1Qm-KOskyKZ3M,qrscene_3 oQfDLjpZC_f7GcDF7JtaYUuKyizY,qrscene_3 oQfDLjuXSe_Pl-3EzR3ZWX4bbs1w,qrscene_3 oQfDLjtvnVGWKgMR1NKUezkmk5c0,qrscene_3 oQfDLjtUluStarjQ9-437SsIWzX4,qrscene_3 oQfDLjrW-U0zGK0IT7NoBrA0VBPs,qrscene_3 oQfDLjjy26S_WnCe4-_UpQ7K-IUA,qrscene_3 oQfDLjkzZKvpWWpmagqIacRV_1Ik,qrscene_3 oQfDLjoTn4eB9k_1LTZ3i9juPA8Q,qrscene_3 oQfDLjqmn2uB0Mi83gmvizIWw8K0,qrscene_3 oQfDLjoTCC8kNFo4QLdiMG4GLwj4,qrscene_3 oQfDLjvXoP1TBr-58vdbjg9Ox85M,qrscene_3 oQfDLjgVChY8-jUuw_Jz2VVTOyVk,qrscene_3 oQfDLjgQv7fH4DNwGuMkwb0MQE5M,qrscene_3 oQfDLjvPHtylkFFNyT7C8JJgwmIM,qrscene_3 oQfDLjk5COnPcSZVobEtqrFD49WA,qrscene_3 oQfDLju1pelbJhIehEjOMCjONMkE,qrscene_3 oQfDLjktiScjBmLK5oCsuDQmM1NM,qrscene_3 oQfDLjrGJWCa4c1tQYuLb96YmT74,qrscene_3 oQfDLjiTP9hezFGdXXydqV5MKunc,qrscene_3 oQfDLjnLL0hfGmyCdpCaBQiCrGno,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_3 oQfDLjjQ5rtT1E_xfR4LBeytgBgM,qrscene_3 oQfDLjrUnG8fbsjrjDxuuIgrNq90,qrscene_3 oQfDLjqnkzIEiWjkCwmao1lZD5XI,qrscene_3 oQfDLjjGM-Oat1hwFX8lunJF21AA,qrscene_3 oQfDLjvuOgdQafvDw48afOGqX09I,qrscene_3 oQfDLjqqhouvZ-_jmRkPu1m9kemY,qrscene_3 oQfDLjuXmuF8TiHse-hDQsR1xOa8,qrscene_3 oQfDLjulu7ANxnVbUMwthxvgsYR0,qrscene_3 oQfDLjhXe6nc5jqLE6XzVpmoqTe0,qrscene_3 oQfDLjr8TpjvBCsB4pue9vWtGdqo,qrscene_1 oQfDLjoN-bFnj7KpjHO8cKyL8d9Q,qrscene_3 oQfDLjsMi_NW-EPES7uLIunECt3g,qrscene_3 oQfDLjlEIAmjI0vDvMtKlDYRAHsk,qrscene_3 oQfDLjtxkCeMHqGskdOzvNogRbRw,qrscene_1 oQfDLjjzMHuAXhb0ePMugUVIFNKE,qrscene_3 oQfDLjkShgK_k_ftTWuMSW5ED2A0,qrscene_3 oQfDLjnmrAArohoQPiGJonNrU71c,qrscene_3 oQfDLjs7R7JHfopV14NuT6uLKfKU,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_1 oQfDLjqay5d9ceJljsRZEOHxpDd4,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic,qrscene_3 oQfDLjmZD7Lgynv6vuoBlWXUY_ic";
        String [] strs =  aaa.split(",");
        for (String s : strs){
            String[] ss = s.split(" ");
            System.out.println("1");
            JRedisUtil.getInstance().sadd("set_" + ss[0], ss[1]);
        }
=======
    public static void main(String[] args) {
        JRedisUtil.getInstance().set("aaa","bbb");
        System.out.println(JRedisUtil.getInstance().get("aaa"));
>>>>>>> bdcc6a9235d5a60467896977687cfa9b0b1bc75b
    }
}
