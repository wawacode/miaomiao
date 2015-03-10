package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.PushToken;
import com.renren.ntc.sg.bean.User;
import com.renren.ntc.sg.biz.dao.StorageDAO;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
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
 * Date: 15-3-10
 * Time: 下午7:49
 * To change this template use File | Settings | File Templates.
 */
 @Path("stroge")
public class StrogeController {

    @Autowired
    public NtcHostHolder holder;
    @Autowired
    public StorageDAO storageDao;

    @Post("set")
    @Get("set")
    public String set(Invocation inv,@Param("shop_id") long shop_id){
        User u = holder.getUser();

        return "@json;" + Constants.DONE;
    }
    @Post("get")
    @Get("get")
    public String get(Invocation inv ){
        JSONObject  jb = new JSONObject();
        long shop_id  = 1;
        jb.put("shop_id",shop_id);
        return "@json;" + jb.toJSONString();
    }




}
