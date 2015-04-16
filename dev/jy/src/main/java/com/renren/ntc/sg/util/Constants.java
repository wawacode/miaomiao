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
    public static  final String TMPPAYERROR = "{\"code\":401,\"msg\":\"暂时无法使用微信支付。\"}";
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
    public static final String CANNOTUSETHISTICKET = "{\"code\":15,\"msg\":\"该过代金券暂时无法使用，请选择其他代金券\"}";;
    public static final String ORDER_KEY = "ABC_ORDER_KEY";
    public static final String ORDERDONE = "下单成功";
    public static final String ORDERCONFRIM = "配送中";
    public static final String REMARK = "{shop_name}即将为您配送，预计30分钟内到达；\n" +
            "如有疑问请联系：{shop_tel}。";
    public static final String REMARKCONFRIM = "{shop_name}正在为您配送，预计30分钟内到达；\n" +
            "如有疑问请联系：{shop_tel}。";;
    public static final String NEI_HOST = "10.173.3.200" ;
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
    
    public static final int SHOP_ANDITED = 1;
    
	public static final int REFUND_SUC_FLAG=3;
	
	public static final String REFUND_ORDER_SUC = "退单成功";
	
	public static final String REFUND_MSG = "很抱歉商家{shop_name}无法配送您的订单{order_id}，退款{refund_price}将在3-5个工作日返还到您原支付账户，请注意查收，如有问题请联系喵喵客服4008816807。";
	
	public static final String CANCEL_SMS_2_KF_SMS= "用户地址：{address}，联系电话：{phone}，{cancel_time}申请退单，店铺名{shop_name}联系电话：{tel}";
	
	public static final String CANCEL_SMS_2_BOSS_SMS="{cancel_time}订单已取消，用户地址：{address}，电话：{phone}";
	
	public static final String REMIND_ORDER_SMS_2_BOSS = "【加急】地址：{address}，联系电话：{phone}，{create_time}的订单用户加急。";
	
	public static final String REMIND_ORDER_SMS_2_KF = "【加急】用户地址：{address}，联系电话：{phone}，{create_time}的订单用户加急，店铺名{shop_name}联系电话：{tel}";
	
	public static final String REMIND_ORDER = "1";
	
	public static final String CANCEL_ORDER_2_BOSS_SMS_MSG = "#order_id#={order_id}&#address#={address}&#phone#={phone}&#create_time#={create_time}";
	
	public static final String CANCEL_ORDER_2_BOSS_SMS_MSG_TEMP_ID = "2363";
	
	public static final String USER_CANCEL_ORDER_2_KF_SMS_MSG = "#shop_name#={shop_name}&#shop_tel#={shop_tel}&#address#={address}&#phone#={phone}&#create_time#={create_time}&#order_id#={order_id}";
	
	public static final String USER_CANCEL_ORDER_2_KF_SMS_MSG_TEMP_ID = "2362";
	
	public static final String REMIND_ORDER_SMS_MSG = "#shop_name#={shop_name}&#shop_tel#={shop_tel}&#address#={address}&#phone#={phone}&#create_time#={create_time}&#order_id#={order_id}";
	
	public static final String REMIND_ORDER_SMS_MSG_TEMP_ID = "2361";
	
	public static final String KF_CLICK_CANCEL_ORDER_2_USER_MSG = "#shop_name#={shop_name}&#shop_tel#={shop_tel}&#order_id#={order_id}";
	
	public static final String KF_CLICK_CANCEL_ORDER_2_USER_MSG_TEMP_ID = "2364";
	
	public static final String REMIND_ORDER_PUSH_MSG = "【喵喵生活】用户催单:店铺{shop_name},{shop_tel} 配送地址{address},{phone},下单时间{create_time},订单号{order_id}的订单用户要求加急";
	
	public static final String CANCEL_ORDER_2_BOSS_LOC_PUSH_MSG = "【喵喵生活】订单号{order_id}订单已取消，用户地址：{address},联系电话{phone},下单时间{create_time}";
	
	public static final String USER_CANCEL_ORDER_2_PUSH_MSG = "【喵喵生活】用户要求退单:店铺{shop_name},{shop_tel}配送地址{address},{phone},下单时间 {create_time},订单号{order_id},的订单用户要求退单";
	
	public static final String KF_PHONE = "15010229352";
	
	public static final String USER_CONFIRM_MSG_2_BOSS = "#date#={date}&#order_id#={order_id}&#price#={price}";
	
	public static final String USER_CONFIRM_MSG_2_BOSS_TEMP_ID = "2397";
	
}