package com.renren.ntc.sg.controllers.console;

import com.renren.ntc.sg.bean.RegistUser;
import com.renren.ntc.sg.biz.dao.ShopDAO;
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

    @Post("")
    @Get("")
    public String subscribe(Invocation inv, @Param("owner_id") long  ower_id,@Param("ower_phone") String  owner_phone,
                            @Param("device_token") String  device_token ){

        return "regist";
    }

}