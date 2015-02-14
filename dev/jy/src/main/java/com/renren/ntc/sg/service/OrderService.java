package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
        int first = 0 ;
        for (Order o : orders) {
            Address adr = addressService.getAddress(o.getAddress_id());
            if( null == adr ) {
                System.out.println(String.format("Miss address drop order %s " ,o.getOrder_id()) );
                continue;
            }
            o.setPhone(adr.getPhone());
            o.setAddress(adr.getAddress());
            o.setStatus4V(toStr(o.getStatus(), first));
            o.setPrice4V(((float) o.getPrice() / 100) + "");
            o.setSnapshot(f(o.getSnapshot()));
            oo.add(o);
            first ++;
        }
        return oo;
    }

    private String f(String snapshot) {
        JSONArray j  = (JSONArray) JSON.parse(snapshot);
        StringBuffer sb = new StringBuffer();
        for (int k=0 ; k<j.size() ; k++){
           JSONObject jb = (JSONObject) j.get(k);
           sb.append(jb.getString("name"));
            sb.append(jb.getString(" "));
            sb.append(jb.getString("count"));
            sb.append(jb.getString(" "));
            sb.append(jb.getFloat("price")/100);
            sb.append(jb.getString(";"));

        }
            return sb.toString();

    }

    private String toStr(int status,int first) {
        if (first ==0 ){
            return "最新订单";
        }
        return "历史订单" ;
    }
}
