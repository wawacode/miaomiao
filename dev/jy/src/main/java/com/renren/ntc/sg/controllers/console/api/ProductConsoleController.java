package com.renren.ntc.sg.controllers.console.api;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.OrderService;

@DenyCommonAccess
@Path("product")
public class ProductConsoleController extends BasicConsoleController{
	@Autowired
	private ShopDAO shopDAO;

    @Autowired
    private OrdersDAO ordersDAO ;

    @Autowired
    private OrderService orderService ;

    @Autowired
    private ProductDAO productDAO;

    @Autowired
	private RegistHostHolder hostHolder;

    @Autowired
    private ItemsDAO itemsDAO ;

    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;

	ProductConsoleController(){
       
    }
    
    @Post("get")
    @Get("get")
    public String order(Invocation inv, @Param("serialNo") String serialNo) {

        if(StringUtils.isBlank(serialNo)){
            return "@json:" + getActionResult(1, "缺少必要参数");
        }
        Product product = productDAO.geProduct(serialNo);
        JSONObject   resultJson = new JSONObject();
        if (product == null){
            product = new Product();
            product.setSerialNo(serialNo);
        }
        resultJson.put("product",JSONObject.toJSON(product));
        return "@json:"+getDataResult(0, resultJson);
    }
}
