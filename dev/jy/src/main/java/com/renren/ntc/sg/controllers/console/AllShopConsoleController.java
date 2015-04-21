package com.renren.ntc.sg.controllers.console;

import java.util.Date;
import java.util.List;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.poi.poifs.crypt.dsig.facets.Office2010SignatureFacet;
import org.apache.velocity.tools.generic.DateTool;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.OrderDetail;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.CategoryDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.biz.dao.UserDAO;
import com.renren.ntc.sg.biz.dao.UserOrdersDAO;
import com.renren.ntc.sg.constant.OrderStatus;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.OrderService;
import com.renren.ntc.sg.service.SMSService;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;

/**
 * 
 * Regist
 */

@DenyCommonAccess
@LoginRequired
@Path("allshop")
public class AllShopConsoleController {

    @Autowired
    private ItemsDAO itemsDAO ;

	@Autowired
	private ProductDAO productDAO;

    @Autowired
    private ShopDAO shopDAO ;

    @Autowired
    private CategoryDAO categoryDAO;


	@Autowired
	private RegistHostHolder hostHolder;

	@Autowired
    private OrdersDAO ordersDAO ;

    @Autowired
    OrderService orderService ;
    
    @Autowired
    UserDAO userDAO;
    
    @Autowired
    UserOrdersDAO userOrdersDAO;
    
    @Autowired
    SMSService smsService;
    
    @Autowired
    WXService wxService;

    @Post("")
    @Get("")
    public String index(Invocation inv ,
                        @Param("from") int from, @Param("offset") int offset){

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 100; //2015-04-09 update 100 by ZhaoXiuFei
        }

        List<Shop> shopls  =  shopDAO.getAllShops(from,offset);
        
