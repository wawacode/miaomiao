package com.renren.ntc.sg.controllers.console.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopCategory;
import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.biz.dao.UserDAO;
import com.renren.ntc.sg.biz.dao.UserOrdersDAO;
import com.renren.ntc.sg.constant.OrderStatus;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.OrderService;
import com.renren.ntc.sg.service.PushService;
import com.renren.ntc.sg.service.SMSService;
import com.renren.ntc.sg.service.TicketService;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SUtils;
@DenyCommonAccess
@Path("order")
public class OrderConsoleController extends BasicConsoleController{
	@Autowired
	private ShopDAO shopDAO;

    @Autowired
    private OrdersDAO ordersDAO ;

    @Autowired
    private OrderService orderService ;
    
    @Autowired
	private RegistHostHolder hostHolder;
    
    @Autowired
    private ItemsDAO itemsDAO ;
    
    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;
    
    @Autowired
    public UserOrdersDAO userOrdersDAO;
    
    @Autowired
    public SMSService smsService;

    @Autowired
    public WXService wxService;

    @Autowired
    public PushService pushService;
    
    @Autowired
    public UserDAO userDAO;

	public  OrderConsoleController(){
       
    }

    @Post("read")
    @Get("read")
    public String read(Invocation inv,@Param("shop_id") long shop_id, @Param("order_id") String order_id){

            ordersDAO.read(SUtils.generOrderTableName(shop_id),order_id);

        return "@json:" + Constants.DONE;

    }



