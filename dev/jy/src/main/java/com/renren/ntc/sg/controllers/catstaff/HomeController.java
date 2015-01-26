package com.renren.ntc.sg.controllers.catstaff;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.CatStaffCommit;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.biz.dao.CatStaffCommitDAO;
import com.renren.ntc.sg.biz.dao.CatStaffDAO;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.RegistUserDAO;
import com.renren.ntc.sg.service.CreateShopService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("")
public class HomeController {


    @Autowired
    public CreateShopService createShopService;


    @Autowired
    public RegistUserDAO registUserDAO;

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    public CatStaffCommitDAO catStaffCommitDAO;

    /*
      staff_pwd 是一个类似密码的东西 由我直装到地推人员手机上
     */
    @Get("commit")
    @Post("commit")
    public String index(Invocation inv, @Param("staff_phone") String staff_phone,
                        @Param("staff_name") String staff_name, @Param("staff_pwd") String staff_pwd,
                        @Param("shop_name") String shop_name,
                        @Param("shop_owner_phone") String shop_owner_phone,
                        @Param("shop_address") String shop_address,
                        @Param("shop_tel") String shop_tel,
                        @Param("shop_print") String shop_print,
                        @Param("shop_lat") double shop_lat,
                        @Param("shop_lng") double shop_lng) {

        if (!legal(staff_phone, staff_name, staff_pwd)) {
            return "@" + Constants.PARATERERROR;
        }

//        System.out.println(String.format("%s,%s ,%s, %s,%s, %s",staff_phone,staff_name,staff_pwd,shop_name,shop_tel,sho p_print)+","+shop_lat+","+shop_lng);
        if (StringUtils.isBlank(shop_name) || StringUtils.isBlank(shop_tel) ||
                StringUtils.isBlank(shop_print)
                || StringUtils.isBlank(shop_address) ||
                StringUtils.isBlank(shop_owner_phone)||
                StringUtils.isBlank(shop_name) ||
                0 == shop_lat ||
                0 == shop_lng) {
            return "@" + Constants.PARATERERROR;
        }
        RegistUser reuser = registUserDAO.getUser(shop_tel) ;
        if(null != reuser ){
            String message = Constants.PRERROR.replace("{msg}","店铺电话已经注册过");
            return "@" + message  ;
        }
        Device device = deviceDAO.getDev(shop_print) ;
        if(null == device ){
            LoggerUtils.getInstance().log(String.format(" input %s; ",shop_print));
            String message = Constants.PRERROR.replace("{msg}","提交打印机码错误");
            return "@" + message ;
        }

        CatStaffCommit catStaffCommit = new CatStaffCommit();
        catStaffCommit.setName(staff_name);
        catStaffCommit.setPhone(staff_phone);
        catStaffCommit.setPwd(staff_pwd);
        catStaffCommit.setShop_name(shop_name);
        catStaffCommit.setShop_owner_phone(shop_owner_phone);
        catStaffCommit.setShop_tel(shop_tel);
        catStaffCommit.setShop_print(shop_print);
        catStaffCommit.setShop_address(shop_address);
        catStaffCommit.setShop_lat(shop_lat);
        catStaffCommit.setShop_lng(shop_lng);
        System.out.println( "commit " + catStaffCommit.getShop_print());
        long catstaff_id = catStaffCommitDAO.insert(catStaffCommit);
        System.out.println( "commit " + catstaff_id);
        JSONObject re = createShopService.createShop(catstaff_id);
        System.out.println("create shop " + re.toJSONString());
        JSONObject jb = new JSONObject();
        jb.put("code", 0);
        System.out.println("re shop " + re.getLong("shop_id"));
        jb.put("url", "http://www.mbianli.com/sg/loading#/shop?shop_id=" + re.getLong("shop_id"));
        return "@" + jb.toJSONString();
    }

    private boolean legal(String phone, String staff_name, String staff_pwd) {

        return true;
    }

    @Get("query")
    @Post("query")
    public String index(Invocation inv, @Param("staff_phone") String staff_phone,
                        @Param("staff_name") String staff_name,
                        @Param("staff_pwd") String staff_pwd,@Param("from") int from, @Param("offset") int offset)
    {
        if (!legal(staff_phone, staff_name, staff_pwd)) {
        return "@" + Constants.PARATERERROR;
    }
        List<CatStaffCommit>  catls =  catStaffCommitDAO.getCatStaffCommit(staff_name ,staff_pwd,from ,offset);

        JSONArray jarr = (JSONArray) JSON.toJSON(catls);

        JSONObject jb = new JSONObject();
        jb.put("code",0);
        jb.put("data",jarr);
        return "@"+jb.toJSONString() ;
    }

    // 这个接口可以测试用
    @Get("test2")
    @Post("test2")
    public String test2(Invocation inv) {

        return "tool2";
    }

    @Get("test")
    @Post("test")
    public String test(Invocation inv) {
        return "tool";
    }
}
