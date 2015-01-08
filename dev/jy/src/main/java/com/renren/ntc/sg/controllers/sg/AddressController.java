package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.dao.SWPOrderDAO;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.service.AddressService;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("address")
public class AddressController {

    private static int DEFAULT_SHOP_ID = 1;

    @Autowired
    public AddressService addressService;

    @Autowired
    NtcHostHolder  ntcHostHolder;

    /**
     * 地址入口
     * @param inv
     * @return
     */
    @Get("")
    @Post ("")
    public String get (Invocation inv, @Param("shop_id") long shop_id , @Param("origUrl") String origUrl  ){
        User u = ntcHostHolder.getUser();
        if ( null ==u ||  0 >= u.getId()){
            return "error";

        }

        List<Address> ls  = addressService.getAddresses(u.getId());
        inv.addModel("addressls",ls);
        inv.addModel("origUrl",origUrl);
        return "address" ;
    }

    @Get("del")
    @Post ("del")
    public String del (Invocation inv , long address_id){

        User u = ntcHostHolder.getUser();
        if ( null ==u ||  0 >= u.getId()){
            return "error";
        }
        Address  address  = addressService.getAddress(address_id);
        if (u.getId() !=  address.getUser_id()){
            inv.addModel("msg" ,"无修改权限，请刷新后再试");
            return "error";
        }
        inv.addModel("addressls",address);
        return "address" ;
    }


    @Get("add")
    @Post ("add")
    //添加并设置为默认地址
    public String add (Invocation inv ,@Param("phone") String phone ,@Param("address") String address){
        User u = ntcHostHolder.getUser();
        if ( null ==u ||  0 >= u.getId()){
            inv.addModel("msg" ,"请刷新后再试");
            return "error";
        }
        Address add = new Address();
        add.setUser_id(u.getId());
        add.setAddress(address);
        add.setPhone(phone);
        long  address_id = addressService.addAddress(add) ;
        addressService.cleanDefaultAddress(u.getId());
        addressService.defaultAddress(address_id) ;
        Address adrs = addressService.getAddress(address_id) ;
        JSONObject  j=  new JSONObject() ;
        j.put("address_id",address_id) ;
        j.put("address",adrs.getAddress());
        j.put("phone",adrs.getPhone());
        JSONObject respone =  new JSONObject();
        respone.put("code" ,0);
        respone.put("data" ,j);
        return "@" + respone.toJSONString();
    }

    @Get("update")
    @Post ("update")
    public String update (Invocation inv ,@Param("shop_id") long shop_id ,@Param("address_id") long address_id ,@Param("phone") String phone,@Param("name") String name ,@Param("address") String address){
        User u = ntcHostHolder.getUser();
        if ( null ==u ||  0 >= u.getId()){
            inv.addModel("msg" ,"请刷新后再试");
            return "error";
        }
        Address add = new Address();
        add.setId(address_id);
        add.setUser_id(u.getId());
        add.setAddress(address);
        add.setPhone(phone);
        addressService.updateAddress(add) ;
        return "@" + Constants.DONE;
    }

    //更新默认地址
    @Get("default")
    @Post("default")
    public String update (Invocation inv,@Param("shop_id") long shop_id ,@Param("address_id") long address_id ,
                          @Param("phone") String phone ,@Param("address") String address){
        //追加这个量个参数的支持
        User u = ntcHostHolder.getUser();
        if ( null ==u ||  0 >= u.getId()){
            inv.addModel("msg" ,"请刷新后再试");
            return "error";
        }
        if (0 == address_id){
            Address addre =   new Address();
            addre.setPhone(phone)  ;
            addre.setAddress(address);
            addre.setUser_id(u.getId());
            address_id = addressService.addAddress(addre);
        }
        addressService.cleanDefaultAddress(u.getId());
        addressService.defaultAddress(address_id) ;
        return "@" + Constants.DONE;
    }
}


