package com.renren.ntc.sg.controllers.console;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.Coupon;
import com.renren.ntc.sg.biz.dao.CouponDAO;
import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.service.ImageService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.ImagesUtils;

@DenyCommonAccess
@LoginRequired
@Path("coupon")
public class CouponConsoleController {
	@Autowired
	CouponDAO couponDao;
	@Autowired
	ImageService imageService;
	
	@Post("list")
	@Get("list")
	public String list(Invocation inv) {
		List<Coupon> coupons = couponDao.getAllCoupon();
		inv.addModel("coupons", coupons);
		return "coupon_list";
	}

	@Post("del")
	@Get("del")
	public String del(Invocation inv, @Param("id") long id) {
		if (0 == id) {
			LoggerUtils.getInstance().log(
					String.format("coupon del id is null %d ", id));
			return "@error";
		}
		couponDao.del(id);
		return "@" + Constants.DONE;
	}

	@Post("edit")
	public String edit(Invocation inv, @Param("id") String str_id,
			@Param("value") String value) {
		if (null == str_id) {
			LoggerUtils.getInstance().log(
					String.format("str_id is null %s ", str_id));
			return "@error";
		}
		String[] keys = str_id.split("-");
		if (keys.length != 3) {
			LoggerUtils.getInstance().log(
					String.format("str_id is null %s ", str_id));
			return "@error";
		}
		if (null == value) {
			return "@error";
		}
		String key = keys[1];
		long item_id = Long.valueOf(keys[2]);

		return "@" + Constants.DONE;
	}
	
	@Post("add")
	public String add(Invocation inv, @Param("price") int price,
									  @Param("start_time") String start_time,
									  @Param("end_time") String end_time,
									  @Param("name") String name,
									  @Param("pic") MultipartFile pic) {
		if(pic == null){
    		LoggerUtils.getInstance().log(String.format("add coupons upload pic is null,name=%s",name));
    		return "@error" ;
    	}
		String picName = imageService.getSavePicName(pic, "i_"+UUID.randomUUID().toString());
    	if(StringUtils.isBlank(picName)){
    		LoggerUtils.getInstance().log(String.format("upload pic format is wrong,name=%s",name));
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
		String picUrl = SgConstant.REMOTE_CONPON_FILE_PATH_PRE.concat(picName);
//		Coupon coupon = new Coupon(id, price, createer, picName pic_url,start_time, end_time)
//		Item item = new Item(serialNo,shopId, name, categoryId, score, count, picUrl, price);
//		int flag = itemsDAO.insert(SUtils.generTableName(shopId), item);
//		if (flag == 0) {
//            return "@error";
//        }
//		return "r:/console/shop?shop_id="+shopId+"&category_id="+categoryId;
		return "";
	}
}
