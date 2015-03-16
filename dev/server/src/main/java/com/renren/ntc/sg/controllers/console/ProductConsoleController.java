package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.CategoryDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
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
@Path("product")
public class ProductConsoleController {



    @Autowired
    private ItemsDAO itemsDAO ;

	@Autowired
	private ProductDAO productDAO;

    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;

    @Autowired
    private CategoryDAO categoryDAO;


	@Autowired
	private RegistHostHolder hostHolder;


	//注册的时候ajax校验用户名，违禁词和嫌疑词不让注册
    //注册的时候ajax校验用户名，违禁词和嫌疑词不让注册
    @Post("")
    @Get("")
    public String index(Invocation inv ,@Param("category_id") long category_id ,
                        @Param("from") int from, @Param("offset") int offset){

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 50 ;
        }
        List<Category> categoryls  = categoryDAO.getCategory();

        if ( 0 == category_id ){
            if (categoryls.size() > 0){
                category_id =  categoryls.get(0).getId();
            }
            else{
                LoggerUtils.getInstance().log(String.format(" category is 0  && no category find "));
                return "product";
            }
        }
        List<Product> pdls = productDAO.geProducts(category_id,from,offset);
        if(from != 0){
            from = from - offset;
            inv.addModel("previous_f", from< 0?0:from);
        }
        if(pdls.size() >=  offset){
            inv.addModel("next_f", from  + offset);
        }
        inv.addModel("itemls", pdls);
        inv.addModel("categoryls",categoryls);
        inv.addModel("curr_cate_id",category_id);
        return "product";
    }

    @Post("query")
    @Get("query")
    public String query(Invocation inv, @Param("query") String query){
        List<Category> categoryls  = categoryDAO.getCategory();
        long category_id =  categoryls.get(0).getId();
        query = SUtils.wrap(query);
        List<Product> pdls = productDAO.geProducts(query);

        inv.addModel("curr_cate_id",category_id);
        inv.addModel("categoryls",categoryls);
        inv.addModel("itemls", pdls);
        return "product";
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
