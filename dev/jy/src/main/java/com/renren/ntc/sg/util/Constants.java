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
    public static  final String UKERROR = "{\"code\":500,\"msg\":\"服务器异常\"}";
    public static  final String DONE = "{\"code\":0,\"msg\":\"done\"}";

    public static  final String ALLREADYNEW = "{\"code\":0,\"msg\":\"allready new version\"}";
    public static final long DEFAULT_SHOP = 1 ;
//    public static final String DOMAIN = "miaomiao.com" ;UK
    public static final String DOMAIN = "127.0.0.1" ;
    public static final String DOMAIN2 = "mbianli.com:8088" ;
    public static final String DOMAIN3 = "mbianli.com" ;
    public static final String DOMAIN4 = "127.0.0.1:8080" ;
    public static final String COOKIE_KEY_USER ="cat_p" ;
    public static final String COOKIE_KEY_REGISTUSER ="cat_reg_p" ;
    public static final Object DOMAIN_URL = "";

    public static String SMSURL = "http://v.juhe.cn/sms/send";
    public static String APPKEY = "99209217f5a5a1ed2416e5e6d2af87fd";
    public static String TID = "777";
    public static String USER_TID = "791";
}
