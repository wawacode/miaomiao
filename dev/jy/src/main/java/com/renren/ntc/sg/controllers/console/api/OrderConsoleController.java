package com.renren.ntc.sg.controllers.console.api;

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
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.OrderService;
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

	OrderConsoleController(){
       
    }
	@Post("summary")
    @Get("summary")
    public String search(Invocation inv, @Param("beginDate") String beginDate, @Param("endDate") String endDate){
		if(StringUtils.isBlank(beginDate) || StringUtils.isBlank(endDate)){
			return "@"+Constants.PRERROR.replace("{msg}", "搜索订单开始或者结束日期为空");
		}
		beginDate = beginDate+" 00:00:00";
		endDate = endDate+" 23:59:59";
		Date begin = Dateutils.transferToDatebyCondition(beginDate);
		Date end = Dateutils.transferToDatebyCondition(endDate);
		if(begin.getTime() > end.getTime()){
			return "@"+Constants.PRERROR.replace("{msg}", "开始时间不能大于结束时间");
		}
		Shop shop = (Shop)inv.getAttribute("shop");
		List<Order> orders = ordersDAO.getOrder(beginDate, endDate, SUtils.generOrderTableName(shop.getId()));
		int orderTotalPrice=0;
		for(Order order : orders){
			if(order.getShop_id() == shop.getId()){
				orderTotalPrice += order.getPrice();
			}
		}
		JSONObject result =  new JSONObject() ;
        JSONObject data =  new JSONObject() ;
        data.put("ordernum",orders.size());
        data.put("totalPrice", ((float )orderTotalPrice/100) +"元");
        result.put("data",data);
        result.put("code",0);
        return "@json" + result.toJSONString();
	}
    
    @Post("list")
    @Get("list")
    public String order(Invocation inv, @Param("shop_id") long shop_id, @Param("from") int from, @Param("offset") int offset){
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, "店铺不存在");
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
        return "@json"+getDataResult(0, resultJson);
    }
}
