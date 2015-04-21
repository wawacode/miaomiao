package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.VerDAO;
import com.renren.ntc.sg.dao.*;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("cli")
public class CliController {

    private static int DEFAULT_SHOP_ID = 1;
    @Autowired
    private DeviceDAO deviceDAO   ;

    @Autowired
    private VerDAO verDAO  ;


    @Get("uck")
    public String hot (Invocation inv,@Param("pid") long  pid ,@Param("token")String token, @Param("ver")String ver ){
        // 校验合法性
        if ( 0 > pid) {
            LoggerUtils.getInstance().log(String.format("pid illegal error param  %d ,%s", pid, token  ) );
            return "@" + Constants.PARATERERROR;
        }
        Device dev  = deviceDAO.getDev(pid);
        if(null == dev){
            LoggerUtils.getInstance().log(String.format("dev is null error param  %d ,%s", pid, token  ) );
            return "@" + Constants.PARATERERROR;
        }
        if (!dev.getToken().equals(token)){
            LoggerUtils.getInstance().log(String.format("token illegal error param  %d ,%s ,%s ", pid, token ,dev.getToken() ) );
            return "@" + Constants.PARATERERROR;
        }

       Ver v =  verDAO.getNewVer();
       if(null ==  v){
           return "@" +Constants.ALLREADYNEW;
       }
       String vv =  v.getVer();
       if (!vv.equals(ver)) {
           JSONObject jb =  new JSONObject();
           jb.put("code",8888);
           jb.put("msg","need update");
           jb.put("url",v.getUrl());
           return "@" + jb.toJSONString();
       }
        return "@json:" + Constants.ALLREADYNEW;
    }


}


