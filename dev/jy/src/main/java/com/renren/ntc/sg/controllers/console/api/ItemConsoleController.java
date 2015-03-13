package com.renren.ntc.sg.controllers.console.api;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.renren.ntc.sg.bean.Product;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.util.ImagesUtils;
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

    @Autowired
    private ProductDAO productDao ;

    ItemConsoleController(){
    }
    
    @Post("del")
    @Get("del")
    public String del(Invocation inv, @Param("itemId") long id,@Param("shop_id") long shop_id){
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
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
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
    	long shopId = shop.getId();
    	JSONObject resultJson = new JSONObject();
    	List<ShopCategory> categoryls  = shopCategoryDAO.getCategory(shopId);
    	resultJson.put("shopId", shopId);
    	resultJson.put("categoryls", categoryls);
    	return "@json:"+ getDataResult(0, resultJson);
    }
    @Post("ul_pic")
    @Get("ul_pic")
    public String ul_pic(Invocation inv, @Param("serialNo") String serialNo,
                     @Param("pic") MultipartFile pic,
                     @Param("shop_id") long shop_id) {
        String url = "";
        if(pic != null){
            String picName = pic.getOriginalFilename();
            String[] picNameArr = pic.getOriginalFilename().split("\\.");
            if(pic!=null && picNameArr.length ==2){
                picName = serialNo+"."+picNameArr[1];
            }else {
                LoggerUtils.getInstance().log(String.format("upload pic format is wrong,serialNo=%s",serialNo));
                JSONObject resultJson = new JSONObject();
                resultJson.put("code", -1);
                resultJson.put("msg", "服务器错误，请稍后重试");
                return "@json:"+resultJson.toJSONString();
            }
            String savePicPath = SgConstant.SAVE_PIC_PATH.replace("{shop_id}", String.valueOf(shop_id));
            File f = new File(savePicPath);
            if (!f.exists()){
                boolean mkdirsRet = f.mkdirs();
                if (!mkdirsRet){
                    LoggerUtils.getInstance().log("mkdir failed, may can't upload pic");
                    JSONObject resultJson = new JSONObject();
                    resultJson.put("code", -1);
                    resultJson.put("msg", "服务器错误，请稍后重试");
                    return "@json:"+resultJson.toJSONString();
                }
            }
//            boolean isSuc = new FileUploadUtils().uploadFile(pic, tmpsavePicPath,picName);
            try {
                boolean isSuc = ImagesUtils.convertImage(pic.getInputStream(), savePicPath + picName);
                if(!isSuc){
                    JSONObject resultJson = new JSONObject();
                    resultJson.put("code", -1);
                    resultJson.put("msg", "服务器错误，请稍后重试");
                    return "@json:"+resultJson.toJSONString();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            // 压缩
            String imageUrl = SgConstant.REMOTE_FILE_PATH_PRE.replace("{shop_id}", String.valueOf(shop_id));
            url = imageUrl.concat(picName);
        }
        JSONObject result = new JSONObject();
        result.put("url",url );
        return "@json:"+getDataResult(0, result);
    }

    @Post("addItem")
    @Get("addItem")
	public String add(Invocation inv, @Param("serialNo") String serialNo,
									  @Param("name") String name,
									  @Param("categoryId") int categoryId,
									  @Param("count") int count,
									  @Param("score") int score,
									  @Param("price") int price,
									  @Param("shop_id") long shop_id,
									  @Param("pic_url") String pic_url,
									  @Param("saleStatus") String saleStatus) {
    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
    	long shopId = shop.getId();
    	JSONObject resultJson = new JSONObject();
    	resultJson.put("code", -1);
		resultJson.put("msg", "服务器错误，请稍后重试");
		String picUrl = "";
    	if(StringUtils.isBlank(pic_url)){
            Product p = productDao.geProduct(serialNo);
    		picUrl = p.getPic_url();
    	}
    	int onsell = Constants.ITEM_NOT_SALE;
    	if(!StringUtils.isBlank(saleStatus)){
    		try {
				onsell = Integer.parseInt(saleStatus);
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}
    		if(onsell == Constants.ITEM_ON_SALE){
    			onsell = Constants.ITEM_ON_SALE;
    		}
    	}
		Item item = new Item(serialNo,shopId, name, categoryId, score, count, picUrl, price,onsell);
		int itemId = itemsDAO.insert(SUtils.generTableName(shopId), item);
		if (itemId == 0) {
			return "@json:"+resultJson.toJSONString();
        }else {
			item = itemsDAO.getItem(SUtils.generTableName(shopId), shopId, itemId);
		}
		JSONObject result = new JSONObject();
		result.put("item", item);
		return "@json:"+getDataResult(0, result);
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
                      				   @Param("pic_url") String pic_url,
                      				   @Param("shop_id") long shop_id,
                      				   @Param("saleStatus") String saleStatus){
        //todo  这段更新代码写的很垃圾呀
        Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
    	long shopId = shop.getId();
        int updateDbFlag = 0;
        if(StringUtils.isBlank(itemName) || StringUtils.isBlank(serialNo)){
            JSONObject resultJson = new JSONObject();
            resultJson.put("code", 500);
            resultJson.put("msg", "服务器异常");
            return "@json:"+resultJson.toJSONString();
        }

        if(count != 0 && score !=0 && price !=0 && category_id !=0){
            updateDbFlag = itemsDAO.updateItemById(SUtils.generTableName(shopId),serialNo, itemName, category_id, score, count, price, itemId);
        }

		if(pic_url != null){
			updateDbFlag = itemsDAO.updateItemPriceById(SUtils.generTableName(shopId),itemId,pic_url);
		}

	    if(!StringUtils.isBlank(saleStatus)){

				int saleStatusInt = 1;
				try {
					saleStatusInt = Integer.parseInt(saleStatus);
				} catch (NumberFormatException e) {
					e.printStackTrace();
				}
				if(saleStatusInt != Constants.ITEM_ON_SALE){
					saleStatusInt = 0;
				}
				updateDbFlag = itemsDAO.updateSaleStatus(SUtils.generTableName(shopId),itemId,saleStatusInt);
	   }

		if(updateDbFlag == 1){
            JSONObject resultJson = new JSONObject();
			resultJson.put("code", 0);
			resultJson.put("msg", "修改商品成功");
		}else {
            JSONObject resultJson = new JSONObject();
			resultJson.put("code", 500);
			resultJson.put("msg", "服务器异常");
		}
		Item item = itemsDAO.getItem(SUtils.generTableName(shopId), shop_id, itemId);
		JSONObject result = new JSONObject();
		result.put("item", item);
		return "@json:"+ getDataResult(0, result);
    }
    
    @Post("query")
    @Get("query")
    public String query(Invocation inv, @Param("query") String query,
    									@Param("shop_id") long shop_id){

    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
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
    /**
     * 商品置顶
     * @param inv
     * @param itemId
     * @param category_id
     * @param shop_id
     * @return
     */
    @Post("sticky")
    @Get("sticky")
    public String sticky(Invocation inv, @Param("itemId") int itemId,
    		 							 @Param("category_id") int category_id,
    									 @Param("shop_id") long shop_id){

    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
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
    /**
     * 商品上架或者下架
     * @param inv
     * @param itemId
     * @param shop_id
     * @param sale 1 表示上架  0 表示下架
     * @return
     */
    @Post("shelves")
    @Get("shelves")
    public String shelves(Invocation inv, @Param("itemId") int itemId,
    									  @Param("shop_id") long shop_id,
    		 							  @Param("sale") int sale){

    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
        if(itemId == 0){
        	return "@json:" + Constants.PARATERERROR;
        }
        
        if(sale != Constants.ITEM_ON_SALE){//上架设置库存为100
        	sale = 0;
        }
        int flag = itemsDAO.update(SUtils.generTableName(shop_id), itemId, "onsell", sale);
    	if(sale == Constants.ITEM_ON_SALE){
    		if(flag == SgConstant.PROCESS_DB_SUC){
        		return "@json:"+ getActionResult(0, "商品上架成功");
        	}else {
        		return "@json:"+ getActionResult(1, "商品上架失败");
    		}
    	}else {
    		if(flag == SgConstant.PROCESS_DB_SUC){
        		return "@json:"+ getActionResult(0, "商品下架成功");
        	}else {
        		return "@json:"+ getActionResult(1, "商品下架失败");
    		}
		}
    }
    /**
     * 商品下架列表
     * @param inv
     * @param shop_id
     * @return
     */
    @Post("shownosales")
    @Get("shownosales")
    public String shownosales(Invocation inv,@Param("shop_id") long shop_id){

    	Shop shop = isExistShop(shop_id);
        if(shop == null){
        	return "@json:" + getActionResult(1, Constants.SHOP_NO_EXIST);
        }
        List<Item> items = itemsDAO.showNoSaleItems(SUtils.generTableName(shop_id), shop_id);
        JSONObject result = new JSONObject();
        result.put("items", items);
        return "@json:" + getDataResult(0, result);
    }
}
