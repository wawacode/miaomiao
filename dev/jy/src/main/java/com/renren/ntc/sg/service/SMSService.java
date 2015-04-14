package com.renren.ntc.sg.service;

import java.net.URLEncoder;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.renren.ntc.sg.bean.Address;
import com.renren.ntc.sg.bean.CatStaffCommit;
import com.renren.ntc.sg.bean.Catstaff;
import com.renren.ntc.sg.bean.Device;
import com.renren.ntc.sg.bean.Order;
import com.renren.ntc.sg.bean.Shop;
import com.renren.ntc.sg.biz.dao.AddressDAO;
import com.renren.ntc.sg.biz.dao.CatStaffCommitDAO;
import com.renren.ntc.sg.biz.dao.CatStaffDAO;
import com.renren.ntc.sg.biz.dao.DeviceDAO;
import com.renren.ntc.sg.biz.dao.OrdersDAO;
import com.renren.ntc.sg.biz.dao.UserDAO;
import com.renren.ntc.sg.mongo.MongoDBUtil;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.Dateutils;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-1-31
 * Time: 下午8:34
 * To change this template use File | Settings | File Templates.
 */
@Service
public class SMSService {

    @Autowired
    public OrderService orderService;

    @Autowired
    public OrdersDAO ordersDAO;

    @Autowired
    public AddressDAO addressDAO;

    @Autowired
    public UserDAO userDao;

    @Autowired
    public WXService wxService;

    @Autowired
    public DeviceDAO deviceDAO;

    @Autowired
    public CatStaffCommitDAO catStaffCommitDao;
    
    @Autowired
    public CatStaffDAO catStaffDao;

