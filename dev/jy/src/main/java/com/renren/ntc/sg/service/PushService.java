package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.PushToken;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.AddressDAO;
import com.renren.ntc.sg.biz.dao.CatStaffCommitDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.PushTokenDAO;
import com.renren.ntc.sg.mongo.MongoDBUtil;
import com.renren.ntc.sg.umeng.push.android.*;
import com.renren.ntc.sg.umeng.push.ios.IOSUnicast;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;


@Service
public class PushService {

    @Autowired
    public PushTokenDAO pushTokenDao ;


    @Autowired
    public OrdersDAO ordersDAO ;

    @Autowired
    public AddressDAO addressDAO;

    @Autowired
    public CatStaffCommitDAO catStaffCommitDao ;

	private String appkey = "54cb1485fd98c571bd000243";
	private String appMasterSecret = "uopev2ouz3kt9h0foca3nzn9yambvqgc";

    private String iOS_appkey =  "54cb1576fd98c52cbe0004a5" ;

    private String iOS_appMasterSecret = "uopev2ouz3kt9h0foca3nzn9yambvqgc";

	private String timestamp = null;


	public PushService() {
	}


    public  void send(String phone,String message){
        this.timestamp = Integer.toString((int)(System.currentTimeMillis() / 1000));
         String device_token = null;
         PushToken pushToken = pushTokenDao.getPushToken(phone);
         if (null != pushToken){
             try {
                 if ("iOS".equals(pushToken.getChn())){
                     LoggerUtils.getInstance().log("send ios");
                     sendIOSUnicast(phone, message, pushToken.getDevice_token());
                 } else{
                    sendAndroidUnicast(phone,message,pushToken.getDevice_token());
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
		// For how to register a test device, please see the developer doc.
		unicast.setPredefinedKeyValue("production_mode", "true");
		// Set customized fields
//		unicast.setExtraField("test", "helloworld");
		unicast.send();
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
        unicast.setPredefinedKeyValue("production_mode", "false");
        // Set customized fields
        unicast.setCustomizedField("test", "helloworld");
        unicast.print();
        unicast.send();
    }

    public void send2Boss(String order_id, Shop shop) {
        try {

            Order value = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop.getId()));
            String v = null;
            String url;
            byte[] t = null;
            String response = "用户下单";
            long adr_id = value.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            float p = (float) value.getPrice() / 100;
            String message = "您有新订单了 ," + adrs.getAddress() + " " + adrs.getPhone()  +
                    " 总额：" +  p ;
//            message = SUtils.span(message);
//            message = URLEncoder.encode(message, "utf-8");
            //短信通知 老板
            if (shop != null) {
                String phone = shop.getOwner_phone();
                PushToken pushToken = pushTokenDao.getPushToken(phone);
                send(pushToken.getOwner_phone(), message);
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

//    public void sendAndroidFilecast(String title , String message ,String device_token) throws Exception {
//        AndroidFilecast filecast = new AndroidFilecast();
//        filecast.setAppMasterSecret(appMasterSecret);
//        filecast.setPredefinedKeyValue("appkey", this.appkey);
//        filecast.setPredefinedKeyValue("timestamp", this.timestamp);
//        // TODO upload your device tokens, and use '\n' to split them if there are multiple tokens
//        filecast.uploadContents("aa"+"\n"+"bb");
//        filecast.setPredefinedKeyValue("ticker", device_token);
//        filecast.setPredefinedKeyValue("title",  title);
//        filecast.setPredefinedKeyValue("text",  message);
//        filecast.setPredefinedKeyValue("after_open", "go_app");
//        filecast.setPredefinedKeyValue("display_type", "notification");
//        filecast.send();
//    }

//	public void sendAndroidGroupcast() throws Exception {
//		AndroidGroupcast groupcast = new AndroidGroupcast();
//		groupcast.setAppMasterSecret(appMasterSecret);
//		groupcast.setPredefinedKeyValue("appkey", this.appkey);
//		groupcast.setPredefinedKeyValue("timestamp", this.timestamp);
//		/*  TODO
//		 *  Construct the filter condition:
//		 *  "where":
//		 *	{
//    	 *		"and":
//    	 *		[
//      	 *			{"tag":"test"},
//      	 *			{"tag":"Test"}
//    	 *		]
//		 *	}
//		 */
//		JSONObject filterJson = new JSONObject();
//		JSONObject whereJson = new JSONObject();
//		JSONArray tagArray = new JSONArray();
//		JSONObject testTag = new JSONObject();
//		JSONObject TestTag = new JSONObject();
//		testTag.put("tag", "test");
//		TestTag.put("tag", "Test");
//		tagArray.put(testTag);
//		tagArray.put(TestTag);
//		whereJson.put("and", tagArray);
//		filterJson.put("where", whereJson);
//		System.out.println(filterJson.toString());
//
//		groupcast.setPredefinedKeyValue("filter", filterJson);
//		groupcast.setPredefinedKeyValue("ticker", "Android groupcast ticker");
//		groupcast.setPredefinedKeyValue("title",  "中文的title");
//		groupcast.setPredefinedKeyValue("text",   "Android groupcast text");
//		groupcast.setPredefinedKeyValue("after_open", "go_app");
//		groupcast.setPredefinedKeyValue("display_type", "notification");
//		// TODO Set 'production_mode' to 'false' if it's a test device.
//		// For how to register a test device, please see the developer doc.
//		groupcast.setPredefinedKeyValue("production_mode", "true");
//		groupcast.send();
//	}
//
//	public void sendAndroidCustomizedcast() throws Exception {
//		AndroidCustomizedcast customizedcast = new AndroidCustomizedcast();
//		customizedcast.setAppMasterSecret(appMasterSecret);
//		customizedcast.setPredefinedKeyValue("appkey", this.appkey);
//		customizedcast.setPredefinedKeyValue("timestamp", this.timestamp);
//		// TODO Set your alias here, and use comma to split them if there are multiple alias.
//		// And if you have many alias, you can also upload a file containing these alias, then
//		// use file_id to send customized notification.
//		customizedcast.setPredefinedKeyValue("alias", "xx");
//		// TODO Set your alias_type here
//		customizedcast.setPredefinedKeyValue("alias_type", "xx");
//		customizedcast.setPredefinedKeyValue("ticker", "Android customizedcast ticker");
//		customizedcast.setPredefinedKeyValue("title",  "中文的title");
//		customizedcast.setPredefinedKeyValue("text",   "Android customizedcast text");
//		customizedcast.setPredefinedKeyValue("after_open", "go_app");
//		customizedcast.setPredefinedKeyValue("display_type", "notification");
//		// TODO Set 'production_mode' to 'false' if it's a test device.
//		// For how to register a test device, please see the developer doc.
//		customizedcast.setPredefinedKeyValue("production_mode", "true");
//		customizedcast.send();
//	}
//
//
//
//	public void sendIOSBroadcast() throws Exception {
//		IOSBroadcast broadcast = new IOSBroadcast();
//		broadcast.setAppMasterSecret(appMasterSecret);
//		broadcast.setPredefinedKeyValue("appkey", this.appkey);
//		broadcast.setPredefinedKeyValue("timestamp", this.timestamp);
//
//		broadcast.setPredefinedKeyValue("alert", "IOS 广播测试");
//		broadcast.setPredefinedKeyValue("badge", 0);
//		broadcast.setPredefinedKeyValue("sound", "chime");
//		// TODO set 'production_mode' to 'true' if your app is under production mode
//		broadcast.setPredefinedKeyValue("production_mode", "false");
//		// Set customized fields
//		broadcast.setCustomizedField("test", "helloworld");
//		broadcast.send();
//	}
//

//
//	public void sendIOSGroupcast() throws Exception {
//		IOSGroupcast groupcast = new IOSGroupcast();
//		groupcast.setAppMasterSecret(appMasterSecret);
//		groupcast.setPredefinedKeyValue("appkey", this.appkey);
//		groupcast.setPredefinedKeyValue("timestamp", this.timestamp);
//		/*  TODO
//		 *  Construct the filter condition:
//		 *  "where":
//		 *	{
//    	 *		"and":
//    	 *		[
//      	 *			{"tag":"iostest"}
//    	 *		]
//		 *	}
//		 */
//		JSONObject filterJson = new JSONObject();
//		JSONObject whereJson = new JSONObject();
//		JSONArray tagArray = new JSONArray();
//		JSONObject testTag = new JSONObject();
//		testTag.put("tag", "iostest");
//		tagArray.put(testTag);
//		whereJson.put("and", tagArray);
//		filterJson.put("where", whereJson);
//		System.out.println(filterJson.toString());
//
//		// Set filter condition into rootJson
//		groupcast.setPredefinedKeyValue("filter", filterJson);
//		groupcast.setPredefinedKeyValue("alert", "IOS 组播测试");
//		groupcast.setPredefinedKeyValue("badge", 0);
//		groupcast.setPredefinedKeyValue("sound", "chime");
//		// TODO set 'production_mode' to 'true' if your app is under production mode
//		groupcast.setPredefinedKeyValue("production_mode", "false");
//		groupcast.send();
//	}
//
//	public void sendIOSCustomizedcast() throws Exception {
//		IOSCustomizedcast customizedcast = new IOSCustomizedcast();
//		customizedcast.setAppMasterSecret(appMasterSecret);
//		customizedcast.setPredefinedKeyValue("appkey", this.appkey);
//		customizedcast.setPredefinedKeyValue("timestamp", this.timestamp);
//		// TODO Set your alias here, and use comma to split them if there are multiple alias.
//		// And if you have many alias, you can also upload a file containing these alias, then
//		// use file_id to send customized notification.
//		customizedcast.setPredefinedKeyValue("alias", "xx");
//		// TODO Set your alias_type here
//		customizedcast.setPredefinedKeyValue("alias_type", "xx");
//		customizedcast.setPredefinedKeyValue("alert", "IOS 个性化测试");
//		customizedcast.setPredefinedKeyValue("badge", 0);
//		customizedcast.setPredefinedKeyValue("sound", "chime");
//		// TODO set 'production_mode' to 'true' if your app is under production mode
//		customizedcast.setPredefinedKeyValue("production_mode", "false");
//		customizedcast.send();
//	}
//
//	public void sendIOSFilecast() throws Exception {
//		IOSFilecast filecast = new IOSFilecast();
//		filecast.setAppMasterSecret(appMasterSecret);
//		filecast.setPredefinedKeyValue("appkey", this.appkey);
//		filecast.setPredefinedKeyValue("timestamp", this.timestamp);
//		// TODO upload your device tokens, and use '\n' to split them if there are multiple tokens
//		filecast.uploadContents("aa"+"\n"+"bb");
//		filecast.setPredefinedKeyValue("alert", "IOS 文件播测试");
//		filecast.setPredefinedKeyValue("badge", 0);
//		filecast.setPredefinedKeyValue("sound", "chime");
//		// TODO set 'production_mode' to 'true' if your app is under production mode
//		filecast.setPredefinedKeyValue("production_mode", "false");
//		filecast.send();
//	}
	
	public static void main(String[] args) {
		// TODO set your appkey and master secret here
		PushService demo = new PushService();
		try {
//			demo.sendAndroidUnicast();
			/* TODO these methods are all available, just fill in some fields and do the test
			 * demo.sendAndroidBroadcast();
			 * demo.sendAndroidGroupcast();
			 * demo.sendAndroidCustomizedcast();
			 * demo.sendAndroidFilecast();
			 * 
			 * demo.sendIOSBroadcast();
			 * demo.sendIOSUnicast();
			 * demo.sendIOSGroupcast();
			 * demo.sendIOSCustomizedcast();
			 * demo.sendIOSFilecast();
			 */
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}



}
