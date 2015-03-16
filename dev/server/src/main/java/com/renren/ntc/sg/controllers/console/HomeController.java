package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopCategory;
import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.dao.SWPOrderDAO;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@DenyCommonAccess
@LoginRequired
@Path("console")
public class HomeController {

    private static int DEFAULT_SHOP_ID = 1;

    @Autowired
    NtcHostHolder ntcHostHolder;

    @Autowired
    public ShopDAO shopDAO;
    @Autowired
    public SWPOrderDAO  orderDAO;

    @Autowired
    public ItemsDAO itemsDAO;

    @Autowired
    public ShopCategoryDAO shopCategoryDAO;

    @Autowired
    public SWPOrderDAO swpOrderDAO ;

    @Get("hot")
    public String hot (Invocation inv,@Param("shop_id") long shop_id ){
        // 校验合法性
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }
        //获取 热门分类
        List<Item> itemls = itemsDAO.hot(SUtils.generTableName(shop_id),shop_id,0,20);
        inv.addModel("items", itemls);
        return "hot";
    }


    @Get("")
    public String index (Invocation inv,@Param("shop_id") long shop_id){
           User u  = ntcHostHolder.getUser();

        // 校验合法性
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

         if(null == shop){
             LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
              shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
         }
        List<ShopCategory> category  = shopCategoryDAO.getCategory(shop.getId());

        if (null != category  &&  category.size() > 0){

            ShopCategory cate  = category.get(0);
            int cateId = cate.getCategory_id();
            List <Item> items = itemsDAO.getItems(SUtils.generTableName(shop_id),shop_id,cateId,0,20)  ;
            inv.addModel("items", items);
        }
          return "index.html" ;
        }




    @Get("create")
    public String query (Invocation inv ,@Param("chn") String chn){

        return "@" ;
    }

}


