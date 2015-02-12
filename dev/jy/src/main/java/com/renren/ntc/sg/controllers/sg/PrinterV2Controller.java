package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.annotations.DenyCommonAccess;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.dao.SWPOrderDAO;
import com.renren.ntc.sg.service.*;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URLEncoder;
import java.util.List;

@DenyCommonAccess
@Path("v2")
public class PrinterV2Controller {

    private static int DEFAULT_S = 1;

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    ShopDAO shopDao ;

    @Autowired
    public OrdersDAO ordersDAO ;

    @Autowired
    public OrderService orderService ;

    @Autowired
    public CatStaffCommitDAO catStaffCommitDao;

    @Autowired
    public PrinterService printerService ;

    @Autowired
    public AddressDAO addressDAO;

    @Autowired
    public SMSService smsService;

    @Autowired
    public PushService pushService;

    public  boolean  nn = true;
    /**
     * 用于处理用户喜欢和不喜欢的ajax请求，成功返回1，失败返回0
     *
     * @return
     */
    @Get("get")
    @Post("get")
    public String get(Invocation inv, @Param("pid") long pid, @Param("token") String token) {

        // 验证
        if (0 > pid && StringUtils.isBlank(token)) {
            LoggerUtils.getInstance().log(String.format("pid illegal error param  %d ,%s", pid, token));
            return "@" + Constants.PARATERERROR;
        }
        if(pid == 0 && SUtils.Tokenislegal(token)){
            //创建打印机
            //生成token
            token = SUtils.generToken(token);

            Device d =  new Device();
            d.setShop_id(0);
            d.setToken(token);
            d.setStatus("init");
            d.setSecret_key("init");
            long dev_id =  deviceDAO.insert(d);
            JSONObject jb = new JSONObject();
            //打印格式拼装好
            jb.put("pid",dev_id);
            jb.put("token",token);
            jb.put("code", 101);
            return  "@" + jb.toJSONString();
        }


        Device dev = deviceDAO.getDev(pid);
        if (null == dev) {
            LoggerUtils.getInstance().log(String.format("dev is null error param  %d ,%s", pid, token));
            return "@" + Constants.PARATERERROR;
        }
        if (!dev.getToken().equals(token)) {
            LoggerUtils.getInstance().log(String.format("token illegal error param  %d ,%s ,%s ", pid, token, dev.getToken()));
            return "@" + Constants.PARATERERROR;
        }

        List<Order> orderls = ordersDAO.getOrder2Print(dev.getShop_id(),SUtils.generOrderTableName(dev.getShop_id()));
        orderls = orderService.forV(orderls) ;
        deviceDAO.update(pid, "looping");
        JSONObject jb = new JSONObject();
        jb.put("code", 0);
        //打印格式拼装好
        jb.put("data",printerService.getString(orderls));
        return "@" + jb.toJSONString();
    }

    @Get("fb")
    @Post("fb")
    public String fb(Invocation inv, @Param("pid") long pid, @Param("token") String token, @Param("orderId") String order_id, @Param("re") String re, @Param("msg") String msg) {
        // 验证
        LoggerUtils.getInstance().log(String.format("fb request param  %d ,%s  ,re: %s , msg : %s ", pid, token, re, msg));
        if (0 > pid) {
            LoggerUtils.getInstance().log(String.format("error param pid <0  %d ,%s", pid, token));
            return "@" + Constants.PARATERERROR;
        }
        Device dev = deviceDAO.getDev(pid);
        if (null == dev) {
            LoggerUtils.getInstance().log(String.format("error param  dev = null %d ,%s", pid, token));
            return "@" + Constants.PARATERERROR;
        }
        if (!dev.getToken().equals(token)) {
            LoggerUtils.getInstance().log(String.format("token illegal error param  %d ,%s ,%s ", pid, token, dev.getToken()));
            return "@" + Constants.PARATERERROR;
        }
        Shop shop = shopDao.getShop(dev.getShop_id());
        int r = 0;
        if ("true".equals(re)) {
            // AB 测试
            if (order_id.startsWith("C")){
                System.out.println( String.format( "%d, %s %s" ,2, order_id,SUtils.generOrderTableName(dev.getShop_id())));
                r = ordersDAO.update(2, order_id,SUtils.generOrderTableName(dev.getShop_id()));
            }
            if (r == 1) {
                smsService.sendSMS2User(order_id,shop);
            }
        }

        //发短信通知
        if (r != 1) {
            LoggerUtils.getInstance().log(String.format("fail to update order %s  pid  %d  token %s", order_id, pid, token));
        }

        //发短信通知
        pushService.send2Boss(order_id, shop);
        smsService.sendSMS2Boss(order_id,shop);

        return "@" + Constants.DONE;
    }

