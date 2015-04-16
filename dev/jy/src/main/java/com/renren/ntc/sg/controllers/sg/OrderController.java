package com.renren.ntc.sg.controllers.sg;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Item4V;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.bean.UserCoupon;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.biz.dao.UserOrdersDAO;
import com.renren.ntc.sg.constant.OrderStatus;
import com.renren.ntc.sg.constant.PushType;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.service.AddressService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.OrderService;
import com.renren.ntc.sg.service.PushService;
import com.renren.ntc.sg.service.SMSService;
import com.renren.ntc.sg.service.TicketService;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;
import com.renren.ntc.sg.util.wx.Sha1Util;

@Path("order")
public class OrderController {

    private static int DEFAULT_SHOP_ID = 1;
    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public OrdersDAO userOrdersDAOordersDAO;


    @Autowired
    public UserOrdersDAO userOrdersDAO;

    @Autowired
    public OrdersDAO ordersDAO;

    @Autowired
    public NtcHostHolder holder;

    @Autowired
    public ItemsDAO itemsDAO;

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    public AddressService sddressService;

    @Autowired
    public SMSService smsService;

    @Autowired
    public WXService wxService;

    @Autowired
    public TicketService ticketService;

    @Autowired
    public PushService pushService;

    @Autowired
    public OrderService orderService;



    @Get("loading")
    public String loadingPage(Invocation inv) {
        return "loadingPage";
    }


    // 检查库存
    // 判断地址是否Ok

    @Get("save")
    @Post("save")
    public String save(Invocation inv, @Param("shop_id") long shop_id, @Param("address_id") long address_id,
                       @Param("address") String address,
                       @Param("phone") String phone,
                       @Param("remarks") String remarks,
                       @Param("items") String items,
                       @Param("act") String act,
                       @Param("coupon_id") int coupon_id,
                       @Param("coupon_code") String coupon_code ) {

        User u = holder.getUser();
        long user_id = 0;
        if (null != u) {
            user_id = u.getId();
        }
        LoggerUtils.getInstance().log(String.format("user %d items %s ,act %s ,coupon_id %d ,coupon_code %s ",user_id,items,act,coupon_id,coupon_code),u);
        Shop shop = shopDAO.getShop(shop_id);
        if (null == shop) {
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  ", shop_id),u);
            return "@" + Constants.PARATERERROR;
        }

        if (address_id == 0) {
            Address add = new Address();
            if (StringUtils.isBlank(phone) || StringUtils.isBlank(address)) {
                return "@" + Constants.PARATERERROR;
            }
            add.setPhone(phone);
            add.setAddress(address);
            add.setUser_id(user_id);
            address_id = sddressService.addAddress(add);
            //设置成默认 地址
            sddressService.cleanDefaultAddress(user_id);
            sddressService.defaultAddress(address_id);
        }
        if (StringUtils.isBlank(items)) {
            LoggerUtils.getInstance().log(String.format("error can't find shop  %d  items %s", shop_id, items),u);
            return "@" + Constants.PARATERERROR;
        }
        boolean ok = true;
        JSONArray jbarr = (JSONArray) JSONArray.parse(items);
        int price = 0;
        JSONArray infos = new JSONArray();
        List<Item4V> itemls = new ArrayList<Item4V>();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < jbarr.size(); i++) {
            JSONObject jb = (JSONObject) jbarr.get(i);
            long item_id = jb.getLong("id");
            int count = jb.getInteger("count");
            Item item = itemsDAO.getItem(SUtils.generTableName(shop_id), shop_id, item_id);
            //计算库存是否足够
            Item4V i4v = new Item4V();
            i4v.setSerialNo(item.getSerialNo());
            i4v.setExt(count);
            i4v.setCount(count);
            i4v.setName(item.getName());
            i4v.setId(item.getId());
            i4v.setCategory_id(item.getCategory_id());
            i4v.setPic_url(item.getPic_url());
            i4v.setPrice(item.getPrice());
            i4v.setShop_id(item.getShop_id());

            if (item.getCount() < count) {
                //库存剩余
                i4v.setExt(item.getCount());
                i4v.setCount(count);
                i4v.setInfo("只剩这些了,正在通知店家补货");
                ok = false;
            }
            infos.add(JSON.toJSON(i4v));
            itemls.add(i4v);
            price += i4v.getPrice() * i4v.getExt();
        }
        String order_id = SUtils.getOrderId();
        LoggerUtils.getInstance().log(String.format("  create new  order %s,  items %s  ", order_id, items),u);
        if (!ok) {
            LoggerUtils.getInstance().log("error order save return uk ",u);
            return "@" + Constants.LEAKERROR;
        }

