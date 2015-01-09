package com.renren.ntc.sg.controllers.catstaff;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.CatStaffCommit;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.biz.dao.CatStaffCommitDAO;
import com.renren.ntc.sg.biz.dao.CatStaffDAO;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.service.CreateShopService;
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
    public CatStaffDAO catStaffDAO;

    @Autowired
    public CatStaffCommitDAO catStaffCommitDAO;

    /*
      staff_pwd 是一个类似密码的东西 由我直装到地推人员手机上
     */
    @Get("commit")
    @Post("commit")
    public String index( Invocation inv, @Param("staff_phone") String staff_phone,
                         @Param("staff_name") String staff_name,@Param("staff_pwd") String staff_pwd,
                         @Param("shop_name") String shop_name,
                         @Param("shop_tel") String shop_tel,
                         @Param("shop_print") String shop_print,
                         @Param("shop_lat") double shop_lat,
                         @Param("shop_lng") double shop_lng) {
            if (!legal(staff_phone,staff_name,staff_pwd)){
                return "@" + Constants.PARATERERROR;
            }
             if (StringUtils.isBlank(shop_name)||StringUtils.isBlank(shop_tel)||
                     StringUtils.isBlank(shop_print)
                     ||StringUtils.isBlank(shop_print)||
                     StringUtils.isBlank(shop_name)||
                     0  == shop_lat||
                     0 == shop_lng) {

                 return "@" + Constants.PARATERERROR;

             }
                CatStaffCommit catStaffCommit  = new CatStaffCommit();
                catStaffCommit.setName(staff_name);
                catStaffCommit.setPhone(staff_phone);
                catStaffCommit.setPwd(staff_pwd);
                catStaffCommit.setShop_name(shop_name);
                catStaffCommit.setShop_tel(shop_tel);
                catStaffCommit.setShop_print(shop_print);
                catStaffCommit.setShop_lat(shop_lat);
                catStaffCommit.setShop_lng(shop_lng);
                long catstaff_id =  catStaffCommitDAO.insert(catStaffCommit);
                JSONObject re = createShopService.createShop(catstaff_id);
                JSONObject jb =  new JSONObject();
                jb.put("code",0);
                jb.put("url","http://www.mbianli.com/sg/shop?shop_id=" + re.getLong("shop_id"));
                return "@" + jb.toJSONString();
    }

    private boolean legal(String phone, String staff_name, String staff_pwd) {


        return true;
    }


    @Get("test")
    @Post("test")
    public String  test (Invocation inv){
        return "tool";
    }

}
