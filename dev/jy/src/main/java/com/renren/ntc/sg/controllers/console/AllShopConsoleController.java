package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.Category;
import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

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


    @Post("")
    @Get("")
    public String index(Invocation inv ,
                        @Param("from") int from, @Param("offset") int offset){

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 50 ;
        }

        List<Shop> shopls  =  shopDAO.getAllShops(from,offset);

        inv.addModel("shopls", shopls);
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
    public String edit(Invocation inv,@Param("item") String item){

        return  "@" ;
    }

}