    @Get("update")
    @Post("update")
    public String update(Invocation inv, @Param("pid") long pid, @Param("token") String token, @Param("status") String status) {
        // 验证
        if (0 > pid) {
            LoggerUtils.getInstance().log(String.format("error param  %d ,%s", pid, token));
            return "@" + Constants.PARATERERROR;
        }
        Device dev = deviceDAO.getDev(pid);
        if (null == dev) {
            LoggerUtils.getInstance().log(String.format("error param  %d ,%s", pid, token));
            return "@" + Constants.PARATERERROR;
        }
        if (!dev.getToken().equals(token)) {
            LoggerUtils.getInstance().log(String.format("token illegal error param  %d ,%s ,%s ", pid, token, dev.getToken()));
            return "@" + Constants.PARATERERROR;
        }
        deviceDAO.update(pid, status);


        return "@" + Constants.DONE;
    }

    @Get("rp")
    @Post("rp")
    public String rp(Invocation inv, @Param("pid") long pid, @Param("token") String token, @Param("status") String status) {
        // 验证
        if (0 > pid) {
            LoggerUtils.getInstance().log(String.format("error param  %d ,%s", pid, token));
            return "@" + Constants.PARATERERROR;
        }
        Device dev = deviceDAO.getDev(pid);
        if (null == dev) {
            LoggerUtils.getInstance().log(String.format("error param  %d ,%s", pid, token));
            return "@" + Constants.PARATERERROR;
        }
        if (!dev.getToken().equals(token)) {
            LoggerUtils.getInstance().log(String.format("token illegal error param  %d ,%s ,%s ", pid, token, dev.getToken()));
            return "@" + Constants.PARATERERROR;
        }
        LoggerUtils.getInstance().log(String.format("pinter %d  , fb :%s , ", pid, status));
        return "@" + Constants.DONE;
    }

    @Get("query")
    public String query (Invocation inv ,@Param("chn") String chn){
        JSONArray jarr =  new JSONArray();
        if ("print".equals(chn)){
            List<Device>  ls = deviceDAO.getDevs();
            for (Device d :ls ){
                JSONObject jb =   new JSONObject();
                jb.put(d.getId()+ "" ,d.getStatus() + "_" + d.getUpdate_time());
                jarr.add(jb);
            }
        }

        if ("order".equals(chn)){
            List<Order>  ls = ordersDAO.get10Orders(SUtils.generOrderTableName(1));
            for (Order o :ls ){
                JSONObject jb =   new JSONObject();
                jb.put( o.getOrder_id() ,o.getStatus() + o.getSnapshot());
                jarr.add(jb);
            }
        }
        return "@" + jarr.toJSONString();
    }

    private static String getAdress(String address) {
        int index = address.indexOf("#address#");
        int index2 = address.indexOf("#orderDetail#");
        if (-1 == index || -1 == index) {
            return "";

        }
        return address.substring(index + 10, index2);
    }


    private static String getOrs(String address) {
        int index = address.indexOf("#orderDetail#");
        if (-1 == index) {
            return "";
        }
        String order = address.substring(index + 14, address.length());
        return order;
    }

    private static int getItem(String ob) {
        String[] obs = ob.split("\\*\\|");
        String sum = obs[obs.length - 1];
        int a = 0;
        try {
            Float f = Float.valueOf(sum);
            a = (int) ((f * 100) / 1);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return a;

    }

    private static String forURL(String url, String appkey, String tid, String mobile, String value) {
        return url + "?key=" + appkey + "&dtype=json&mobile=" + mobile + "&tpl_id=" + tid + "&tpl_value=" + value;

    }
}
