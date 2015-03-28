package com.renren.ntc.sg.controllers.console;

import java.util.List;
import java.util.UUID;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import org.apache.commons.lang.StringUtils;
import org.apache.velocity.tools.generic.DateTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.annotations.LoginRequired;
import com.renren.ntc.sg.bean.Coupon;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.biz.dao.CouponDAO;
import com.renren.ntc.sg.constant.SgConstant;
import com.renren.ntc.sg.interceptors.access.RegistHostHolder;
import com.renren.ntc.sg.service.ImageService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;

@DenyCommonAccess
@LoginRequired
@Path("coupon")
public class CouponConsoleController {
	@Autowired
	CouponDAO couponDao;
	@Autowired
	ImageService imageService;
	
	@Autowired
	private RegistHostHolder hostHolder;
	
	@Post("list")
	@Get("list")
	public String list(Invocation inv,@Param("from") int from, @Param("offset") int offset) {
		if ( 0 == from){
            from = 0;
        }
        if ( 0 == offset){
            offset = 10 ;
        }
        List<Coupon> coupons = couponDao.getAllCoupon(from,offset);
        
        if(from != 0){
        	int begin = from;
        	begin = begin - offset;
           inv.addModel("previous_f", begin< 0?0:begin);
        }
        if(coupons.size() >=  offset){
           inv.addModel("next_f", from  + offset);
        }
		inv.addModel("date", new DateTool()); 
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
	
	@Post("addIndex")
	@Get("addIndex")
	public String addIndex(Invocation inv, @Param("id") String couponId) {
		return "coupon_add_index";
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
		long couponId = Long.valueOf(keys[2]);
		couponDao.update(couponId, key, value);

		return "@" + Constants.DONE;
	}
	
	@Post("add")
	public String add(Invocation inv, @Param("price") int price,
									  @Param("shop_id") long shop_id,
									  @Param("start_time") String start_time,
									  @Param("end_time") String end_time,
									  @Param("name") String name,
									  @Param("pic") MultipartFile pic,
									  @Param("ext") String ext) {
		RegistUser u = hostHolder.getUser();
        if ( null ==u ||  0 >= u.getId()){
            return "@error";
        }
		if(pic == null){
    		LoggerUtils.getInstance().log(String.format("add coupons upload pic is null,name=%s",name));
    		return "@error" ;
    	}
		String picName = imageService.getSavePicName(pic, "i_"+UUID.randomUUID().toString());
    	if(StringUtils.isBlank(picName)){
    		LoggerUtils.getInstance().log(String.format("upload pic format is wrong,name=%s",name));
			return "@error";
    	}
    	boolean isUploadImgSuc = imageService.upLoadImg(pic, picName, SgConstant.SAVE_COUPON_PATH);
    	if(!isUploadImgSuc){
    		 return "@error" ;
    	}
		String picUrl = SgConstant.REMOTE_CONPON_FILE_PATH_PRE.concat(picName);
		ext = StringUtils.isBlank(ext)?"" : ext;
		Coupon coupon = new Coupon(shop_id,price, u.getId(), name, ext, picUrl, start_time, end_time);
		couponDao.insert(coupon);
		return "r:/console/coupon/list";
	}
	
	@Post("uploadPic")
	public String addItemPic(Invocation inv, @Param("id") long id,
									  @Param("pic") MultipartFile pic) {
    	if(pic == null){
    		LoggerUtils.getInstance().log(String.format("uploadPic is null,pic_id="+id));
    		return "@error" ;
    	}
		String picName = imageService.getSavePicName(pic, "i_"+UUID.randomUUID().toString());
    	if(StringUtils.isBlank(picName)){
    		LoggerUtils.getInstance().log(String.format("upload pic format is wrong,id=%s",id));
			return "@error";
    	}
    	boolean isUploadImgSuc = imageService.upLoadImg(pic, picName, SgConstant.SAVE_COUPON_PATH);
    	if(!isUploadImgSuc){
    		 return "@error" ;
    	}
    	//String picUrl = SgConstant.REMOTE_CONPON_FILE_PATH_PRE.concat(picName);
    	return "r:/console/coupon/list";
	}
}