        Order order = new Order();
        order.setOrder_id(order_id);
        order.setShop_id(shop_id);
        order.setAddress_id(address_id);
        order.setPrice(price);
        order.setRemarks(remarks);
        order.setInfo(infos.toJSONString());
        order.setSnapshot(items);
        if(!Constants.WXPAY.equals(act) ){
            order.setStatus(Constants.ORDER_WAIT_FOR_PRINT);         //已经确认的状态
        }else {
            order.setAct(act);
            order.setStatus(Constants.ORDER_PAY_PENDING);
        }
        order.setUser_id(user_id);
        int re = ordersDAO.insertUpdate(order, SUtils.generOrderTableName(shop_id));
        int o = userOrdersDAO.insertUpdate(order, SUtils.generUserOrderTableName(user_id));
        if (re != 1 || o != 1) {
            LoggerUtils.getInstance().log(" error order save return uk ",u);
            return "@" + Constants.UKERROR;
        }
        if(!Constants.WXPAY.equals(act)){
            sendInfo( u ,shop,order_id);
        }
        JSONObject response = new JSONObject();
        JSONObject data = new JSONObject();
        //添加微信支付pre_id()
        if(Constants.WXPAY.equals(act)){
            String attach = shop_id + "_" +user_id;
            LoggerUtils.getInstance().log(String.format("user_id %d order_id   %s get coupon_id %d  coupon %s ",
                    u.getId(),order_id,coupon_id,coupon_code),u);
            if (coupon_id != 0  && ! StringUtils.isBlank(coupon_code)){
                boolean can = ticketService.ticketCanUse(u.getId(), shop_id);
                if (!can){
                    return "@json:" + Constants.CANNOTUSETICKET;
                }
                UserCoupon ticket = ticketService.getTicket(u.getId(), coupon_id, coupon_code);
                if (ticket != null ){
                    LoggerUtils.getInstance().log(String.format("order_id %s  coupon_id %d price %d",order_id,coupon_id,ticket.getPrice()),u);
                    price = price - ticket.getPrice();
                    data.put("discount",ticket.getPrice()) ;
                    //满减不要大于 起送金额
                    if( price <=  0 ){
                        price = 1 ;
                    }
                    //使用代金券
                    attach = attach + "_" + ticket.getId();
                    update(order, ticket.getPrice());
                }else{
                    return "@json:" + Constants.CANNOTUSETHISTICKET;
                }
            }
            LoggerUtils.getInstance().log(String.format("order  %s get pre_id %d ", order_id, price),u);
            sb.append("生活超市若干商品");
            String  pre_id =  wxService.getPre_id(u.getWx_open_id(),order_id,price,attach ,sb.toString());
            String  js_id  = wxService.getJS_ticket();
            if ( StringUtils.isBlank(js_id) ||StringUtils.isBlank(pre_id) ) {
                LoggerUtils.getInstance().log("error order save return "+ js_id + " + "+ pre_id  + " " ,u);
                return "@" + Constants.TMPPAYERROR;
            }
            ordersDAO.updateWXPay(order_id, pre_id, act, SUtils.generOrderTableName(shop_id));
            userOrdersDAO.updateWXPay(order_id, pre_id, act, SUtils.generUserOrderTableName(user_id));
            data.put("js_ticket",js_id) ;
            data.put("pre_id",pre_id) ;

            // get hash from pre_id
            JSONObject res = this.getHash("prepay_id=" + pre_id, "MD5");

            data.put("signature", res.get("signature"));
            data.put("nonceStr", res.get("nonceStr"));
            data.put("timestamp", res.get("timestamp"));

            data.put("out_trade_no",order_id) ;
            data.put("total_fee", price) ;
        }
        data.put("order_id",order_id);
        response.put("data", data);
        response.put("code", 0);
        LoggerUtils.getInstance().log("  order save return " + response.toJSONString(),u);
        return "@json:" + response.toJSONString();
    }


        public JSONObject getHash(String pkg , String signt) {

        //prepay_id 通过微信支付统一下单接口拿到，paySign 采用统一的微信支付 Sign 签名生成方法，
        // 注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，
        // 即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。

        SortedMap<String,String> map  = new TreeMap <String,String> ();
        String nonce_str = Sha1Util.getNonceStr();
        String timestamp = Sha1Util.getTimeStamp();

        map.put("appId",SUtils.appId);
        map.put("nonceStr",nonce_str);
        map.put("package",pkg);
        map.put("signType", signt);
        map.put("timeStamp", timestamp);

        String sign =  SUtils.createSign(map).toUpperCase();

        JSONObject  data = new JSONObject();

        data.put("nonceStr", nonce_str);
        data.put("timestamp", timestamp);
        data.put("signature", sign);

        return data;
    }

    private void update(Order order, int price) {
        String msg = order.getMsg();
        JSONObject  mesg = (JSONObject) JSON.parse(msg);
        if (null == mesg){
            mesg = new JSONObject();
        }
        mesg.put("discount",price);
        String mess = mesg.toJSONString();
        order.setMsg(mess);
        ordersDAO.confirm(order.getOrder_id(),mess,SUtils.generOrderTableName(order.getShop_id())) ;
    }

    private boolean validata(long id, int coupon_id, String coupon_code) {
        UserCoupon ticket;

        return false;
    }
