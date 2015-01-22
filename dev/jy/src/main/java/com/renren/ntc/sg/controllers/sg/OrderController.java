package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.dao.*;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.service.AddressService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@Path("order")
public class OrderController {

    private static int DEFAULT_SHOP_ID = 1;
    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public OrdersDAO orderDAO;
    @Autowired
    public OrdersDAO cDAO;

    @Autowired
    public NtcHostHolder holder;


    @Autowired
    public ItemsDAO itemsDAO;


    @Autowired
    public CatStaffCommitDAO catStaffCommitDao;

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    public AddressDAO addressDAO;

    @Autowired
    public AddressService sddressService;

    public static String SMSURL = "http://v.juhe.cn/sms/send";
    public static String APPKEY = "99209217f5a5a1ed2416e5e6d2af87fd";
    public static String TID = "777";


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
                       @Param("items") String items, @Param("order_id") String order_id) {

        User u = holder.getUser();
        long user_id = 0;
        if (null != u) {
            user_id = u.getId();
        }
        if (0 >= shop_id) {
            shop_id = Constants.DEFAULT_SHOP;
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
        inv.addModel("remarks", remarks);
        boolean ok = true;
        JSONArray jbarr = (JSONArray) JSONArray.parse(items);
        int price = 0;
        JSONArray infos = new JSONArray();
        List<Item4V> itemls = new ArrayList<Item4V>();
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
            price += i4v.getPrice() * i4v.getExt();
        }
        if (!SUtils.islegal(order_id)) {
            order_id = SUtils.getOrderId();
            LoggerUtils.getInstance().log(String.format("create new  order %s,  items %s  ", order_id, items));
        }
        inv.addModel("shop", shop);
        inv.addModel("order_id", order_id);
        inv.addModel("itemls", itemls);
        if (!ok) {
            return "@" + Constants.LEAKERROR;
        }


        //库存变化 TODO

        for (Item4V it : itemls) {
            int count = it.getCount();
            long s_id = it.getShop_id();
            long i_id = it.getId();
            JSONObject jb = new JSONObject();

            itemsDAO.decr(SUtils.generTableName(s_id), s_id, i_id, count);
            LoggerUtils.getInstance().log(String.format(" item  %d   decr %d", i_id, count));
        }
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
        int re = orderDAO.insertUpdate(order, SUtils.generOrderTableName(shop_id));
        if (re != 1) {
            return "@" + Constants.UKERROR;
        }
        //发送短信通知
        try {
            Order value = orderDAO.getOrder(order_id, SUtils.generOrderTableName(shop_id));
            String v = null;
            String url;
            String mobile = "";
            byte[] t = null;
            String response = "用户下单";
            long adr_id = value.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String vv = adrs.getAddress() + " " + adrs.getPhone() + " " + value.getOrder_id() ;
            float  p = (float)value.getPrice() /100 ;
            vv = vv.replaceAll("=", "").replaceAll("&", "");
            String ro = response.replace("=", "").replace("&", "");
            String message = "#address#=" + vv + "&#status#=" + ro + "&#price#=" + p;
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            // 发短信给  黄炜元
            url = SUtils.forURL(SMSURL, APPKEY, TID, "18612274066", message);
            System.out.println(String.format("Send  SMS mobile %s %s ,%s ", mobile, value.getOrder_id(), url));
            t = SHttpClient.getURLData(url, "");
            response = SUtils.toString(t);
            System.out.println(String.format("Post Shop SMS message No. %s : %s , %s  %s ", value.getOrder_id(), response, mobile, url));

            // 发短信给  地推人员
            CatStaffCommit  catStaffCommit  = catStaffCommitDao.getbyShopid(shop_id);
            if (catStaffCommit != null ){
            phone = catStaffCommit.getPhone();
            url = SUtils.forURL(SMSURL, APPKEY, TID,phone , message);
            System.out.println(String.format("Send  SMS mobile %s %s ,%s ", mobile, value.getOrder_id(), url));
            t = SHttpClient.getURLData(url, "");
            response = SUtils.toString(t);
            System.out.println(String.format("Post Shop SMS message No. %s : %s , %s  %s ", value.getOrder_id(), response, mobile, url));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        JSONObject response =  new JSONObject();
        JSONObject data =  new JSONObject();
        response.put("data", data);
        response.put("code", 0);
        return "@" +  Constants.DONE;
        // 发送短信通知
//        return "r:/sg/user/profile?shop_id=" + shop_id;
    }


}


