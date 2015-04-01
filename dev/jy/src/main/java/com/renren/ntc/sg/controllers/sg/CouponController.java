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
<<<<<<< HEAD
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import com.renren.ntc.sg.util.wx.MD5Util;
import com.renren.ntc.sg.util.wx.Sha1Util;
import com.renren.ntc.sg.util.wx.TenpayUtil;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
=======
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.TicketService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import com.renren.ntc.sg.util.wx.Sha1Util;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

<<<<<<< HEAD
import java.util.Date;
=======
import java.sql.Date;
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-3-25
 * Time: 上午11:29
 * To change this template use File | Settings | File Templates.
 */
<<<<<<< HEAD
=======
@Path("coupon")
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
public class CouponController {
    @Autowired
    NtcHostHolder  hostHolder;

    @Autowired
    CouponDAO couponDao;
<<<<<<< HEAD
    @Autowired
    UserCouponDAO usercouponDao;

    String UKEY = "(*#^&*^(@)#$^IIYREOFHEKL";

    public String getCardLists(Invocation inv){
        User u = hostHolder.getUser();

        return  "@json:" ;
    }


    @Get("getCoupon")
    @Post("getCoupon")
    public String hiCoupon(Invocation inv,@Param("from") int from, @Param("offset") int offset){
        User u = hostHolder.getUser();
        JSONArray cos = new JSONArray();
        List<UserCoupon> tickets = usercouponDao.getUser_Coupon(u.getId(),from,offset);
        JSONObject res = new JSONObject();
        JSONObject data = new JSONObject();
=======


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
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
        data.put("coupons",JSON.toJSON(tickets) ) ;
        res.put("data",data);
        res.put("code",0);
        return "@json:" + res.toJSONString();
    }


<<<<<<< HEAD
    @Get("getCoupon")
    @Post("getCoupon")
    public String get(Invocation inv ){
        User u = hostHolder.getUser();
        JSONArray cos = new JSONArray();
        List<Coupon> coupons  = couponDao.getCouponRule(new Date());
        for (Coupon c : coupons ){
            List<UserCoupon> tickets = usercouponDao.getUser_Coupon(u.getId(),c.getId());
            if (tickets == null  || tickets.size() == 0 ) {
                try {
                    UserCoupon userCoupon =  new UserCoupon() ;
                    String code = SUtils.md5(u.getId(),c.getId(),Sha1Util.getNonceStr());
=======
    @Get("couponObtain")
    @Post("couponObtain")
    public String get(Invocation inv ,@Param("shop_id")  long shop_id){
        User u = hostHolder.getUser();
        JSONArray cos = new JSONArray();
        List<Coupon> coupons  = couponDao.getCouponRule(new Date(System.currentTimeMillis()));
        for (Coupon c : coupons ){
            List<UserCoupon> tickets = usercouponDao.getUser_Coupon(u.getId(), c.getId(),
                                                   new Date(System.currentTimeMillis()));
            if (tickets == null  || tickets.size() == 0 ) {
                try {
                    UserCoupon userCoupon =  new UserCoupon() ;
                    String code = SUtils.md5(u.getId(), c.getId(), Sha1Util.getNonceStr());
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
                    userCoupon.setCode(code);
                    userCoupon.setUser_id(u.getId());
                    userCoupon.setCoupon_id(c.getId());
                    userCoupon.setDesc(c.getDesc());
<<<<<<< HEAD
=======
                    userCoupon.setStatus(0);
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
                    userCoupon.setName(c.getName());
                    userCoupon.setStart_time(c.getStart_time());
                    userCoupon.setEnd_time(c.getEnd_time());
                    userCoupon.setExt(c.getExt());
                    userCoupon.setPrice(c.getPrice());
<<<<<<< HEAD
=======
                    userCoupon.setPic_url(c.getPic_url());
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
                    usercouponDao.insert(userCoupon) ;
                    cos.add(JSON.toJSON(userCoupon));
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }
<<<<<<< HEAD
=======
        if(cos.size() == 0 ){
            return "@json:" + Constants.NOMORE ;
        }
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
        JSONObject res = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("coupons",cos ) ;
        res.put("data",data);
        res.put("code",0);
        return "@json:" + res.toJSONString();
    }



    @Get("nePop")
    @Post("nePop")
<<<<<<< HEAD
    public String nePop(Invocation inv ){
        User u = hostHolder.getUser();
        List<Coupon> coupons  = couponDao.getCouponRule(new Date());
        JSONArray cos = new JSONArray();
        for (Coupon c : coupons ){
            List<UserCoupon> tickets = usercouponDao.getUser_Coupon(u.getId(),c.getId());
            if (tickets == null  || tickets.size() == 0 ) {
                cos.add(JSON.toJSON(c)); ;
            }
        }
        JSONObject res = new JSONObject();
        JSONObject data = new JSONObject();
=======
    public String nePop(Invocation inv ,@Param("shop_id")  long shop_id ){
        User u = hostHolder.getUser();
        JSONObject res = new JSONObject();
        JSONObject data = new JSONObject();

        JSONArray cos = new JSONArray();
        if (shop_id == 10033 ) {
            List<Coupon> coupons  = couponDao.getCouponRule(new Date(System.currentTimeMillis()));
            for (Coupon c : coupons) {
                List<UserCoupon> tickets = usercouponDao.getUserALLCoupon(u.getId(), c.getId());
                if (tickets == null || tickets.size() == 0) {
                    cos.add(JSON.toJSON(c));
                    ;
                }
            }
        }
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
        data.put("coupons",cos ) ;
        res.put("data",data);
        res.put("code",0);
        return "@json:" + res.toJSONString();
    }

<<<<<<< HEAD

=======
>>>>>>> c2ba49821de2cab88bda3ed2aaf243e65855ea77
}