	@Post("summary")
    @Get("summary")
    public String search(Invocation inv, @Param("beginDate") String beginDate, 
    									 @Param("endDate") String endDate,
    									 @Param("shop_id") long shop_id){
		Shop shop = isExistShop(shop_id);

        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
        List<Order> orders = new ArrayList<Order>();
		if(StringUtils.isBlank(beginDate) && StringUtils.isBlank(endDate)){
			orders = ordersDAO.getFinalOrder(shop_id, SUtils.generOrderTableName(shop.getId()));
		}else {
			if(StringUtils.isBlank(beginDate) || StringUtils.isBlank(endDate)){
				return "@json:"+Constants.PRERROR.replace("{msg}", "搜索订单开始或者结束日期为空");
			}
			beginDate = beginDate+" 00:00:00";
			endDate = endDate+" 23:59:59";
			Date begin = Dateutils.transferToDatebyCondition(beginDate);
			Date end = Dateutils.transferToDatebyCondition(endDate);
			if(begin.getTime() > end.getTime()){
				return "@json:"+Constants.PRERROR.replace("{msg}", "开始时间不能大于结束时间");
			}
			orders = ordersDAO.getOrder(beginDate, endDate, SUtils.generOrderTableName(shop.getId()));
		}
        LoggerUtils.getInstance().log(String.format("get items from table  %s  shop_id %d  " ,SUtils.generTableName(shop.getId()), shop.getId()));
		int itemCount = itemsDAO.getCountOfItemByShopId(SUtils.generTableName(shop.getId()), shop.getId());
		List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shop.getId());
		int catCount = categoryls.size();
		int orderTotalPrice=0;
		for(Order order : orders){
			if(order.getShop_id() == shop.getId()){
				orderTotalPrice += order.getPrice();
			}
		}
		JSONObject result =  new JSONObject() ;
        JSONObject data =  new JSONObject() ;
        JSONObject orderDetail =  new JSONObject() ;
        JSONObject productJson =  new JSONObject() ;
        JSONObject catJson =  new JSONObject() ;
        orderDetail.put("totalCount", orders.size());
        orderDetail.put("totalPrice", ((float )orderTotalPrice/100) +"元");
        productJson.put("totalCount", itemCount);
        catJson.put("totalCount", catCount);
        data.put("shop",shop);
        data.put("order", orderDetail);
        data.put("product", productJson);
        data.put("cat", catJson);
        result.put("data",data);
        result.put("code",0);
        return "@json:" + result.toJSONString();
	}
    
    @Post("list")
    @Get("list")
    public String order(Invocation inv, @Param("shop_id") long shop_id, @Param("from") int from, @Param("offset") int offset){
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 50 ;
        }
        List<Order> orderls = ordersDAO.get10Orders(shop_id,from,offset,SUtils.generOrderTableName(shop_id));
        JSONObject resultJson = new JSONObject();
        if(from != 0){
        	int begin = from;
        	begin = begin - offset;
        	resultJson.put("previous_f", begin< 0?0:begin);
        }
        if(orderls.size() >=  offset){
        	resultJson.put("next_f", from  + offset);
        }
        orderls = orderService.forV(orderls);
        resultJson.put("shop",shop);
        resultJson.put("orderls",orderls);
        return "@json:"+getDataResult(0, resultJson);
    }
    /**
     * 店家点击确认配送
     * @param inv
     * @param shop_id
     * @param order_id
     * @param confirm
     * @return
     */
    @Get("order_confirm")
    @Post("order_confirm")
    public String order_deliveries(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id , @Param("confirm") String confirm ) {
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
        LoggerUtils.getInstance().log(String.format("boss order_confirm shop  %d  order %s  msg %s ",shop_id , order_id,confirm));
        JSONObject result =  new JSONObject() ;
        JSONObject data =  new JSONObject() ;
        if ("done".equals(confirm)){
        	Order o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
        	 JSONObject orderInfo = orderService.getJson(o.getOrder_info());
             orderInfo.put("order_msg", "老板点击订单配送");
             orderInfo.put("operator_time", Dateutils.tranferDate2Str(new Date()));
            ordersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(),OrderStatus.DELIVERIES.getCode(), SUtils.generOrderTableName(shop_id));
            User user = userDAO.getUser(o.getUser_id());
            userOrdersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(), OrderStatus.DELIVERIES.getCode(), SUtils.generUserOrderTableName(user.getId()));
            o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
            data.put("order", o);       
        }
        result.put("data",data);
        result.put("code",0);
        wxService.sendWX2User(order_id,shop_id);//发送微信消息给用户
        return "@json:"+result.toJSONString();
    }
    /**
     * 商家点击无法配送 （给用户和客服发短信 给客服和地推发推送）
     * @param inv
     * @param shop_id
     * @param order_id
     * @param confirm
     * @return
     */
    @Get("order_cancel")
    @Post("order_cancel")
    public String order_cancel(Invocation inv, @Param("shop_id") long shop_id, @Param("order_id") String order_id , @Param("confirm") String confirm ) {
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
        LoggerUtils.getInstance().log(String.format("boss order_cancel shop  %d  order %s  msg %s ",shop_id , order_id,confirm));
        JSONObject result =  new JSONObject() ;
        JSONObject data =  new JSONObject() ;
        Order o = null;
        if ("done".equals(confirm)){
        	o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
            JSONObject orderInfo = orderService.getJson(o.getOrder_info());
            orderInfo.put("order_msg", "boss cancel order");
            orderInfo.put("operator_time", Dateutils.tranferDate2Str(new Date()));
            ordersDAO.updateOrderStatus(order_id, orderInfo.toJSONString(),OrderStatus.BOSSCANCEL.getCode(), SUtils.generOrderTableName(shop_id));
            User user = userDAO.getUser(o.getUser_id());
            userOrdersDAO.updateOrderStatus(order_id,orderInfo.toJSONString(), OrderStatus.BOSSCANCEL.getCode(), SUtils.generUserOrderTableName(user.getId()));
            o = ordersDAO.getOrder(order_id,SUtils.generOrderTableName(shop_id));
            data.put("order", o);       
        }
        result.put("data",data);
        result.put("code",0);
        return "@json:"+result.toJSONString();
    }
}
