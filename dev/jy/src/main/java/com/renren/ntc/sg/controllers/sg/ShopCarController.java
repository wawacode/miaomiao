package com.renren.ntc.sg.controllers.sg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.bean.*;
import com.renren.ntc.sg.biz.dao.*;
import com.renren.ntc.sg.interceptors.access.NtcHostHolder;
import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.TicketService;
import com.renren.ntc.sg.service.WXService;
import com.renren.ntc.sg.util.Constants;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Path("shopCar")
public class ShopCarController {

    private static int DEFAULT_SHOP_ID = 1;

    @Autowired
    public NtcHostHolder holder;

    @Autowired
    public ShopDAO shopDAO;

    @Autowired
    public AddressDAO addressDAO;

    @Autowired
    public ItemsDAO itemsDAO;

    @Autowired
    public TicketService ticketService;

    @Autowired
    public ShopCategoryDAO shopCategoryDAO;


    @Autowired
    public WXService wxService ;


    @Get("confirm")
    @Post("confirm")
    public String hot (Invocation inv,@Param("shop_id") long shop_id,@Param("items") String items,@Param("wx_url") String wx_url){

        User u = holder.getUser();
        long user_id = 0;
        if (null != u) {
            user_id = u.getId();
        }
        if (0  >= shop_id){
            shop_id = Constants.DEFAULT_SHOP ;
        }
        Shop shop = shopDAO.getShop(shop_id);

        if(null == shop){
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  " ,shop_id) );
            shop = shopDAO.getShop( Constants.DEFAULT_SHOP);
        }

        if (StringUtils.isBlank(items)) {
            LoggerUtils.getInstance().log(String.format("can't find shop  %d  items %s", shop_id, items));
            return "@json:" + Constants.PARATERERROR;
        }

        boolean ok = true;
        JSONArray jbarr = (JSONArray) JSONArray.parse(items);
        List<Item4V> itemls = new ArrayList<Item4V>();
        try{
        for (int i = 0; i < jbarr.size(); i++) {

            JSONObject jb = (JSONObject) jbarr.get(i);
              long item_id = jb.getLong("id");
              int count = jb.getIntValue("count");

            Item item = itemsDAO.getItem(SUtils.generTableName(shop_id),shop_id, item_id);
            if (null == item){
                continue;
            }
            //计算库存是否足够
            Item4V i4v = new Item4V();
            i4v.setExt(count);
            i4v.setCount(count);
            i4v.setName(item.getName());
            i4v.setId(item.getId());
            i4v.setCategory_id(item.getCategory_id());
            i4v.setPic_url(item.getPic_url());
            i4v.setPrice(item.getPrice());
            i4v.setShop_id(item.getShop_id());

            if (item.getCount() < count) {
                i4v.setExt(item.getCount());
                i4v.setCount(count);
                ok = false;
            }
            itemls.add(i4v);
        }
        }catch(Exception e){
            e.printStackTrace();
            inv.addModel("msg", "服务器累了,请稍候再试");
            return "@" + Constants.UKERROR;
        }
        List<Address>  addressls = addressDAO.getAddresses(user_id, 0, 20);
        inv.addModel("addressls",addressls);
        inv.addModel("shop", shop);
        inv.addModel("itemls", itemls);
        if (!ok) {
          inv.addModel("msg", "部分商品库存不足");
          return "@" + Constants.LEAKERROR;
        }
        // 获取 可用的代金券
        boolean can = ticketService.ticketCanUse(u.getId(), shop_id);
        List <UserCoupon> tickets = ticketService.getUnusedTickets(u.getId(),0,0,50);
        JSONObject  data=  new JSONObject() ;

        if(!StringUtils.isBlank(wx_url)){
            String nonce_str = SUtils.create_nonce_str();
            String timestamp = SUtils.create_timestamp();
            String string1;
            String signature = "";

            String  js_ticket = wxService.getJS_ticket();

            //注意这里参数名必须全部小写，且必须有序
            string1 = "jsapi_ticket=" + js_ticket +
                    "&noncestr=" + nonce_str +
                    "&timestamp=" + timestamp +
                    "&url=" + wx_url;

            System.out.println(string1);

            try
            {
                MessageDigest crypt = MessageDigest.getInstance("SHA-1");
                crypt.reset();
                crypt.update(string1.getBytes("UTF-8"));
                signature = SUtils.byteToHex(crypt.digest());
            }
            catch (NoSuchAlgorithmException e)
            {
                e.printStackTrace();
            }
            catch (UnsupportedEncodingException e)
            {
                e.printStackTrace();
            }
            data.put("url", wx_url);
            data.put("jsapi_ticket", js_ticket);
            data.put("nonceStr", nonce_str);
            data.put("timestamp", timestamp);
            data.put("signature", signature);

        }

        data.put("addressls", JSON.toJSON(addressls));
        data.put("shop", JSON.toJSON(shop));
        data.put("itemls", JSON.toJSON(itemls));
        data.put("coupons", JSON.toJSON(tickets));
        data.put("coupon_active", can);
        JSONObject respone =  new JSONObject();
        respone.put("code" ,0);
        respone.put("data" ,data);
        return "@json:" + respone.toJSONString();
    }
}