/**
 * 用户点击确认收货
 * @param inv
 * @param shop_id
 * @param order_id
 * @param confirm
 * @return
 */
    @Get("order_confirm")
    @Post("order_confirm")
    public String order_confirm(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id , @Param("confirm") String confirm ) {
        User u = holder.getUser();
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
            return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        LoggerUtils.getInstance().log(String.format("user %s order_confirm shop  %d  order %s  msg %s ", u.getId() ,shop_id , order_id,confirm));
        JSONObject result =  new JSONObject() ;
        JSONObject data =  new JSONObject() ;
        Order o = null;
        if ("done".equals(confirm)){
            o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
//            String msg = o.getMsg();
//            JSONObject om = orderService.getJson(msg);
//            om.put("confirm","done");
//            ordersDAO.confirm(order_id,om.toJSONString(),SUtils.generOrderTableName(shop_id));
//            userOrdersDAO.confirm(order_id,om.toJSONString(),SUtils.generUserOrderTableName(u.getId()));
            JSONObject orderInfo = orderService.getJson(o.getOrder_info());
            orderInfo.put("order_msg", "user order confirm");
            orderInfo.put("operator_time", Dateutils.tranferDate2Str(new Date()));
            ordersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(),OrderStatus.CONFIREMED.getCode(), SUtils.generOrderTableName(shop_id));
            userOrdersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.CONFIREMED.getCode(), SUtils.generUserOrderTableName(u.getId()));
            o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
            data.put("order", o); 
            String wxAct = o.getAct();
            if(StringUtils.isNotBlank(wxAct) && wxAct.equals("wx")){
            	LoggerUtils.getInstance().log("user confirm order id="+o.getOrder_id()+",is wx send!!!");
            	 smsService.sendConfirmSMS2Boss(o, shop);
            }else {
				LoggerUtils.getInstance().log("user confirm order id="+o.getOrder_id()+",is not wx dont send!!");
			}
        }
        result.put("data",data);
        result.put("code",0);
        return "@json:"+result.toJSONString();
    }
    /**
     * 用户取消订单
     * @param inv
     * @param shop_id
     * @param order_id
     * @param confirm
     * @return
     */
    @Get("order_cancel")
    @Post("order_cancel")
    public String order_cancel(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id , @Param("confirm") String confirm ) {
        User u = holder.getUser();
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
            return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        LoggerUtils.getInstance().log(String.format("user %s order_cancel shop  %d  order %s  msg %s ", u.getId() ,shop_id , order_id,confirm));
        JSONObject result =  new JSONObject() ;
        JSONObject data =  new JSONObject() ;
        Order o = null;
        if ("done".equals(confirm)){
            o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
            JSONObject orderInfo = orderService.getJson(o.getOrder_info());
            orderInfo.put("order_msg", "user cancel order");
            orderInfo.put("rever_status", o.getOrder_status());//rever_status : 用户申请退单点击错了，想回退（在后台点击回退的时候会根据这个状态来回滚用户点击退单之前的状态）
            orderInfo.put("operator_time", Dateutils.tranferDate2Str(new Date()));
            ordersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.USERCANCEL.getCode(), SUtils.generOrderTableName(shop_id));
            userOrdersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.USERCANCEL.getCode(), SUtils.generUserOrderTableName(u.getId()));
            o= ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
            data.put("order", o); 
            if(o != null){
            	//给客服和老板推送
            	String extra = pushService.getPushExtra(PushType.CANCEL_ORDER.getType(), o.getOrder_id(), "");
                pushService.sendUserCancel2KF(o, shop,extra);
                pushService.sendCancel2Boss(o, shop,extra);
            } 
        }
        result.put("data",data);
        result.put("code",0);
        return "@json:"+result.toJSONString();
    }
    /**
     * 用户催单
     * @param inv
     * @param shop_id
     * @param order_id
     * @param confirm
     * @return
     */
    @Get("order_remindShopping")
    @Post("order_remindShopping")
    public String order_remindShopping(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id , @Param("confirm") String confirm ) {
        User u = holder.getUser();
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
            return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        LoggerUtils.getInstance().log(String.format("user %s order_remindShopping shop  %d  order %s  msg %s ", u.getId() ,shop_id , order_id,confirm));
        JSONObject result =  new JSONObject() ;
        JSONObject data =  new JSONObject() ;
        Order o = null;
        if ("done".equals(confirm)){
            o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
            JSONObject orderInfo = orderService.getJson(o.getOrder_info());
            orderInfo.put("remind_order", "1");
            orderInfo.put("remind_time", Dateutils.tranferDate2Str(new Date()));
            ordersDAO.updateOrderInfo(order_id, orderInfo.toJSONString(), SUtils.generOrderTableName(shop_id));
            userOrdersDAO.updateOrderInfo(order_id, orderInfo.toJSONString(), SUtils.generUserOrderTableName(u.getId()));
            o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id)); 
            data.put("order", o);  
            if(o != null){
            	// 给老板和客服发推送
            	String extra = pushService.getPushExtra(PushType.REMIND_ORDER.getType(), o.getOrder_id(), "");
                pushService.sendRemind2Kf(o, shop,extra);
                pushService.sendRemindOrder2Boss(o, shop,extra);
            }
        }
        result.put("data",data);
        result.put("code",0);
        return "@json:"+result.toJSONString();
    }


    @Get("pay_cb")
    @Post("pay_cb")
    public String pay_cb(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id , @Param("msg") String msg) {
        User u = holder.getUser();
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
             return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        Order order = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop_id));
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        LoggerUtils.getInstance().log(String.format("user %s pay_cb shop  %d  order %s  msg %s ", u.getId() ,shop_id , order_id,msg));
        if ("paydone".equals(msg)){
            // do nothing
        }
//        else{
//            ordersDAO.paydone(Constants.ORDER_PAY_FAIL,order_id,SUtils.generOrderTableName(shop_id));
//            userOrdersDAO.paydone(Constants.ORDER_PAY_FAIL,order_id,SUtils.generUserOrderTableName(u.getId()));
//        }
        return "@json:"+Constants.DONE;
    }

    private void sendInfo(User u ,Shop shop ,String order_id){

            //smsService.sendSMS2LocPush(order_id, shop);
    	    smsService.sendSMS2KF(order_id, shop);
            pushService.send2locPush(order_id, shop);
            pushService.send2kf(order_id, shop);
            // 发送wx 通知
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

//              System.out.println("send sms to user");
//              smsService.sendSMS2User(order_id, shop);

            }
    }

}


