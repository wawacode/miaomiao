package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.mongo.MongoDBUtil;
import com.renren.ntc.sg.service.*;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import com.renren.ntc.sg.util.wx.MD5Util;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URLEncoder;
import java.util.*;

@Path("order")
public class OrderController {

    private static int DEFAULT_SHOP_ID = 1;
    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public OrdersDAO ordersDAO;


    @Autowired
    public UserOrdersDAO userOrdersDAO;

    @Autowired
    public OrdersDAO cDAO;

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
    public PushService pushService;



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
                       @Param("items") String items, @Param("act") String act) {

        User u = holder.getUser();
        long user_id = 0;
        if (null != u) {
            user_id = u.getId();
        }
        Shop shop = shopDAO.getShop(shop_id);
        if (null == shop) {
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  ", shop_id));
            return "@" + Constants.PARATERERROR;
        }

        if (address_id == 0) {
            Address add = new Address();
            if (StringUtils.isBlank(phone) || StringUtils.isBlank(address)) {
                inv.addModel("msg", " phone or adderes is null");
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
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  items %s", shop_id, items));
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
            sb.append(i4v.getName()).append(" 数量").append(i4v.getExt() + " ");
            price += i4v.getPrice() * i4v.getExt();
        }
        String order_id = SUtils.getOrderId();
        LoggerUtils.getInstance().log(String.format("create new  order %s,  items %s  ", order_id, items));
        if (!ok) {
            return "@" + Constants.LEAKERROR;
        }
        //库存变化 不再处理库存
//        for (Item4V it : itemls) {
//            int count = it.getCount();
//            long s_id = it.getShop_id();
//            long i_id = it.getId();
//            JSONObject jb = new JSONObject();
//
//            itemsDAO.decr(SUtils.generTableName(s_id), s_id, i_id, count);
//            LoggerUtils.getInstance().log(String.format(" item  %d   decr %d", i_id, count));
//        }
        Order order = new Order();
        order.setOrder_id(order_id);
        order.setShop_id(shop_id);
        order.setAddress_id(address_id);
        order.setPrice(price);
        order.setRemarks(remarks);
        order.setInfo(infos.toJSONString());
        order.setSnapshot(items);
        order.setStatus(1);         //已经确认的状态
        order.setUser_id(user_id);
        int re = ordersDAO.insertUpdate(order, SUtils.generOrderTableName(shop_id));
        int o = userOrdersDAO.insertUpdate(order, SUtils.generUserOrderTableName(user_id));
        if (re != 1 || o != 1) {
            return "@" + Constants.UKERROR;
        }
        if("wx".equals(act)){
            sendInfo(shop,order_id);
        }

        JSONObject response = new JSONObject();
        JSONObject data = new JSONObject();
        //添加微信支付pre_id()
        if("wx".equals(act)){
            String  pre_id =  wxService.getPre_id(u.getWx_open_id(),order_id,price,order_id,sb.toString());
            String  js_id  = wxService.getJS_ticket();
            if ( StringUtils.isBlank(js_id) ||StringUtils.isBlank(pre_id) ) {
                return "@" + Constants.UKERROR;
            }
            data.put("js_ticket",js_id) ;
            data.put("pre_id",pre_id) ;
            data.put("out_trade_no",order_id) ;
            data.put("total_fee",price) ;
        }
        data.put("order_id",order_id);
        response.put("data", data);
        response.put("code", 0);
        return "@json:" + response.toJSONString();
    }


    @Get("pay_cb")
    @Post("pay_cb")
    public String pay_cb(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id , @Param("msg") String msg) {
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
             return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        LoggerUtils.getInstance().log(String.format(" pay_cb shop  %d  order %s  msg %s ",order_id,msg));
        if ("paydone".equals(msg)){
            ordersDAO.paydone(4,order_id);
        }

        return "@json:"+Constants.DONE;
    }

    private void sendInfo( Shop shop ,String order_id){
            smsService.sendSMS2LocPush(order_id, shop);
            pushService.send2locPush(order_id, shop);
            pushService.send2kf(order_id, shop);
            // 发送短信通知
            Device devcie = deviceDAO.getDevByShopId(shop.getId());
            if (null == devcie || SUtils.isOffline(devcie)) {
                System.out.println("device is null or  printer offline ");
                // 发送通知给 用户和 老板     \
                System.out.println("send push to boss");
                pushService.send2Boss(order_id, shop);
                System.out.println("send sms to boss");
                smsService.sendSMS2Boss(order_id, shop);
                System.out.println("send sms to user");
                smsService.sendSMS2User(order_id, shop);
       }
    }

}