    public void sendSMS2LocPush(String order_id, Shop shop) {
        //短信通知 地推人员
        try {
            if (SUtils.isDev()) {
                return;
            }
            Order order = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop.getId()));
            String mobile = "";
            byte[] t = null;
            String info = "用户下单";
            if("wx".equals(order.getAct())){
                info = info + ",支付方式：微信支付.";
            }else{
                info = info + ",支付方式：货到付款.";
            }
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String vv = shop.getName() + " " + shop.getTel() + " " + adrs.getAddress() + " " + adrs.getPhone() + " " + order.getOrder_id();
            vv = vv.replaceAll("=", "").replaceAll("&", "");
            String ro = info.replace("=", "").replace("&", "");
            float p = (float) order.getPrice() / 100;
            String message = "#address#=" + vv + "&#status#=" + ro + "&#price#=" + p;
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            List<CatStaffCommit> catStaffCommitls = catStaffCommitDao.getbyShopid(shop.getId());
            for ( CatStaffCommit catStaffCommit : catStaffCommitls)   {
            if (catStaffCommit != null) {

                String phone = catStaffCommit.getPhone();
                if (MongoDBUtil.getInstance().haveSend(phone, order_id)) {
                    LoggerUtils.getInstance().log(String.format("%s %s sms allready send ", phone, order_id));
                    return;
                }
                String url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.LOCTID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                String r = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), r, phone, url));
                MongoDBUtil.getInstance().sendmark(phone, order_id);
                }
            }
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
    
    public void sendSMS2KF(String order_id, Shop shop) {
        //短信通知 地推人员
        try {
            if (SUtils.isDev()) {
                return;
            }
            Order order = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop.getId()));
            String mobile = "";
            byte[] t = null;
            String info = "用户下单";
            if("wx".equals(order.getAct())){
                info = info + ",支付方式：微信支付.";
            }else{
                info = info + ",支付方式：货到付款.";
            }
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String vv = shop.getName() + " " + shop.getTel() + " " + adrs.getAddress() + " " + adrs.getPhone() + " " + order.getOrder_id();
            vv = vv.replaceAll("=", "").replaceAll("&", "");
            String ro = info.replace("=", "").replace("&", "");
            float p = (float) order.getPrice() / 100;
            String message = "#address#=" + vv + "&#status#=" + ro + "&#price#=" + p;
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            List<Catstaff> catstaffls = catStaffDao.getCatStaffbyType(2);
            for ( Catstaff catstaff : catstaffls)   {
            if (catstaff != null) {
                String phone = catstaff.getPhone();
                if (MongoDBUtil.getInstance().haveSend(phone, order_id)) {
                    LoggerUtils.getInstance().log(String.format("%s %s sms allready send ", phone, order_id));
                    return;
                }
                String url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.USER_CANCEL_ORDER_2_KF_SMS_MSG_TEMP_ID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                String r = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), r, phone, url));
                MongoDBUtil.getInstance().sendmark(phone, order_id);  
              }
            }
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    public void sendSMS2tguang(String user, String phone) {
        try {
            if (SUtils.isDev()) {
                return;
            }
                byte[] t = null;
                String message = "#user#=" + user + "&#msg#=_" ;
                message = URLEncoder.encode(message, "utf-8");
                String url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.TMP_TID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s , %s ", phone,message));
                t = SHttpClient.getURLData(url, "");
                String response = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s  ", response, phone));
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }



//    public void sendSMS2User(String order_id, Shop shop) {
//        //通知用户
//        try {
//            if (SUtils.isDev()) {
//                return;
//            }
//            if (null != shop) {
//                Order value = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop.getId()));
//                String v = null;
//                String url;
//                String mobile = "";
//                byte[] t = null;
//                String vv = value.getOrder_id();
//                vv = vv.replaceAll("=", "").replaceAll("&", "");
//                String message = "#order_id#=" + vv + "&#shop_name#=" + shop.getName() + "&#phone#=" + shop.getTel();
//                message = URLEncoder.encode(message, "utf-8");
//                long adr_id = value.getAddress_id();
//                Address adrs = addressDAO.getAddress(adr_id);
//                String phone = adrs.getPhone().trim();
//                if (MongoDBUtil.getInstance().haveSend(phone, order_id)) {
//                    System.out.println(String.format("%s %s sms allready send ", phone, order_id));
//                    return;
//                }
//                url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.USER_TID, phone, message);
//                System.out.println(String.format("Send  SMS mobile %s %s ,%s ", mobile, value.getOrder_id(), url));
//                t = SHttpClient.getURLData(url, "");
//                String response = SUtils.toString(t);
//                System.out.println(String.format("Post Shop SMS message No. %s : %s , %s  %s ", value.getOrder_id(), response, mobile, url));
//                MongoDBUtil.getInstance().sendmark(phone, order_id);
//            }
//        } catch (Throwable e) {
//            e.printStackTrace();
//        }
//    }

    public void sendSMS2Boss(String order_id, Shop shop) {
        try {
            if (SUtils.isDev()) {
                return;
            }
            Order order = ordersDAO.getOrder(order_id, SUtils.generOrderTableName(shop.getId()));
            String v = null;
            String url;
            byte[] t = null;

            String response = "用户下单";
            if("wx".equals(order.getAct())){
                response = response + ",支付方式：微信支付.";
            }else{
                response = response + ",支付方式：货到付款.";
            }
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);

            Device devcie = deviceDAO.getDevByShopId(shop.getId());
            //节约成本  有打印机的情况不要发那么多字的短信
            if (null != devcie && !SUtils.isOffline(devcie)) {
                String vv = shop.getName() + " " + adrs.getAddress() + " " + adrs.getPhone() + " " + order.getOrder_id();
                vv = vv.replaceAll("=", "").replaceAll("&", "");
                String ro = response.replace("=", "").replace("&", "");
                float p = (float) order.getPrice() / 100;
                String message = "#address#=" + vv + "&#status#=" + ro + "&#price#=" + p;
                message = SUtils.span(message);
                message = URLEncoder.encode(message, "utf-8");
                String phone = shop.getOwner_phone();
                if (MongoDBUtil.getInstance().haveSend(phone, order_id)) {
                    LoggerUtils.getInstance().log(String.format("%s %s sms allready send ", phone, order_id));
                    return;
                }
                url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.LOCTID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS to boss mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                String r = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), r, phone, url));
                MongoDBUtil.getInstance().sendmark(phone, order_id);
                return;
            }

            String vv = shop.getName() + " " + adrs.getAddress() + " " + adrs.getPhone();
            if (!StringUtils.isBlank(order.getRemarks())) {
                vv = vv + "买家留言：" + order.getRemarks();
            }
            vv = vv.replaceAll("=", "").replaceAll("&", "");
            String ro = response.replaceAll("=", "").replace("&", "");
            float p = (float) order.getPrice() / 100;
            String detail = form(order.getSnapshot(), p);
            detail = detail.replaceAll("=", "").replaceAll("&", "");
            String message = "#address#=" + vv + "&#status#=" + ro + "&#detail#=" + detail;
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            //短信通知 老板
            if (shop != null) {
                String phone = shop.getOwner_phone();
                if (MongoDBUtil.getInstance().haveSend(phone, order_id)) {
                    LoggerUtils.getInstance().log(String.format("%s %s sms allready send ", phone, order_id));
                    return;
                }
                url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.TID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                response = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), response, phone, url));
                MongoDBUtil.getInstance().sendmark(phone, order_id);
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    private String form(String snapshot, float sum) {
        com.alibaba.fastjson.JSONArray jb = (com.alibaba.fastjson.JSONArray) JSON.parse(snapshot);
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < jb.size(); i++) {
            com.alibaba.fastjson.JSONObject o = (com.alibaba.fastjson.JSONObject) jb.get(i);
            String name = o.getString("name");
            int count = o.getInteger("count");
            int price = o.getInteger("price");
            sb.append(name);
            sb.append(" 单价 ");
            sb.append((float) price / 100);
            sb.append(" 数量 ");
            sb.append(count + "");
            sb.append(",");
        }
        sb.append("总计 ：");
        sb.append(sum);
        sb.append(" 元");
        return sb.toString();
    }
    
    public void sendSMSUserCancelOrder2kf(Order order, Shop shop) {
        try {
            if (SUtils.isDev()) {
                return;
            }
            
            byte[] t = null;
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String message = Constants.USER_CANCEL_ORDER_2_KF_SMS_MSG.replace("{shop_name}", shop.getName()).replace("{shop_tel}", shop.getTel()).replace("{address}", adrs.getAddress()).replace("{phone}", adrs.getPhone()).replace("{create_time}", Dateutils.tranferDate2Str(order.getCreate_time())).replace("{order_id}", order.getOrder_id());
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            List<Catstaff> catstaffls = catStaffDao.getCatStaffbyType(2);
            for ( Catstaff catstaff : catstaffls)   {
            if (catstaff != null) {
                String phone = catstaff.getPhone();
                String url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.USER_CANCEL_ORDER_2_KF_SMS_MSG_TEMP_ID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                String r = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), r, phone, url));
                }
            }
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
    
    public void sendSMSBossCancelOrder2kf(Order order, Shop shop) {
        try {
            if (SUtils.isDev()) {
                return;
            }
            
            byte[] t = null;
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String message = Constants.USER_CANCEL_ORDER_2_KF_SMS_MSG.replace("{shop_name}", shop.getName()).replace("{shop_tel}", shop.getTel()).replace("{address}", adrs.getAddress()).replace("{phone}", adrs.getPhone()).replace("{create_time}", Dateutils.tranferDate2Str(order.getCreate_time())).replace("{order_id}", order.getId()+"");
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            List<Catstaff> catstaffls = catStaffDao.getCatStaffbyType(2);
            for ( Catstaff catstaff : catstaffls)   {
            if (catstaff != null) {
                String phone = catstaff.getPhone();
                String url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.USER_CANCEL_ORDER_2_KF_SMS_MSG_TEMP_ID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                String r = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), r, phone, url));
                }
            }
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
    
    public void sendCancelSMS2Boss(Order order, Shop shop) {
        try {
            if (SUtils.isDev()) {
                return;
            }
            if(order == null){
            	return;
            }
            String url;
            byte[] t = null;

            String response = "";
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String message = Constants.CANCEL_ORDER_2_BOSS_SMS_MSG.replace("{order_id}", order.getOrder_id()).replace("{address}", adrs.getAddress()).replace("{phone}", adrs.getPhone()).replace("{create_time}", Dateutils.tranferDate2Str(order.getCreate_time()));
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            //短信通知 老板
            if (shop != null) {
                String phone = shop.getOwner_phone();
                url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.CANCEL_ORDER_2_BOSS_SMS_MSG_TEMP_ID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                response = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), response, phone, url));
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
    /*
     * 催单发短信给老板
     */
    public void sendRemindSMS2Boss(Order order, Shop shop) {
        try {
            if (SUtils.isDev()) {
                return;
            }
            String url;
            byte[] t = null;
            String response = "";
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String message = Constants.REMIND_ORDER_SMS_MSG.replace("{shop_name}", shop.getName()).replace("{shop_tel}", shop.getTel()).replace("{address}", adrs.getAddress()).replace("{phone}", adrs.getPhone()).replace("{create_time}", Dateutils.tranferDate2Str(order.getCreate_time())).replace("{order_id}", order.getOrder_id());    		
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            //短信通知 老板
            if (shop != null) {
                String phone = shop.getOwner_phone();
                url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.REMIND_ORDER_SMS_MSG_TEMP_ID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                response = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), response, phone, url));
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
    /**
     * 发催单短信给客服
     * @param order_id
     * @param shop
     */
    public void sendSMSRemind2kf(Order order, Shop shop) {
        try {
            if (SUtils.isDev()) {
                return;
            }
            byte[] t = null;
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String message = Constants.REMIND_ORDER_SMS_MSG.replace("{shop_name}", shop.getName()).replace("{shop_tel}", shop.getTel()).replace("{address}", adrs.getAddress()).replace("{phone}", adrs.getPhone()).replace("{create_time}", Dateutils.tranferDate2Str(order.getCreate_time())).replace("{order_id}", order.getOrder_id());    		
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            List<Catstaff> catstaffls = catStaffDao.getCatStaffbyType(2);
            for ( Catstaff catstaff : catstaffls)   {
            if (catstaff != null) {
                String phone = catstaff.getPhone();
                String url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.REMIND_ORDER_SMS_MSG_TEMP_ID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                String r = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), r, phone, url));
                }
            }
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
    //商家端点击无法配送或者客服在编辑后台点击退单发短信给用户
    public void sendCancelSMS2User(Order order, Shop shop) {
        try {
            if (SUtils.isDev()) {
                return;
            }
            if(order == null){
            	return;
            }
            String url;
            byte[] t = null;

            String response = "";
            long adr_id = order.getAddress_id();
            Address adrs = addressDAO.getAddress(adr_id);
            String message = Constants.KF_CLICK_CANCEL_ORDER_2_USER_MSG.replace("{order_id}", order.getOrder_id()).replace("{shop_name}", shop.getName()).replace("{shop_tel}", shop.getTel());
            message = SUtils.span(message);
            message = URLEncoder.encode(message, "utf-8");
            //短信通知 老板
            if (shop != null) {
                String phone = adrs.getPhone();
                url = SUtils.forURL(Constants.SMSURL, Constants.APPKEY, Constants.KF_CLICK_CANCEL_ORDER_2_USER_MSG_TEMP_ID, phone, message);
                LoggerUtils.getInstance().log(String.format("Send  SMS mobile %s %s ,%s ", phone, order.getOrder_id(), url));
                t = SHttpClient.getURLData(url, "");
                response = SUtils.toString(t);
                LoggerUtils.getInstance().log(String.format("Post Shop SMS message No. %s : %s , %s  %s ", order.getOrder_id(), response, phone, url));
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
}
