package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.CategoryDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.FileUploadUtils;
import com.renren.ntc.sg.util.ImagesUtils;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
        if(StringUtils.isBlank(query)){
        	query = query.trim();
        }
        if(!NumberUtils.isNumber(query)){
        	query = SUtils.wrap(query);
        }
        List<Product> pdls = productDAO.geProducts(query);

        inv.addModel("curr_cate_id",category_id);
        inv.addModel("categoryls",categoryls);
        inv.addModel("itemls", pdls);
        return "product";
    }

    @Post("del")
    @Get("del")
    public String del(Invocation inv, @Param("id") long id){
        if ( 0 == id ) {
            LoggerUtils.getInstance().log(String.format("str_id is null %d ",id));
            return "@error" ;
        }
        productDAO.delProductById(id);
        return  "@"+Constants.DONE ;
    }

    @Post("edit")
    public String edit(Invocation inv,@Param("id") String str_id,
            						  @Param("value") String value){
    	if( null == str_id){
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",str_id));
            return "@error" ;
        }
        String[] keys = str_id.split("-");
        if(keys.length != 3){
            LoggerUtils.getInstance().log(String.format("str_id is null %s ",str_id));
            return "@error" ;
        }
        if ( null == value ) {
            return "@error" ;
        }
        String  key = keys[1];
        long item_id =   Long.valueOf(keys[2]);
        productDAO.update(item_id,key,value);

        return  "@"+Constants.DONE ;
    }
    
//    @Post("uploadPic")
//	public String addItemPic(Invocation inv, @Param("id") long proId,
//									  @Param("serialNo") String serialNo,
//									  @Param("categoryId") int categoryId,
//									  @Param("pic") MultipartFile pic) {
//    	if(pic == null){
//    		LoggerUtils.getInstance().log(String.format("product uploadPic is null,serialNo=%s",serialNo));
//    		return "@error" ;
//    	}
//    	String picName = pic.getOriginalFilename();
//    	String[] picNameArr = pic.getOriginalFilename().split("\\.");
//    	if(pic!=null && picNameArr.length ==2){
//    		picName = serialNo+"."+picNameArr[1];
//    	}else {
//    		LoggerUtils.getInstance().log(String.format("product uploadPic format is wrong,serialNo=%s",serialNo));
//			return "@error";
//		}
//    	boolean isSuc = new FileUploadUtils().uploadFile(pic, SgConstant.SAVE_PRODUCT_PIC_PATH,picName);
//		if(!isSuc){
//			return "@error" ;
//		}
//		String picUrl = SgConstant.REMOTE_PRODCUT_FILE_PATH_PRE.concat(picName);
//		int flag = productDAO.updateByProId(picUrl, proId);
//		if (flag != 1) {
//            return "@error";
//        }
//		return "r:/console/product?category_id="+categoryId;
//	}
//
    @Post("add")
	public String add(Invocation inv, @Param("serialNo") String serialNo,
									  @Param("name") String name,
									  @Param("categoryId") int categoryId,
									  @Param("score") int score,
									  @Param("price") int price,
									  @Param("pic") MultipartFile pic) {
    	if(pic == null){
    		LoggerUtils.getInstance().log(String.format("product addItem upload pic is null,serialNo=%s",serialNo));
    		return "@error" ;
    	}
    	String picName = pic.getOriginalFilename();
    	String[] picNameArr = pic.getOriginalFilename().split("\\.");
    	if(pic!=null && picNameArr.length ==2){
    		picName = serialNo+"."+picNameArr[1];
    	}else {
    		LoggerUtils.getInstance().log(String.format("product addItem upload pic format is wrong,serialNo=%s",serialNo));
			return "@error";
		}
        try {
            boolean isSuc = ImagesUtils.convertImage(pic.getInputStream(), SgConstant.SAVE_PRODUCT_PIC_PATH + picName);
            if(!isSuc){
                return "@error" ;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		String picUrl = SgConstant.REMOTE_PRODCUT_FILE_PATH_PRE.concat(picName);
		Product product = new Product(serialNo, name, picUrl, categoryId, score, price);
		int flag = productDAO.insert(product);
		if (flag == 0) {
            return "@error";
        }
		return "r:/console/product?category_id="+categoryId;
	}
    
    @Get("addindex")
    public String add(Invocation inv){
    	List<Category> categoryls  = categoryDAO.getCategory();
    	inv.addModel("categoryls", categoryls);
        return  "addProduct";
    }

}
