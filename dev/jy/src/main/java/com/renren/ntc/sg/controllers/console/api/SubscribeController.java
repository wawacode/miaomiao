package com.renren.ntc.sg.controllers.console.api;

import com.renren.ntc.sg.bean.PushToken;
import com.renren.ntc.sg.biz.dao.PushTokenDAO;
import com.renren.ntc.sg.util.Constants;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-2-4
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */
@Path("subscribe")
public class SubscribeController {

    @Autowired
    public PushTokenDAO pushtokenDao ;


    @Post("")
    @Get("")
    public String subscribe(Invocation inv,@Param("ower_phone") String  owner_phone, @Param("chn") String chn,
                            @Param("device_token") String  device_token ){

        PushToken  pushtoken =  new PushToken();
        pushtoken.setOwner_phone(owner_phone);
        pushtoken.setDevice_token(device_token);
        pushtoken.setChn(chn);
        pushtokenDao.insertPushToken(pushtoken) ;
        return "@json:" + Constants.DONE;
    }

}
