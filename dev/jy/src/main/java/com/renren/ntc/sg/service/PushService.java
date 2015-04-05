package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.mongo.MongoDBUtil;
import com.renren.ntc.sg.umeng.push.android.*;
import com.renren.ntc.sg.umeng.push.ios.IOSUnicast;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.util.List;


@Service
public class PushService {

    @Autowired
    public PushTokenDAO pushTokenDao ;


    @Autowired
    public OrdersDAO ordersDAO ;

    @Autowired
    public AddressDAO addressDAO;

    @Autowired
    public CatStaffDAO catStaffDao;

    @Autowired
    public CatStaffCommitDAO catStaffCommitDao ;

	private String appkey = "54cb1485fd98c571bd000243";

	private String appMasterSecret = "uopev2ouz3kt9h0foca3nzn9yambvqgc";

    private String iOS_appkey =  "54cb1576fd98c52cbe0004a5" ;

    private String iOS_appMasterSecret = "gfkrogdk6jp4uswlt53vi3rntziiinug";

	private String timestamp = null;


    public void send2Boss(String order_id, Shop shop) {
        try {

            Order order = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop.getId()));
            String v = null;
            String url;
            byte[] t = null;
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            float p = (float) order.getPrice() / 100;
            String pre = "您有新订单了,";
            if("wx".equals(order.getAct())){
                pre = pre + "支付方式：微信支付,";
            }else{
                pre = pre + "支付方式：货到付款,";
            }
            String message = pre + adrs.getAddress() + " " + adrs.getPhone()  +
                    " 总额：" +  p ;


            if (shop != null) {
                String phone = shop.getTel();
                List <PushToken> pushTokens = pushTokenDao.getPushToken(phone);
                for (PushToken pushToken   : pushTokens )   {
                    if(pushToken ==  null){
                        LoggerUtils.getInstance().log(String.format("miss push token  %s ", phone));
                        return ;
                    }
                    send(pushToken, message);
                }
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }


    public void send2locPush(String order_id, Shop shop) {
        try {

            Order order = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop.getId()));
            String v = null;
            String url;
            byte[] t = null;
            String response = "用户下单";
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            float p = (float) order.getPrice() / 100;
            String pre = "您有新订单了,";
            if("wx".equals(order.getAct())){
                pre = pre + "支付方式：微信支付,";
            }else{
                pre = pre + "支付方式：货到付款,";
            }

            String message = pre + shop.getName() + " "+ adrs.getAddress() + " " + adrs.getPhone()  +
                    " 总额：" +  p ;
            if (shop != null) {
                List<CatStaffCommit> catcommitls = catStaffCommitDao.getbyShopid(shop.getId());
                for (CatStaffCommit catcommit : catcommitls ){
                    List<PushToken> pushTokens = pushTokenDao.getPushToken(catcommit.getPhone());
                    for (PushToken pushToken  : pushTokens)  {
                        if(pushToken ==  null){
                            LoggerUtils.getInstance().log(String.format("miss push token  %s ", catcommit.getPhone()));
                            return ;
                        }
                        send(pushToken, message);
                    }
                }
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
    public void send2kf(String order_id, Shop shop) {
        try {
            Order order = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop.getId()));
            String v = null;
            String url;
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            float p = (float) order.getPrice() / 100;

            String pre = "您有新订单了,";
            if("wx".equals(order.getAct())){
                pre = pre + "支付方式：微信支付,";
            }else{
                pre = pre + "支付方式：货到付款,";
            }
            String message = pre + shop.getName() + " "+ adrs.getAddress() + " " + adrs.getPhone()  +
                    " 总额：" +  p ;
            if (shop != null) {
                List<Catstaff> catstaffls = catStaffDao.getCatStaffbyType(2);
                for (Catstaff  catstaff : catstaffls ){
                    List<PushToken> pushTokens = pushTokenDao.getPushToken(catstaff.getPhone());
                    for (PushToken pushToken  : pushTokens){
                        if(pushToken ==  null){
                            LoggerUtils.getInstance().log(String.format("miss push token  %s ", catstaff.getPhone()));
                            return ;
                        }
                        send(pushToken, message);
                    }
                }
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }


    public  void send(PushToken pushToken,String message){
        this.timestamp = Integer.toString((int)(System.currentTimeMillis() / 1000));
        String phone = pushToken.getOwner_phone();
         if (null != pushToken) {
             try {
                 if ("iOS".equals(pushToken.getChn())) {
                     LoggerUtils.getInstance().log(pushToken.getOwner_phone() + " " + pushToken.getDevice_token() + " send ios");
                     sendIOSUnicast(phone, message, pushToken.getDevice_token());
                 } else {
                     LoggerUtils.getInstance().log(phone + " " + pushToken.getDevice_token() + " send adr ");
                     sendAndroidUnicast(phone, message, pushToken.getDevice_token());
                 }
             } catch (Exception e) {
                 e.printStackTrace();
             }

         }
    }

	
	public void sendAndroidUnicast(String title , String message ,String device_token) throws Exception {

        this.timestamp = Integer.toString((int)(System.currentTimeMillis() / 1000));
		AndroidUnicast unicast = new AndroidUnicast();
		unicast.setAppMasterSecret(appMasterSecret);
		unicast.setPredefinedKeyValue("appkey", this.appkey);
		unicast.setPredefinedKeyValue("timestamp", this.timestamp);
		// TODO Set your device token
		unicast.setPredefinedKeyValue("device_tokens", device_token);
		unicast.setPredefinedKeyValue("ticker", "Android unicast ticker");
		unicast.setPredefinedKeyValue("title",  "喵喵生活");
		unicast.setPredefinedKeyValue("text",   message);
		unicast.setPredefinedKeyValue("after_open", "go_app");
		unicast.setPredefinedKeyValue("display_type", "notification");
		// TODO Set 'production_mode' to 'false' if it's a test device. 
		unicast.setPredefinedKeyValue("production_mode", "true");
		if(unicast.send()){
            LoggerUtils.getInstance().log(String.format("adr fail to send device_token"));
        }
	}

    public void sendIOSUnicast(String title , String message ,String device_token) throws Exception {
        this.timestamp = Integer.toString((int)(System.currentTimeMillis() / 1000));
        IOSUnicast unicast = new IOSUnicast();
        unicast.setAppMasterSecret(iOS_appMasterSecret);
        unicast.setPredefinedKeyValue("appkey", this.iOS_appkey);
        unicast.setPredefinedKeyValue("timestamp", this.timestamp);
        // TODO Set your device token
        unicast.setPredefinedKeyValue("device_tokens", device_token);
        unicast.setPredefinedKeyValue("alert", message);
        unicast.setPredefinedKeyValue("badge", 1);
        unicast.setPredefinedKeyValue("sound", "chime");
        // TODO set 'production_mode' to 'true' if your app is under production mode
        unicast.setPredefinedKeyValue("production_mode", "true");
        // Set customized fields
        unicast.setCustomizedField("test", "helloworld");
        if(unicast.send()){
            LoggerUtils.getInstance().log(String.format("ios fail to send device_token"));
        }
    }






	
	public static void main(String[] args) {
		// TODO set your appkey and master secret here
		PushService demo = new PushService();
		try {
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
