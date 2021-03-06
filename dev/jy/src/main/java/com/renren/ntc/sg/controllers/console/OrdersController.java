package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.OrderDetail;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.AddressDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.service.OrderService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ZhaoXiuFei on 2015/4/17 18:03.
 */
@Path("orders")
public class OrdersController {


    @Autowired
    AddressDAO addressDAO;

    @Autowired
    ShopDAO shopDAO;

    @Autowired
    OrdersDAO ordersDAO;

    @Autowired
    OrderService orderService;

    @Get("advQuery")
    @Post("advQuery")
    public String index(Invocation inv, @Param("value") String value) {
        if (StringUtils.isBlank(value)) {
            return "@ value is null !";
        }
        List<Order> orderls = new ArrayList<Order>();

        String v = value.trim();
//        查询全部审核的店的id
        List<Shop> shopList = shopDAO.getAllShopsByAudit(Constants.SHOP_ANDITED);
        for (Shop s : shopList) {
            //先按 orders_id 查询  有值 直接返回 到页面
            Order o = ordersDAO.getByOrderId(SUtils.generOrderTableName(s.getId()), v);
            if (null != o) {
                orderls.add(o);
                break;
            }
            // 否则按电话查询
            List<Order> orders = ordersDAO.getByPhone(SUtils.generOrderTableName(s.getId()), v);
            if (!CollectionUtils.isEmpty(orders)) {
                System.out.println(SUtils.generOrderTableName(s.getId()));
                orderls.addAll(orders);
//                break;   有可能在多个店买东西
            }
        }

        orderls = orderService.forV(orderls);
        List<OrderDetail> orderDetails = orderService.setOrderDetail(orderls);
        inv.addModel("shop_id", 1);
        inv.addModel("shops",shopList);
        inv.addModel("orderls", orderDetails);
        System.out.println(orderls.size() + "OrdersController.java.OrdersController.OK---->" + 88);
        return "all_shop_orders";
    }
}
