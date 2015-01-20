package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.AddressDAO;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.dao.*;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.service.AddressService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.OrderService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Path("user")
public class UserController {

    private static int DEFAULT_SHOP_ID = 1;
    @Autowired
    public ShopDAO shopDAO;


    @Autowired
    OrderService orderService ;

    @Autowired
    public OrdersDAO orderDAO;

    @Autowired
    public NtcHostHolder holder;

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    public AddressDAO addressDAO;

    @Autowired
    public AddressService addressService;


    // 检查库存
    // 判断地址是否Ok

    @Get("profile")
    @Post("profile")
    public String save(Invocation inv,@Param("shop_id") long shop_id ) {

        User u = holder.getUser();
        long user_id = 0;
        if (null != u) {
            user_id = u.getId();
        }

        Shop shop = shopDAO.getShop(shop_id);
        List<Address>  addressls = addressDAO.getAddresses(user_id,0,1);
        List<Order>  orders = orderDAO.getOrder(user_id,0,20,SUtils.generOrderTableName(shop_id));

        inv.addModel( "addressls",addressls);
        orders = orderService.forV(orders)  ;
        inv.addModel("shop",shop);
        inv.addModel( "orders",orders);

        JSONObject response =  new JSONObject();
        JSONObject data =  new JSONObject();
        data.put("shop", JSON.toJSON(shop));
        data.put("orders", JSON.toJSON(orders));
        data.put("addressls", JSON.toJSON(addressls));
        response.put("data", data);
        response.put("code", 0);

        return "@" + response.toJSONString();
//        return "user";
    }
}


