package com.renren.ntc.sg.stats;

import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.TopUser;
import com.renren.ntc.sg.biz.dao.AddressDAO;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class UserLose {


    private static long shop_id = 1;

    public UserLose() throws IOException {

    }



    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        OrdersDAO orderdDao = rose.getBean(OrdersDAO.class);
        AddressDAO addressDao = rose.getBean(AddressDAO.class);

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -1);

        Date start= cal.getTime();
        Date end= new Date ();

        List<TopUser> uses = orderdDao.getTop100User(SUtils.generOrderTableName(shop_id),start, end) ;
        System.out.println(uses.size());
        for (TopUser s : uses){
            Address as = addressDao.getAddress(s.getAddress_id());
            List<Order> orders = orderdDao.getOrderByAddressId(SUtils.generOrderTableName(shop_id),as.getId());

            System.out.println(String.format("用户----%s %s",as.getAddress(),as.getPhone()));
            for (Order o : orders){
                Date date =  o.getCreate_time();
                Calendar c = Calendar.getInstance();
                c.setTime(date);
                String week  = forV(c.get(Calendar.DAY_OF_WEEK)) ;
                System.out.println(String.format("--------------订单金额 %s元 下单时间 %s %s",(float)o.getPrice()/100 +"" ,o.getCreate_time(),week));
            }

        }



    }

    private static String forV(int i) {
        return "星期" + (i-1) ;  //To change body of created methods use File | Settings | File Templates.
    }


}