        if(from != 0){
        	int begin = from;
        	begin = begin - offset;
           inv.addModel("previous_f", begin< 0?0:begin);
        }
        if(shopls.size() >=  offset){
           inv.addModel("next_f", from  + offset);
        }
        inv.addModel("shopls", shopls);
        inv.addModel("date", new DateTool()); 
        return "allshop";
    }



    @Post("del")
    @Get("del")
    public String del(Invocation inv, @Param("id") long id){

        return "items";
    }


    @Post("add")
    public String add(Invocation inv,@Param("item") String item){

        return  "@" ;
    }

    @Post("edit")
    public String edit(Invocation inv,@Param("id") String str_id,
            @Param("value") String value){
    	if( null == str_id){
            LoggerUtils.getInstance().log(String.format("all shop edit str_id is null %s ",str_id));
            return "@error" ;
        }
        String[] keys = str_id.split("-");
        if(keys.length != 3){
            LoggerUtils.getInstance().log(String.format("all shop edit length is not 3 str_id is null %s ",str_id));
            return "@error" ;
        }
        if ( null == value ) {
            return "@error" ;
        }
        long shop_id =  Long.valueOf(keys[1]);
        String  key = keys[2];
        if(StringUtils.isNotBlank(value)){
        	value = value.trim();
        }
        if("open_time".equals(key)){
        	value = Dateutils.getDateStrByCondition(value);
        }
        if("close_time".equals(key)){
        	value = Dateutils.getDateStrByCondition(value);
        }
        if("open_time".equals(key) || "close_time".equals(key)){
        	if(StringUtils.isBlank(value)){
        		value = null;
        	}
        }

        shopDAO.update(shop_id, key, value);
        return  "@"+Constants.DONE ;
    }
    
    @Post("orders")
    @Get("orders")
    public String allShopOrders(Invocation inv,@Param("operation") String operation, @Param("shop_id") long shop_id,@Param("from") int from, @Param("offset") int offset){
    	if(shop_id == 0L){
    		shop_id = Constants.DEFAULT_SHOP;
    	}
    	if (StringUtils.isBlank(operation)){
        	operation = "order";//默认查询已完成订单
        }
    	//查询全部审核的店的id
    	List<Shop> shopList = shopDAO.getAllShopsByAudit(Constants.SHOP_ANDITED);
        if(CollectionUtils.isEmpty(shopList)){
        	return "";
        }
        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 20 ;
        }
        List<Order> orderls = null;
        if ("unfinishedOrder".equals(operation.trim())) {//未完成订单
        	orderls = ordersDAO.getUnfinishedOrders(SUtils.generOrderTableName(shop_id), shop_id, from, offset);
        	inv.addModel("operation","unfinishedOrder");
		}else if ("order".equals(operation)){//已完成订单
			orderls = ordersDAO.get10Orders(shop_id,from,offset,SUtils.generOrderTableName(shop_id));
			inv.addModel("operation","order");
		}else{
			 LoggerUtils.getInstance().log("operation can't be empty!");
			 return "@error";
		}
       // List<Order> orderls = ordersDAO.get10Orders(shop_id,from,offset,SUtils.generOrderTableName(shop_id));
        orderls = orderService.forV(orderls);
       List<OrderDetail> orderDetails = orderService.setOrderDetail(orderls);
        if(from != 0){
        	int begin = from;
        	begin = begin - offset;
           inv.addModel("previous_f", begin< 0?0:begin);
        }
        if(orderls.size() >=  offset){
           inv.addModel("next_f", from  + offset);
        }
        Shop shop = shopDAO.getShop(shop_id);
        inv.addModel("shop",shop);
        inv.addModel("orderls",orderDetails);
        inv.addModel("shops",shopList);
        inv.addModel("curr_shop_d",shop_id);
        return "all_shop_orders";
    }
    
    @Get("order_cancel")
    @Post("order_cancel")
    public String order_cancel(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id) {
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
            return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        Order o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
        long userId = o.getUser_id();
        LoggerUtils.getInstance().log(String.format("kf %s order_cancel shop  %d  order %s", userId ,shop_id , order_id));
        JSONObject orderInfo = orderService.getJson(o.getOrder_info());
        orderInfo.put("order_msg", "kf cancel order");
        orderInfo.put("operator_time", Dateutils.tranferDate2Str(new Date()));
        ordersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.KFCANCEL.getCode(), SUtils.generOrderTableName(shop_id));
        userOrdersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.KFCANCEL.getCode(), SUtils.generUserOrderTableName(userId));
        //给用户发|微信公众号：“很抱歉商家xxx无法配送您的订单xxxx，退款xx元将在3-5个工作日返还到您原支付账户，请注意查收，如有问题请联系喵喵客服4008816807。”
        wxService.cancelOrdersendWX2User(o, shop);
        return "@退单成功";

 }
    
    @Get("order_comfirm")
    @Post("order_comfirm")
    public String order_comfirm(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id) {
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
            return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        Order o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
        long userId = o.getUser_id();
        LoggerUtils.getInstance().log(String.format("kf %s order_comfirm shop  %d  order %s", userId ,shop_id , order_id));
        JSONObject orderInfo = orderService.getJson(o.getOrder_info());
        orderInfo.put("order_msg", "kf comfirm order");
        orderInfo.put("operator_time", Dateutils.tranferDate2Str(new Date()));
        ordersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.DELIVERIES.getCode(), SUtils.generOrderTableName(shop_id));
        userOrdersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.DELIVERIES.getCode(), SUtils.generUserOrderTableName(userId));
        wxService.sendWX2User(order_id,shop_id);//发送微信消息给用户
        return "@订单确认成功";

    }
    /**
     * 此操作只作用于老板误点击无法配送或者是用户误点击取消订单 状态回回到之前的操作的状态
     * @param inv
     * @param shop_id
     * @param order_id
     * @return
     */
    @Get("order_reject")
    @Post("order_reject")
    public String order_reject(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id) {
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
            return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        Order o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
        long userId = o.getUser_id();
        LoggerUtils.getInstance().log(String.format("kf %s order_reject shop  %d  order %s", userId ,shop_id , order_id));
        JSONObject orderInfo = orderService.getJson(o.getOrder_info());
        orderInfo.put("order_msg", "kf order_reject");
        orderInfo.put("operator_time", Dateutils.tranferDate2Str(new Date()));
        int reverCode = OrderStatus.TOCONFIREMED.getCode();
        try {
			Integer preStatusCode = (Integer)orderInfo.get("rever_status");
			if(OrderStatus.USERCANCEL.getCode() == o.getOrder_status()){
				if(preStatusCode != null){
			    	reverCode = preStatusCode;
			    	if(reverCode != OrderStatus.TOCONFIREMED.getCode() && reverCode != OrderStatus.DELIVERIES.getCode()){
			    		reverCode = OrderStatus.TOCONFIREMED.getCode();
			    	}
			    }
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
        LoggerUtils.getInstance().log(String.format("kf %s order_reject shop  %d  order %s backtostatus %d", userId ,shop_id , order_id,reverCode));
        ordersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), reverCode, SUtils.generOrderTableName(shop_id));
        userOrdersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), reverCode, SUtils.generUserOrderTableName(userId));
        return "@订单状态驳回成功";

    }
    
    @Get("order_user_confirm")
    @Post("order_user_confirm")
    public String order_user_confirm(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id) {
        if(StringUtils.isBlank(order_id) || shop_id ==0  ){
            return "@json:"+Constants.PARATERERROR;
        }
        Shop shop = shopDAO.getShop(shop_id);
        if ( null == shop ){
            return "@json:"+Constants.PARATERERROR;
        }
        Order o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
        long userId = o.getUser_id();
        LoggerUtils.getInstance().log(String.format("kf %s order_user_confirm shop  %d  order %s", userId ,shop_id , order_id));
        JSONObject orderInfo = orderService.getJson(o.getOrder_info());
        orderInfo.put("order_msg", "kf user_comfirm");
        orderInfo.put("operator_time", Dateutils.tranferDate2Str(new Date()));
        ordersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.CONFIREMED.getCode(), SUtils.generOrderTableName(shop_id));
        userOrdersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.CONFIREMED.getCode(), SUtils.generUserOrderTableName(userId));
        String wxAct = o.getAct();
        if(StringUtils.isNotBlank(wxAct) && wxAct.equals("wx")){
        	LoggerUtils.getInstance().log("kf userconfirm shop id="+shop_id+",order id="+o.getOrder_id()+",is wx send!!!");
        	 smsService.sendConfirmSMS2Boss(o, shop);
        }else {
			LoggerUtils.getInstance().log("kf userconfirm shop id="+shop_id+",order id="+o.getOrder_id()+",is not wx dont send!!");
		}
        return "@订单确认成功";

    }
    
    @Post("query")
    @Get("query")
    public String del(Invocation inv, @Param("query") String text) {

        if (StringUtils.isBlank(text)) text = "";
        List<Shop> shopls = shopDAO.getShops(SUtils.wrap(text.trim()));
        inv.addModel("shopls", shopls);
        return "allshop";
    }

}
