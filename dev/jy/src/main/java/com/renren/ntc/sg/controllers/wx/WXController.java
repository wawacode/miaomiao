package com.renren.ntc.sg.controllers.wx;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.service.*;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.CookieManager;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Path("")
@DenyCommonAccess
public class WXController {

    @Autowired
    public OrdersDAO orderDao;

    @Autowired
    public OrderService orderService;

    @Autowired
    public UserOrdersDAO userOrdersDAO;

    @Autowired
    public SMSService smsService;

    @Autowired
    public WXService wxService;

    @Autowired
    public PushService pushService;

    @Autowired
    public UserCouponDAO userCouponDao ;
    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    public ShopDAO shopDao;

    @Autowired
    public TicketService ticketService;


    private  static final String PREFIX = "qrscene_";
    public  WXController (){
//        map.put("qrscene_3","18600326217") ;
    }


    static final  String PAY_REPAY = "<xml>\n" +
            "   <return_code><![CDATA[SUCCESS]]></return_code>\n" +
            "   <return_msg><![CDATA[OK]]></return_msg>\n" +
            "</xml>" ;

    static final String CONTENT ="<xml>\n" +
            "<ToUserName><![CDATA[{toUser}]]></ToUserName>\n" +
            "<FromUserName><![CDATA[{fromUser}]]></FromUserName>\n" +
            "<CreateTime>{time}</CreateTime>\n" +
            "<MsgType><![CDATA[text]]></MsgType>\n" +
            "<Content><![CDATA[{message}]]></Content>\n" +
            "</xml>";


    static final String DUOKEFU = "<xml>\n" +
            "<ToUserName><![CDATA[{toUser}]]></ToUserName>\n" +
            "<FromUserName><![CDATA[{fromUser}]]></FromUserName>\n" +
            "<CreateTime>{time}</CreateTime>\n" +
            "<MsgType><![CDATA[transfer_customer_service]]></MsgType>\n" +
            "</xml>" ;



    static final String CONTENT2 ="<xml>\n" +
            "<ToUserName><![CDATA[{toUser}]]></ToUserName>\n" +
            "<FromUserName><![CDATA[{fromUser}]]></FromUserName>\n" +
            "<CreateTime>{time}</CreateTime>\n" +
            "<MsgType><![CDATA[news]]></MsgType>\n" +
            "<ArticleCount>1</ArticleCount>\n" +
            "<Articles>\n" +
            "<item>\n" +
            "<Title><![CDATA[喵喵生活]]></Title> \n" +
            "<Description><![CDATA[关于喵喵]]></Description>\n" +
            "<PicUrl><![CDATA[http://www.mbianli.com/images/loadingpage-full.png]]></PicUrl>\n" +
            "<Url><![CDATA[https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx762f832959951212&redirect_uri=http%3A%2F%2Fwww.mbianli.com%2Fwx%2Fr&response_type=code&scope=snsapi_base&state=128#wechat_redirect]]></Url>\n" +
            "</item>\n" +
            "</Articles>\n" +
            "</xml> ";

    private static final String MESSAGE_KEFU = "您好，感谢对小喵的支持！小喵热线是4008816807，如需帮助请随时（24小时）致电:-)";
    private static final String MESSAGE_FUWUFANWEI = "目前喵喵已成功覆盖：\n" ;
    private static final String MESSAGE_CUIDAN = "已完成催单，请稍后，如有疑问请联系喵喵客服4008816807。" ;

    static final String MESSAGE = "喵喵生活为您连接身边便利，在家动动手指，便利百货为您送货上门。\n" +
            "\n" +
            "配送商品: 便利百货，在便利店能买到的我们都能送；\n" +
            "配送方式: 20元起送, 货到付款, 免运费；\n" +
            "配送时间: 24小时覆盖，30分钟送货上门；\n" +
            "\n" +
            "\n" +
            "微信预定请点击下方“我要下单”";


