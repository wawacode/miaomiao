package com.renren.ntc.sg.util;

import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import net.paoding.rose.scanning.context.RoseAppContext;

import java.io.IOException;
import java.util.List;


public class MvOrder {

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        OrdersDAO orderDao  = rose.getBean(OrdersDAO.class);
        UserOrdersDAO userDao  = rose.getBean(UserOrdersDAO.class);

        for (long i = 0 ; i <1000 ; i ++){
            List<Order> ol = orderDao.get10Orders(i,0,1000,SUtils.generOrderTableName(i));
            for (Order o :ol){
                System.out.println("insert " + o.getOrder_id() +  " "  );
                userDao.insertUpdate(o,SUtils.generUserOrderTableName(o.getUser_id())) ;
            }
        }
    }




}