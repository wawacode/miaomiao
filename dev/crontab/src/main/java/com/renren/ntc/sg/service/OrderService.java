package com.renren.ntc.sg.service;

import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.biz.dao.AddressDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 14-12-21
 * Time: 上午11:29
 * To change this template use File | Settings | File Templates.
 */
@Service
public class OrderService {

    @Autowired
    public AddressService addressService;

    public  List<Order> forV(List<Order> orders) {
        List<Order> oo =   new ArrayList<Order>();
        for (Order o : orders) {
            Address adr = addressService.getAddress(o.getAddress_id());
            if( null == adr ) {
                System.out.println(String.format("Miss address drop order %s " ,o.getOrder_id()) );
                continue;
            }
            o.setPhone(adr.getPhone());
            o.setAddress(adr.getAddress());
            o.setStatus4V(toStr(o.getStatus()));
            oo.add(o);
        }
        return oo;
    }

    private String toStr(int status) {
        return "配送中" ;
    }
}
