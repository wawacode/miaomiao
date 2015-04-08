package com.renren.ntc.sg.util.crontab;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.bean.ShopOrderReport;
import com.renren.ntc.sg.bean.ShopOrderReport.ShopOrderFlow;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.ShopDAO;
import com.renren.ntc.sg.mail.MailSendInfo;
import com.renren.ntc.sg.mail.MailSendServer;
import com.renren.ntc.sg.mongo.MongoDBUtil;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.collections.CollectionUtils;

import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 
 * 每日发邮件的工具 每家店铺的日成交额和订单总量
 *
 */
public class PrinterMoniter {


    public  static final String TID = Constants.USER_TID;
    public  static final String MONITERPHONE = "18600326217";

	public static void main(String[] args) {
      RoseAppContext rose = new RoseAppContext();
      ShopDAO  shopDao = rose.getBean(ShopDAO.class);
      DeviceDAO deviceDao = rose.getBean(DeviceDAO.class);
	  List<Shop> shops = shopDao.getAllShopsByAudit(1);
	  if(CollectionUtils.isEmpty(shops)){
		  return;
	  }
      for (Shop  shop: shops){
          Device device   =  deviceDao.getDevByShopId(shop.getId()) ;
          if (null == device ){
//              String  message = "{shop_name} 打印机状态异常";
//              message = message.replace("{shop_name}",shop.getName()) ;
//              toSend(message , TID , MONITERPHONE);
          }
          if(offline(device.getUpdate_time(), shop)) {
             String  message = "{shop_name} 打印机离线";
             message = message.replace("{shop_name}",shop.getName()) ;
              toSend(message , TID , MONITERPHONE);

          }
       }

	}
    private static void toSend(String message ,String tid , String phone){
        MongoDBUtil mongoDBUtil = MongoDBUtil.getInstance();
        DBCollection coll = mongoDBUtil.getCollectionforcache();
        Date date =  new Date();
        SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
        String dat  =  sFormat.format(date);

        String key = message + "#" + phone +"#"+ dat;
        BasicDBObject query = new BasicDBObject();
        query.put("key", key);
        DBCursor cur = coll.find(query);
        if (cur.hasNext()) {
            //今天已经发送过了
            LoggerUtils.getInstance().log(String.format("allready push sms % s " ,key));
            return ;
        }
        //add to DB
        BasicDBObject foj = new BasicDBObject("msg", message);
        coll.update(query,foj);
        send( message , tid , phone);
    }

    private static boolean offline(Date update_time,Shop shop) {
        long now = System.currentTimeMillis();
        long uptime = update_time.getTime();
        long diff =  ( now - uptime);
        if (diff > (1000*60*5)) {
            if (shop.getOpen_time()== null || shop.getClose_time()== null){
                return true;
            }
        }
        return false;
    }

    public static  void send ( String msg, String tid ,String phone) {
        //发送短信通知
        try {
            String v = null;
            String url;
            String mobile = "";
            byte[] t = null;
            String message = "#msg#=" + msg ;
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, tid, phone, message);
            LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s,%s ", mobile, url));
            t = SHttpClient.getURLData(url, "");
            String response = SUtils.toString(t);
            LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s  %s ", response, mobile, url));
        } catch (Throwable  e) {
            e.printStackTrace();
        }
    }
}
