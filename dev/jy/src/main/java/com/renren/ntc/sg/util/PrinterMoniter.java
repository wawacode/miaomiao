package com.renren.ntc.sg.util;

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
import com.renren.ntc.sg.service.SMSService;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.collections.CollectionUtils;

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


    public  static final String TID = "1015";
    public  static final String MONITERPHONE = "18600326217";

	public static void main(String[] args) {
      RoseAppContext rose = new RoseAppContext();
      ShopDAO  shopDao = rose.getBean(ShopDAO.class);
      DeviceDAO deviceDao = rose.getBean(DeviceDAO.class);
      SMSService smsService = rose.getBean(SMSService.class);
	  List<Shop> shops = shopDao.getAllShopsByAudit(1);
	  if(CollectionUtils.isEmpty(shops)){
		  return;
	  }
      for (Shop  shop: shops){
          Device device   =  deviceDao.getDevByShopId(shop.getId()) ;
          if (null == device ){
              String  message = "{shop_name} 打印机状态异常";
              message = message.replace("{shop_name}",shop.getName()) ;
              smsService.send( message , TID , MONITERPHONE);
          }
          if(ofline(device.getUpdate_time())) {
             String  message = "{shop_name} 打印机离线";
             message = message.replace("{shop_name}",shop.getName()) ;
             smsService.send( message , TID , MONITERPHONE);
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
        BasicDBObject foj = new BasicDBObject("key", "12323");
        coll.update(query,foj);

        DBCursor cur = coll.find(query);
        BasicDBObject boj = null;

        if (cur.hasNext()) {
            boj = (BasicDBObject) cur.next();
            System.out.println(boj.toString());
        }


    }
    private static boolean ofline(Date update_time) {
        long now = System.currentTimeMillis();
        long uptime = update_time.getTime();
        long diff =  ( now - uptime);
        return diff > (1000*60*5) ;
    }

}
