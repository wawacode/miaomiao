package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.AddressDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
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
    public ShopDAO shopDAO;


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
            String msg = o.getMsg();
            JSONObject js = (JSONObject) JSON.parse(msg);
            if (null != js){
               o.setConfirm(js.getString("confirm"));
            }
            o.setPrice4V(((float) o.getPrice() / 100) + "");
            Shop shop = shopDAO.getShop(o.getShop_id());
            o.setShop_name4V(shop.getName());
            oo.add(o);
            first ++;
        }
        return oo;
    }
    
    public void f(List<Order> orderls) {
        for ( Order o : orderls){
        JSONArray j  = (JSONArray) JSON.parse(o.getInfo());
        StringBuffer sb = new StringBuffer();
        for (int k=0 ; k<j.size() ; k++){
            JSONObject jb = (JSONObject) j.get(k);
            sb.append(jb.getString("name"));
            sb.append("数量");
            sb.append(jb.getString("count"));
            sb.append("单价");
            sb.append(jb.getFloat("price")/100);
            sb.append(";<br/>");
        }
         o.setInfo(sb.toString());
        }
    }



    private String toStr(int status,int first) {
        if (first ==0 ){
            return "最新订单";
        }
        return "历史订单" ;
    }
}
