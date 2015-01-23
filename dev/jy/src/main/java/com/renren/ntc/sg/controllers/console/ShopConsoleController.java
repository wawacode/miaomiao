package com.renren.ntc.sg.controllers.console;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.AuthorizeCheck;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.CategoryDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.OrderService;
import com.renren.ntc.sg.service.RegistUserService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.FileUploadUtils;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.NumberUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 
 * Regist
 */

@DenyCommonAccess
@LoginRequired
@Path("shop")
public class ShopConsoleController {

	@Autowired
	private ShopDAO shopDAO;

    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;

    @Autowired
    private OrdersDAO ordersDAO ;

    @Autowired
    private ItemsDAO itemsDAO ;

    @Autowired
    OrderService orderService ;

	@Autowired
	private RegistHostHolder hostHolder;
	
	@Autowired
	private CategoryDAO categoryDAO;

    private Map keys = new HashMap();


    ShopConsoleController(){
        keys.put("name","");
        keys.put("pic_url","");
        keys.put("category_id","");
        keys.put("price","");
        keys.put("score","");
        keys.put("price_new","");
        keys.put("prcountice","");
        keys.put("pic_url","");
    }

    //注册的时候ajax校验用户名，违禁词和嫌疑词不让注册
	@Post("")
    @Get("")
    @AuthorizeCheck
	public String index(Invocation inv, @Param("shop_id") long shop_id ,@Param("category_id") int category_id ,
                        @Param("from") int from, @Param("offset") int offset){
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 50 ;
        }
        List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shop.getId());
        inv.addModel("shop",shop) ;

        if ( 0 == category_id ){
            if (categoryls.size() > 0){
            category_id =   categoryls.get(0).getCategory_id();
            }
            else{
                LoggerUtils.getInstance().log(String.format(" category is 0  && no category find on shop %d ",shop_id));
                return "shop";
            }
        }
        List<Item> itemls = itemsDAO.getItemsWithZero(SUtils.generTableName(shop_id),shop_id,category_id,from,offset);
        if(from != 0){
        	int begin = from;
        	begin = begin - offset;
           inv.addModel("previous_f", from< 0?0:from);
        }
        if(itemls.size() >=  offset){
           inv.addModel("next_f", from  + offset);
        }
        inv.addModel("itemls", itemls);
        inv.addModel("categoryls",categoryls);
        inv.addModel("curr_cate_id",category_id);
        return "shop";
	}
    
    @Post("del")
    @Get("del")
    public String del(Invocation inv, @Param("id") long id,@Param("shop_id") long shopId){
    	int result = itemsDAO.delItemsById(SUtils.generTableName(shopId), id);
    	if(result == SgConstant.PROCESS_DB_SUC){
    		return "@删除成功";
    	}else {
    		return "@删除失败";
		}
    }


    @Get("addindex")
    public String add(Invocation inv,@Param("shop_id") long shopId){
    	List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shopId);
    	inv.addModel("shopId", shopId);
    	inv.addModel("categoryls", categoryls);
        return  "addItem";
    }
    
    @Post("addItem")
	public String add(Invocation inv, @Param("shopId") long shopId,
									  @Param("serialNo") String serialNo,
									  @Param("name") String name,
									  @Param("categoryId") int categoryId,
									  @Param("count") int count,
									  @Param("score") int score,
									  @Param("price_new") int price,
									  @Param("pic") MultipartFile pic) {
    	if(pic == null){
    		LoggerUtils.getInstance().log(String.format("upload pic is null,serialNo=%s",serialNo));
    		return "@error" ;
    	}
    	String picName = pic.getOriginalFilename();
    	String[] picNameArr = pic.getOriginalFilename().split("\\.");
    	if(pic!=null && picNameArr.length ==2){
    		picName = serialNo+"."+picNameArr[1];
    	}else {
    		LoggerUtils.getInstance().log(String.format("upload pic format is wrong,serialNo=%s",serialNo));
			return "@error";
		}
    	String savePicPath = SgConstant.SAVE_PIC_PATH.replace("{shop_id}", String.valueOf(shopId));
    	boolean isSuc = new FileUploadUtils().uploadFile(pic, savePicPath,picName);
		if(!isSuc){
			return "@error" ;
		}
		String imageUrl = SgConstant.REMOTE_FILE_PATH_PRE.replace("{shop_id}", String.valueOf(shopId));
		String picUrl = imageUrl.concat(picName);
		Item item = new Item(serialNo,shopId, name, categoryId, score, count, picUrl, price);
		int flag = itemsDAO.insert(SUtils.generTableName(shopId), item);
		if (flag != 1) {
            return "@error";
        }
		return "r:/console/shop?shop_id="+shopId+"&category_id="+categoryId;
	}

    @Post("ud")
    @Get("ud")
    public String edit(Invocation inv ,@Param("id") String str_id,
                      @Param("value") String value){
        if( null == str_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",str_id));
            return "@error" ;
        }
        String[] keys = str_id.split("-");
        if(keys.length != 4){
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",str_id));
            return "@error" ;
        }
        if ( null == value ) {
            return "@error" ;
        }
        long shop_id =  Long.valueOf(keys[1]);
        String  key = keys[2];
        long item_id =   Long.valueOf(keys[3]);
        itemsDAO.update(SUtils.generTableName(shop_id),item_id,key,value);

        return  "@"+Constants.DONE ;
    }
    @Post("order")
    @Get("order")
    @AuthorizeCheck
    public String order(Invocation inv, @Param("shop_id") long shop_id, @Param("from") int from, @Param("offset") int offset){
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }

        if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 50 ;
        }
        List<Order> orderls = ordersDAO.get10Orders(shop_id,from,offset,SUtils.generOrderTableName(shop_id));

        if(from != 0){
            from = from - offset;
            inv.addModel("previous_f", from< 0?0:from);
        }
        if(orderls.size() >=  offset){
            inv.addModel("next_f", from  + offset);
        }
        orderls = orderService.forV(orderls);
        inv.addModel("shop",shop);
        inv.addModel("orderls",orderls);
        return "orders";
    }

    @Post("query")
    @Get("query")
    public String query(Invocation inv, @Param("query") String query, @Param("shop_id") long shop_id){

        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }
        List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shop.getId());
        long category_id =  categoryls.get(0).getId();
        List<Item>  itemls = new ArrayList<Item>();
        if(StringUtils.isBlank(query)){
        	itemls = itemsDAO.search(SUtils.generTableName(shop_id), shop_id); //默认查出20条
        }else {
			query = query.trim();
			query = SUtils.wrap(query);
		    query = SUtils.wrap(query);
		    itemls =  itemsDAO.indistinctSearch(SUtils.generTableName(shop_id),shop_id,query);//支持产品条形码和商品名称
		}

        inv.addModel("shop", shop);
        inv.addModel("curr_cate_id",category_id);
        inv.addModel("categoryls",categoryls);
        inv.addModel("itemls", itemls);
        return "shop";
    }

    @Post("cate")
    @Get("cate")
    @AuthorizeCheck
    public String category(Invocation inv,@Param("shop_id") long shop_id){
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }

        List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shop.getId());
        inv.addModel("categoryls",categoryls);
        return "category";
    }

    @Post("cate/up")
    @Get("cate/up")
    public String category(Invocation inv,  @Param("id")String str_id,
                           @Param("value") String value){
        if( null == str_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",str_id));
            return "@error" ;
        }
        String[] keys = str_id.split("-");
        if(keys.length != 4){
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",str_id));
            return "@error" ;
        }
        if ( null == value ) {
            return "@error" ;
        }
        long shop_id =  Long.valueOf(keys[1]);
        String  key = keys[2];
        long item_id =   Long.valueOf(keys[3]);
        shopCategoryDAO.update(item_id,key,value) ;
        return  "@"+Constants.DONE ;
    }

    @Post("cate/del")
    @Get("cate/del")
    public String category(Invocation inv,  @Param("shop_id") long  shop_id,
                           @Param("category_id") int category_id){
        if( 0 == shop_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",shop_id));
            return "@error" ;
        }
        if ( 0 == category_id ) {
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",category_id));
            return "@error" ;
        }
        int result = shopCategoryDAO.del(shop_id,category_id) ;
        if(result == SgConstant.PROCESS_DB_SUC){
        	return  "@"+SgConstant.DEL_SHOP_CAT_SUC_RESULT;
        }else {
        	return  "@"+SgConstant.DEL_SHOP_CAT_FAILED_RESULT;
		}
        
    }

    @Post("cate/add")
    public String addcate(Invocation inv,  @Param("shopId") long  shop_id,
                          @Param("categoryId") int category_id,
                          @Param("scorce") int score,
                          @Param("categoryName") String categoryName){
        if( 0 == shop_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",shop_id));
            return "@error" ;
        }
        if(StringUtils.isBlank(categoryName)){
        	 LoggerUtils.getInstance().log(String.format("cate_add categoryName is null %d ",shop_id));
             return "@error" ;
        }
        if ( 0 == category_id ) {
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",category_id));
            return "@error" ;
        }
        boolean isInWholeCats = false;
        List<Category> cats = categoryDAO.getCategory();
        for(Category category : cats){
        	if(category.getId() == category_id){
        		isInWholeCats = true;
        		break;
        	}
        }
        if(!isInWholeCats){
        	Category category = new Category();
        	category.setName(categoryName);
        	category.setType(0);
        	categoryDAO.insert(category);
        }
        ShopCategory shopCate = new ShopCategory();
        shopCate.setCategory_id(category_id);
        shopCate.setShop_id(shop_id);
        shopCate.setScore(score);
        shopCate.setName(categoryName);
        boolean isExistShopCats = false;
        List<ShopCategory> shopCats = shopCategoryDAO.getCategory(shop_id);
        for(ShopCategory shopCategory : shopCats){
        	if(shopCategory.getCategory_id() == category_id){
        		isExistShopCats = true;
        		break;
        	}
        }
        if(!isExistShopCats){
        	shopCategoryDAO.insert(shopCate);
        	return  "@"+SgConstant.ADD_CAT_SUC_RESULT;
        }else {
        	return  "@"+SgConstant.ADD_CAT_EXIST_RESULT;
		}
    }
    
    @Get("cate/addIndex")
    public String addCateIndex(Invocation inv,@Param("shop_id") long shopId){
    	List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shopId);
    	inv.addModel("shopId", shopId);
    	inv.addModel("categoryls", categoryls);
        return  "addShopCat";
    }

    @Post("item/del")
    @Get("item/del")
    public String addcate(Invocation inv,  @Param("shop_id") long  shop_id,
                          @Param("item_id") long item_id){
        if( 0 == shop_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",shop_id));
            return "@error" ;
        }
        if ( 0 == item_id ) {
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",item_id));
            return "@error" ;
        }
        itemsDAO.del(SUtils.generTableName(shop_id),item_id) ;
        return  "@"+Constants.DONE ;
    }

    @Post("item/add")
    @Get("item/add")
    public String addcate(Invocation inv,  @Param("shop_id") long  shop_id,
                          @Param("serianNo") String serianNo){
        if( 0 == shop_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",shop_id));
            return "@error" ;
        }
        if ( StringUtils.isBlank(serianNo) ) {
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",serianNo));
            return "@error" ;
        }
        Item it =  new Item();
        it.setShop_id(shop_id);
        it.setSerialNo(serianNo);
        itemsDAO.insert(SUtils.generTableName(shop_id),it) ;
        return  "@"+Constants.DONE ;
    }

}
