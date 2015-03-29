package com.renren.ntc.sg.util;

/**
 * Created by allen on 11/9/14.
 */
public class Constants {
    public static  final int  SHOP_ID = 10010;
    public static  final String HEADER ="^F1";
    public static  final String TITLE ="^H2";
    public static  final String BR ="\n";
    public static  final String SPILT  ="********************************";
    public static  final String SPILT2 ="================================";

    public static  final String ORDER_ADDRESS = " 配送地址：";

    public static  final String ORDER_DETAIL = " 订单明细：";
    public static  final String ORDER_HEAD =   " 名称               数量  价格  ";
    public static  final String ORDER_TOTAL  = " 总计                    ：{total}元";
    public static  final String DCODE_TITLE =  " 订单号：{order}";
    public static  final String ORDERTIME = " 下单时间 : {time}";
    public static  final String WEIXIN_URL = "^Q+http://weixin.qq.com/r/l3UsNBHEW0wkrVVX9yCF";
                                                     //"http://weixin.qq.com/r/l3UsNBHEW0wkrVVX9yCF"
    public static  final String FOOTER = "^H2 喵喵一下 ，便利到家";
    public static  final long  DEFAULT_SHOP_ID = 1;


    public static final String DBNAME = "sg" ;
    public static final String HOST = "www.mbianli.com" ;

    public static  final String PARATERERROR = "{\"code\":1,\"msg\":\"paramter error\"}";

    public static  final String PRERROR = "{\"code\":1,\"msg\":\"{msg}\"}";
    public static  final String LEAKERROR = "{\"code\":100,\"msg\":\"库存不足\"}";
    public static  final String UNLOGINERROR = "{\"code\":101,\"msg\":\"未登录\"}";
    public static  final String UKERROR = "{\"code\":500,\"msg\":\"服务器异常\"}";
    public static  final String NOMORE = "{\"code\":10,\"msg\":\"您已经领过代金券了，请进入个人中心查看\"}";
    public static  final String DONE = "{\"code\":0,\"msg\":\"done\"}";

    public static  final String ALLREADYNEW = "{\"code\":0,\"msg\":\"allready new version\"}";
    public static final long DEFAULT_SHOP = 1 ;
//    public static final String DOMAIN = "miaomiao.com" ;UK
    public static final String DOMAIN = "127.0.0.1" ;
    public static final String DOMAIN2 = "mbianli.com:8088" ;
    public static final String MBIANLI = "http://www.mbianli.com" ;
    public static final String DOMAIN3 = "mbianli.com" ;
    public static final String DOMAIN4 = "127.0.0.1:8080" ;
    public static final String COOKIE_KEY_USER ="cat_p" ;
    public static final String COOKIE_KEY_REGISTUSER ="cat_reg_p" ;
    public static final Object DOMAIN_URL = "";
    public static final long OFFLINEFLAG = 1000 * 60 * 10;
    public static final String WXPAY = "wx" ;
    public static final String TICKETPRE = "ticket_";
    public static final String COUPONTRADE = "TRADEING";
    public static final int TRADEPIE = 60;
    public static final String DAYLIMIT = "daylimit_";
    public static final String LUNDER = "_";
    public static final String CANNOTUSETICKET = "{\"code\":12,\"msg\":\"今天已经使用过代金券\"}";;
    public static String SMSURL = "http://v.juhe.cn/sms/send";
    public static String APPKEY = "99209217f5a5a1ed2416e5e6d2af87fd";
    public static String TID = "777";
    public static String LOCTID = "778";
    public static String USER_TID = "791";
    public static String TMP_TID = "1015";
    public static String SHOP_NO_EXIST = "店铺不存在";
    public static int ITEM_ON_SALE = 1;
    public static int SHOP_OPEN_STATUS = 0;
    public static int ITEM_NOT_SALE = 0;

    public static final String  STAFFKEY= "staff-";

    public static final int ORDER_WAIT_FOR_PRINT = 1;

    public static final int ORDER_PAY_PENDING = 0;

    public static final int ORDER_PAY_FAIL = 5;

    public static final int ORDER_FINISH = 2;

    public static final int  COUPONUNUSED = 0;

    public static final int  COUPONUSED = 4;
}