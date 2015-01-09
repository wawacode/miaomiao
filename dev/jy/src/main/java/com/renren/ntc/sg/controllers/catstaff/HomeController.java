package com.renren.ntc.sg.controllers.catstaff;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("")
public class HomeController {


    /*
      staff_pwd 是一个类似密码的东西 由我直装到地推人员手机上
     */
    @Get("commit")
    @Post("commit")
    public String index( Invocation inv, @Param("staff_phone") String phone,
                         @Param("staff_name") String staff_name,@Param("staff_pwd") String staff_pwd,
                         @Param("shop_name") String shop_name,
                         @Param("shop_tel") String shop_tel,
                         @Param("shop_print") String shop_print,
                         @Param("shop_lat") String shop_lat,
                         @Param("shop_lng") String shop_lng) {


           JSONObject jb =  new JSONObject();
           jb.put("code",0);
           jb.put("url","http://www.mbianli.com/sg/shop?shop_id=1");
           return "@" + jb.toJSONString();
    }

    @Get("test")
    @Post("test")
    public String  test (Invocation inv){
        return "tool";
    }

}