    @Get("")
    @Post("")
    public String index( Invocation inv,@Param("echostr") String echostr) {
        HttpServletRequest request =  inv.getRequest();
        String body = "";
        try {
             body = SUtils.getBodyString(request.getReader());
             LoggerUtils.getInstance().log(String.format("rec body %s  ", body));
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(!StringUtils.isBlank(body)){
            String str = parse(body);
            LoggerUtils.getInstance().log(String.format("return %s  ", str)) ;
            return "@" + str;
        }
        return "@" + echostr;
    }
    @Get("r")
    @Post("r")
    public String r( Invocation inv) {
        return "r:" + "http://www.mbianli.com:8088/sg/loading#/shop?shop_id=10033";
    }

    @Get("cb")
    @Post("cb")
    public String index( Invocation inv) {
        LoggerUtils.getInstance().log(String.format("wx  callback  call "));
        String body = "";
        try {
            body = SUtils.getBodyString(inv.getRequest().getReader());
            LoggerUtils.getInstance().log(String.format("wx pay callback  call rec body %s  ", body));
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(!StringUtils.isBlank(body)) {
            String return_code = getResult_code(body);
            if ("SUCCESS".equals(return_code)){
                String order_id = getOut_trade_no(body);
                String fee = getCash_fee(body);
                String attach = getAttach(body);
                long  shop_id = getShop_id(attach) ;
                long  user_id = getUser_id(attach) ;
                long  coupon_id = getCoupon_id(attach) ;
                if (shop_id == 0 || user_id == 0){
                   LoggerUtils.getInstance().log(String.format("check wx pay cb param err  miss shop_id or user_id"));
                    return "@" + Constants.UKERROR;
                }

                Order order = orderDao.getOrder(order_id,SUtils.generOrderTableName(shop_id));
                if(done(order)){
                    return "@"+PAY_REPAY;
                }
                orderDao.paydone(Constants.ORDER_WAIT_FOR_PRINT,order_id,SUtils.generOrderTableName(shop_id));
                userOrdersDAO.paydone(Constants.ORDER_WAIT_FOR_PRINT,order_id,SUtils.generUserOrderTableName(user_id));
                if( coupon_id != 0) {
                    ticketService.writeoff(user_id,shop_id,coupon_id) ;
                }
                Shop shop = shopDao.getShop(shop_id);
                if(null == shop ){
                    LoggerUtils.getInstance().log(String.format("check wx pay cb  miss shop  %d ",shop_id));
                    return "@" + Constants.UKERROR;
                }
                sendInfo(shop, order_id) ;
            }
            if("FAIL".equals(return_code)){
                String order_id = getOut_trade_no(body);
                String attach = getAttach(body);
                long  shop_id = getShop_id(attach) ;
                long  user_id = getUser_id(attach) ;
                if (shop_id != 0 && user_id!= 0){
                    LoggerUtils.getInstance().log(String.format("check wx pay cb param err  miss shop_id or user_id"));
                    return "@" + Constants.UKERROR;
                }
            }
        }
        return "@" + PAY_REPAY;
    }

    private boolean done(Order order) {
        if (order.getStatus() == Constants.ORDER_WAIT_FOR_PRINT || order.getStatus() == Constants.ORDER_FINISH){
            return true;
        }
        return false;
    }

    private long getCoupon_id(String attach) {
        long coupon_id = 0 ;

        String[] ids = attach.split("_");
        if ( ids.length < 3 ){
               return  coupon_id;
        }
        try{
            coupon_id= Long.valueOf(ids[2]);
        }catch (Exception e){
            e.printStackTrace();
        }
        return coupon_id;
    }

    private void sendInfo( Shop shop ,String order_id){
        smsService.sendSMS2LocPush(order_id, shop);
        pushService.send2locPush(order_id, shop);
        pushService.send2kf(order_id, shop);
        // 发送短信通知

        //use wx
        orderService.mark(order_id, shop.getId());
        wxService.sendWX2User(order_id, shop);

        Device devcie = deviceDAO.getDevByShopId(shop.getId());
        if (null == devcie || SUtils.isOffline(devcie)) {
            LoggerUtils.getInstance().log("device is null or  printer offline ");
            // 发送通知给 用户和 老板     \
            LoggerUtils.getInstance().log("send push to boss");
            pushService.send2Boss(order_id, shop);
            LoggerUtils.getInstance().log("send sms to boss");
            smsService.sendSMS2Boss(order_id, shop);
//          System.out.println("send sms to user");
//          smsService.sendSMS2User(order_id, shop);
        }
    }
    private long getShop_id(String attach) {
         String[] ids = attach.split("_");
         long shop_id = 0 ;
        try{
             shop_id= Long.valueOf(ids[0]);
         }catch (Exception e){
            e.printStackTrace();
        }
        return shop_id;
    }

    private long getUser_id(String attach) {
        String[] ids = attach.split("_");
        long user_id = 0 ;
        try{
            user_id= Long.valueOf(ids[1]);
        }catch (Exception e){
            e.printStackTrace();
        }
        return user_id;
    }

    private String getAttach(String body) {
        String str =  "<attach><![CDATA[" ;
        int start =body.indexOf(str);
        int end =body.indexOf("]]></attach>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( str.length() + start ,end);
    }


    public String getResult_code(String body){
        String str =  "<result_code><![CDATA[" ;
        int start =body.indexOf(str);
        int end =body.indexOf("]]></result_code>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( str.length() + start ,end);
    }

    public String getbank_type(String body){
        String str =  "<bank_type><![CDATA[" ;
        int start =body.indexOf(str);
        int end =body.indexOf("]]></bank_type>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( str.length() + start ,end);
    }
    public String getCash_fee(String body){
        String str =  "<cash_fee><![CDATA[" ;
        int start =body.indexOf(str);
        int end =body.indexOf("]]></cash_fee>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( str.length() + start ,end);
    }

    public String getFee_type(String body){
        String str =  "<fee_type><![CDATA[" ;
        int start =body.indexOf(str);
        int end =body.indexOf("]]></fee_type>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( str.length() + start ,end);
    }

    public String getOpenid(String body){
        String str =  "<openid><![CDATA[" ;
        int start =body.indexOf(str);
        int end =body.indexOf("]]></openid>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( str.length() + start ,end);
    }
    public String getOut_trade_no(String body){
        String str =  "<out_trade_no><![CDATA[" ;
        int start =body.indexOf(str);
        int end =body.indexOf("]]></out_trade_no>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( str.length() + start ,end);
    }

    private  String parse(String body) {
        String mtype =  getMtype(body);
        String toUser = getToUser(body);
        String fromUser = getFromUser(body);
        String event = getEvent(body);
        if ("event".equals(mtype)) {
            String eventKey = getEventKey(body);
            if ("about_miaomiao".equals(eventKey)){
              LoggerUtils.getInstance().log( String.format(" rec event from wx fromUser  %s  event %s ,eventKey %s",fromUser, event ,eventKey));
              String response = CONTENT2.replace("{message}", MESSAGE);
              response = response.replace("{toUser}",fromUser);
              response = response.replace("{fromUser}",toUser);
              response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
              return  response;
            }
            if ("Vkefudianhua".equals(eventKey)){
                LoggerUtils.getInstance().log( String.format(" rec event from wx fromUser  %s  event %s ,eventKey %s",fromUser, event ,eventKey));
                String response = CONTENT.replace("{message}", MESSAGE_KEFU);
                response = response.replace("{toUser}",fromUser);
                response = response.replace("{fromUser}",toUser);
                response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
                return  response;
            }
            if ("Vfuwufanwei".equals(eventKey)){
                LoggerUtils.getInstance().log( String.format(" rec event from wx fromUser  %s  event %s ,eventKey %s",fromUser, event ,eventKey));
                String response = CONTENT.replace("{message}", MESSAGE_FUWUFANWEI);
                response = response.replace("{toUser}",fromUser);
                response = response.replace("{fromUser}",toUser);
                response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
                return  response;
            }
            if ("Vcuidan".equals(eventKey)){
                LoggerUtils.getInstance().log( String.format(" rec event from wx fromUser  %s  event %s ,eventKey %s",fromUser, event ,eventKey));
                String response = CONTENT.replace("{message}", MESSAGE_CUIDAN);
                response = response.replace("{toUser}",fromUser);
                response = response.replace("{fromUser}",toUser);
                response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
                return  response;
            }
            if ("subscribe".equals(event)){
                String content = getContent(body);
                LoggerUtils.getInstance().log(String.format("rec  content %s ",content));
                String response = CONTENT.replace("{message}", MESSAGE);
                response = response.replace("{toUser}",fromUser);
                response = response.replace("{fromUser}",toUser);
                response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
                if(eventKey.startsWith(PREFIX)) {
                long act =   JRedisUtil.getInstance().sadd("set_" + eventKey ,fromUser) ;
//                String phone = JRedisUtil.getInstance().get(eventKey);
//                if(!StringUtils.isBlank(phone)&& act == 1) {
//                        smsService.sendSMS2tguang(fromUser,phone);
//                    }
                }
                return  response;
            }
        }
        String content = getContent(body);
        if("1110111".equals(content)){
            String response = CONTENT2.replace("{message}",  "");  // 这个其实没用
               response = response.replace("{toUser}",fromUser);
            response = response.replace("{fromUser}",toUser);
            response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
            return  response;
        }

        // 用户给发消息
        LoggerUtils.getInstance().log(String.format("rec  content %s ",content));
        String response = DUOKEFU.replace("{message}", MESSAGE);  // 这个其实没用
        response = response.replace("{toUser}",fromUser);
        response = response.replace("{fromUser}",toUser);
        response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
        return  response;
    }


    @Get("test")
    @Post("test")
    public String test( Invocation inv,@Param("echostr") String echostr) {
        HttpServletRequest request =  inv.getRequest();
        String body = "";
        try {
            body = SUtils.getBodyString(request.getReader());
            LoggerUtils.getInstance().log(String.format("rec body %s  ", body));
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(!StringUtils.isBlank(body)){
            String str = test_parse(body);
            LoggerUtils.getInstance().log(String.format("return %s  ", str)) ;
            return "@" + str;
        }
        return "@" + echostr;
    }



    private  String test_parse(String body) {
        String mtype =  getMtype(body);
        String toUser = getToUser(body);
        String fromUser = getFromUser(body);
        String event = getEvent(body);
        String content = getContent(body);
        //商家查询增量粉丝
        int count = 0 ;
        try {
           count = Integer.valueOf(content);
        }catch(Exception e){
           // do not thing;
        }
        if(count !=0){
               long fss = JRedisUtil.getInstance().scard("set_"+PREFIX+ count);
               String response = CONTENT.replace("{message}", fss + "");  // 这个其实没用
               response = response.replace("{toUser}",fromUser);
               response = response.replace("{fromUser}",toUser);
               response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
               return  response;
        }
        // 用户给发消息
        LoggerUtils.getInstance().log(String.format("rec  content %s ",content));
        String response = DUOKEFU.replace("{message}", MESSAGE);  // 这个其实没用
        response = response.replace("{toUser}",fromUser);
        response = response.replace("{fromUser}",toUser);
        response = response.replace("{time}",System.currentTimeMillis()/1000 +"");
        return  response;
    }





    private String getContent(String body) {
        String s = "<Content><![CDATA[";
        String e = "]]></Content>";
        int start =body.indexOf(s);
        int end =body.indexOf(e);
        if (-1 == start || -1 == end){
            return "" ;
        }
        return body.substring( s.length() + start ,end);
    }

    private static String getEventKey(String body) {
        String s = "<EventKey><![CDATA[";
        String e = "]]></EventKey>";
        int start =body.indexOf(s);
        int end =body.indexOf(e);
        if (-1 == start || -1 == end){
            return "" ;
        }
        return body.substring( s.length() + start ,end);

    }


    private static  String getEvent(String body) {
        String s = "<Event><![CDATA[";
        String e = "]]></Event>";
        int start =body.indexOf(s);
        int end =body.indexOf(e);
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( s.length() + start ,end);
    }

    private static  String getMtype(String body) {
        int start =body.indexOf("<MsgType><![CDATA[");
        int end =body.indexOf("]]></MsgType>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( 18 + start ,end);
    }

    private static String getFromUser(String body) {
        String PRE = "<FromUserName><![CDATA[";
        int start =body.indexOf(PRE);
        int end =body.indexOf("]]></FromUserName>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring(PRE.length() + start ,end);
    }

    private static String getToUser(String body) {
        int start =body.indexOf("<ToUserName><![CDATA[");
        int end =body.indexOf("]]></ToUserName>");
        if(start == -1 || end == -1){
            return "";
        }
        return body.substring( 21 + start ,end);
    }




    @Get("rd")
    @Post("rd")
    public String rd( Invocation inv,@Param("phone")String phone) {
        String dps = CookieManager.getInstance().getCookie(inv.getRequest(),"CAT_DPS");
        if (!StringUtils.isBlank(dps)) {
            LoggerUtils.getInstance().log(String.format("Catstaff  rec first time phone %s access ",phone));
            CookieManager.getInstance().saveCookie(inv.getResponse(),"CAT_DPS","hello");
        }else{
            LoggerUtils.getInstance().log(String.format("Catstaff  rec not first time phone %s access ",phone));
        }
        return "r:http://weixin.qq.com/r/l3UsNBHEW0wkrVVX9yCF";
    }

    @Get("stats")
    @Post("stats")
    public String stats( Invocation inv) {

        Set<String> keys = JRedisUtil.getInstance().keys("set_" + PREFIX+"*");

        Map<String,Long>  map = new HashMap<String,Long>() ;
        JSONObject jb =  new JSONObject();
        for (String key  :keys){
            long count = JRedisUtil.getInstance().scard(key) ;
            map.put(key,count) ;
            jb.put(key,count) ;
        }
        inv.addModel("stats",map);
        return "@" + jb.toJSONString();
    }
    @Post("add_phone")
    public String add_phone( Invocation inv,@Param("phone") String phone,@Param("qrscene") String qrscene) {
        JRedisUtil.getInstance().set(qrscene,phone) ;
        return "@" + Constants.DONE;
    }

    public static void main(String[] args) {
        String CONTENT="<xml><appid><![CDATA[wx762f832959951212]]></appid><attach><![CDATA[10033_12459]]></attach><bank_type><![CDATA[CITIC_CREDIT]]></bank_type><cash_fee><![CDATA[1]]></cash_fee><fee_type><![CDATA[CNY]]></fee_type><is_subscribe><![CDATA[Y]]></is_subscribe><mch_id><![CDATA[1233699402]]></mch_id><nonce_str><![CDATA[01b36d0eae3771391455661b45834805]]></nonce_str><openid><![CDATA[oQfDLjmZD7Lgynv6vuoBlWXUY_ic]]></openid><out_trade_no><![CDATA[C201503222017230498949]]></out_trade_no><result_code><![CDATA[SUCCESS]]></result_code><return_code><![CDATA[SUCCESS]]></return_code><sign><![CDATA[6BFF12810DFD8E14A99115F0CC4A69FD]]></sign><time_end><![CDATA[20150322201730]]></time_end><total_fee>1</total_fee><trade_type><![CDATA[JSAPI]]></trade_type><transaction_id><![CDATA[1008640350201503220035656051]]></transaction_id></xml>";
        WXController s = new WXController();
        System.out.println(s.getOut_trade_no(CONTENT));
    }
}
