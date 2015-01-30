package com.renren.ntc.sg.controllers.console.api;

import java.util.ArrayList;
import java.util.List;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.AuthorizeCheck;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopCategory;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopCategoryDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.FileUploadUtils;
import com.renren.ntc.sg.util.SUtils;
@DenyCommonAccess
@Path("shopItem")
public class ItemConsoleController extends BasicConsoleController{
	@Autowired
	private ShopDAO shopDAO;

    @Autowired
    private ShopCategoryDAO shopCategoryDAO ;

    @Autowired
    private OrdersDAO ordersDAO ;

    @Autowired
    private ItemsDAO itemsDAO ;


    ItemConsoleController(){
    }
    
    @Post("del")
    @Get("del")
    @AuthorizeCheck
    public String del(Invocation inv, @Param("id") long id,@Param("shop_id") long shop_id){
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, "店铺不存在");
        }
    	JSONObject resultJson = new JSONObject();
    	int result = itemsDAO.delItemsById(SUtils.generTableName(shop.getId()), id);
    	if(result == SgConstant.PROCESS_DB_SUC){
    		resultJson.put("code", 0);
    		resultJson.put("msg", "删除成功");
    	}else {
    		resultJson.put("code", 500);
    		resultJson.put("msg", "删除失败");
		}
    	return "@json:"+resultJson.toJSONString();
    }


    @Get("addindex")
    public String add(Invocation inv,@Param("shop_id") long shop_id){
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, "店铺不存在");
        }
    	long shopId = shop.getId();
    	JSONObject resultJson = new JSONObject();
    	List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shopId);
    	resultJson.put("shopId", shopId);
    	resultJson.put("categoryls", categoryls);
    	return "@json:"+ getDataResult(0, resultJson);
    }
    
    @Post("addItem")
	public String add(Invocation inv, @Param("serialNo") String serialNo,
									  @Param("name") String name,
									  @Param("categoryId") int categoryId,
									  @Param("count") int count,
									  @Param("score") int score,
									  @Param("price_new") int price,
									  @Param("pic") MultipartFile pic,
									  @Param("shop_id") long shop_id) {
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, "店铺不存在");
        }
    	long shopId = shop.getId();
    	JSONObject resultJson = new JSONObject();
    	resultJson.put("code", -1);
		resultJson.put("msg", "服务器错误，请稍后重试");
    	if(pic == null){
    		LoggerUtils.getInstance().log(String.format("upload pic is null,serialNo=%s",serialNo));
    		return "@json:"+resultJson.toJSONString();
    	}
    	String picName = pic.getOriginalFilename();
    	String[] picNameArr = pic.getOriginalFilename().split("\\.");
    	if(pic!=null && picNameArr.length ==2){
    		picName = serialNo+"."+picNameArr[1];
    	}else {
    		LoggerUtils.getInstance().log(String.format("upload pic format is wrong,serialNo=%s",serialNo));
    		return "@json:"+resultJson.toJSONString();
		}
    	String savePicPath = SgConstant.SAVE_PIC_PATH.replace("{shop_id}", String.valueOf(shopId));
    	boolean isSuc = new FileUploadUtils().uploadFile(pic, savePicPath,picName);
		if(!isSuc){
			return "@json:"+resultJson.toJSONString();
		}
		String imageUrl = SgConstant.REMOTE_FILE_PATH_PRE.replace("{shop_id}", String.valueOf(shopId));
		String picUrl = imageUrl.concat(picName);
		Item item = new Item(serialNo,shopId, name, categoryId, score, count, picUrl, price);
		int flag = itemsDAO.insert(SUtils.generTableName(shopId), item);
		if (flag != 1) {
			return "@json:"+resultJson.toJSONString();
        }
		resultJson.put("code", 0);
		resultJson.put("msg", "添加商品成功");
		return "@json:"+resultJson.toJSONString();
	}

    @Post("update")
    @Get("update")
    public String edit(Invocation inv ,@Param("itemName") String itemName,
    								   @Param("itemId") int itemId,
                      				   @Param("category_id") int category_id,
                      				   @Param("score") int score,
                      				   @Param("count") int count,
                      				   @Param("price") int price,
                      				   @Param("serialNo") String serialNo,
                      				   @Param("pic") MultipartFile pic,
                      				   @Param("shop_id") long shop_id){
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, "店铺不存在");
        }
    	long shopId = shop.getId();
    	JSONObject resultJson = new JSONObject();
    	resultJson.put("code", 500);
		resultJson.put("msg", "服务器异常");
		if(StringUtils.isBlank(itemName) || StringUtils.isBlank(serialNo)){
			 return "@json:"+resultJson.toJSONString();
		}
		String picUrl = "";
		int updateDbFlag = 0;
		if(pic != null){
			boolean isUpLoadSuc = FileUploadUtils.uploadFileToRemote(serialNo, shopId, pic);
			if(!isUpLoadSuc){
				return "@json:"+resultJson.toJSONString();
			}
			String picName = pic.getOriginalFilename();
			picUrl = FileUploadUtils.getPicViewUrl(shopId, picName);
			updateDbFlag = itemsDAO.updateItemById(SUtils.generTableName(shopId), serialNo, itemName, category_id, score, count, price, itemId,picUrl);
		}else {
			updateDbFlag = itemsDAO.updateItemById(SUtils.generTableName(shopId), serialNo, itemName, category_id, score, count, price, itemId);
		}
		if(updateDbFlag == 1){
			resultJson.put("code", 0);
			resultJson.put("msg", "修改商品成功");
		}else {
			resultJson.put("code", 500);
			resultJson.put("msg", "服务器异常");
		}
		return "@json:"+resultJson.toJSONString();
    }
    
    @Post("query")
    @Get("query")
    public String query(Invocation inv, @Param("query") String query,
    									@Param("shop_id") long shop_id){

    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, "店铺不存在");
        }
    	long shopId = shop.getId();
        List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shop.getId());
        long category_id =  categoryls.get(0).getId();
        List<Item>  itemls = new ArrayList<Item>();
        if(StringUtils.isBlank(query)){
        	itemls = itemsDAO.search(SUtils.generTableName(shopId), shopId); //默认查出20条
        }else {
			query = query.trim();
			query = SUtils.wrap(query);
		    query = SUtils.wrap(query);
		    itemls =  itemsDAO.indistinctSearch(SUtils.generTableName(shopId),shopId,query);//支持产品条形码和商品名称
		}
        JSONObject result = new JSONObject();
        result.put("shop", shop);
        result.put("curr_cate_id",category_id);
        result.put("categoryls",categoryls);
        result.put("itemls", itemls);
        return "@json:"+ getDataResult(0, result);
    }
    
    @Post("sticky")
    @Get("sticky")
    public String sticky(Invocation inv, @Param("itemId") int itemId,
    		 							 @Param("category_id") int category_id,
    									 @Param("shop_id") long shop_id){

    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, "店铺不存在");
        }
        if(itemId == 0){
        	return "@json:" + Constants.PARATERERROR;
        }
    	int maxItemScore = itemsDAO.getMaxScoreOfItem(SUtils.generTableName(shop_id),category_id);
    	int flag = itemsDAO.stickyItemByCondition(SUtils.generTableName(shop_id), itemId, maxItemScore + 1);
    	if(flag == SgConstant.PROCESS_DB_SUC){
    		return "@json:"+ getActionResult(0, "置顶成功");
    	}else {
    		return "@json:"+ getActionResult(1, "置顶失败");
		}
    }
}
