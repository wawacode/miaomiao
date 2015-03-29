package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Coupon;
import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.bean.UserCoupon;
import com.renren.ntc.sg.biz.dao.CouponDAO;
import com.renren.ntc.sg.biz.dao.UserCouponDAO;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.service.TicketService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import com.renren.ntc.sg.util.wx.Sha1Util;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-3-25
 * Time: 上午11:29
 * To change this template use File | Settings | File Templates.
 */
@Path("coupon")
public class CouponController {
    @Autowired
    NtcHostHolder  hostHolder;

    @Autowired
    CouponDAO couponDao;


    @Autowired
    UserCouponDAO usercouponDao;

    @Autowired
    public TicketService ticketService;

    String UKEY = "(*#^&*^(@)#$^IIYREOFHEKL";


    @Get("allCoupons")
    @Post("allCoupons")
    public String allCoupon(Invocation inv,@Param("from") int from, @Param("offset") int offset){
        User u = hostHolder.getUser();
        if (from < 0 ){
            from = 0;
        }
        if (offset > 50 || offset <= 0  ){
            offset = 50;
        }
        JSONArray cos = new JSONArray();
        boolean can = ticketService.ticketCanUse(u.getId(), 0);
        List<UserCoupon> tickets = ticketService.getUnusedTickets(u.getId(),0,from,offset) ;
        JSONObject res = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("coupon_active",can) ;
        data.put("coupons",JSON.toJSON(tickets) ) ;
        res.put("data",data);
        res.put("code",0);
        return "@json:" + res.toJSONString();
    }


    @Get("couponObtain")
    @Post("couponObtain")
    public String get(Invocation inv ,long shop_id){
        User u = hostHolder.getUser();
        JSONArray cos = new JSONArray();
        List<Coupon> coupons  = couponDao.getCouponRule(new Date(System.currentTimeMillis()));
        for (Coupon c : coupons ){
            List<UserCoupon> tickets = usercouponDao.getUser_Coupon(u.getId(),c.getId());
            if (tickets == null  || tickets.size() == 0 ) {
                try {
                    UserCoupon userCoupon =  new UserCoupon() ;
                    String code = SUtils.md5(u.getId(), c.getId(), Sha1Util.getNonceStr());
                    userCoupon.setCode(code);
                    userCoupon.setUser_id(u.getId());
                    userCoupon.setCoupon_id(c.getId());
                    userCoupon.setDesc(c.getDesc());
                    userCoupon.setStatus(0);
                    userCoupon.setName(c.getName());
                    userCoupon.setStart_time(c.getStart_time());
                    userCoupon.setEnd_time(c.getEnd_time());
                    userCoupon.setExt(c.getExt());
                    userCoupon.setPrice(c.getPrice());
                    userCoupon.setPic_url(c.getPic_url());
                    usercouponDao.insert(userCoupon) ;
                    cos.add(JSON.toJSON(userCoupon));
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }
        if(cos.size() == 0 ){
            return "@json:" + Constants.NOMORE ;
        }
        JSONObject res = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("coupons",cos ) ;
        res.put("data",data);
        res.put("code",0);
        return "@json:" + res.toJSONString();
    }



    @Get("nePop")
    @Post("nePop")
    public String nePop(Invocation inv ){
        User u = hostHolder.getUser();
        List<Coupon> coupons  = couponDao.getCouponRule(new Date(System.currentTimeMillis()));
        JSONArray cos = new JSONArray();
        for (Coupon c : coupons ){
            List<UserCoupon> tickets = usercouponDao.getUser_Coupon(u.getId(),c.getId());
            if (tickets == null  || tickets.size() == 0 ) {
                cos.add(JSON.toJSON(c)); ;
            }
        }
        JSONObject res = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("coupons",cos ) ;
        res.put("data",data);
        res.put("code",0);
        return "@json:" + res.toJSONString();
    }

}
