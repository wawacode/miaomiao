package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.controllers.wx.client.TenpayHttpClient;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.util.MD5Utils;
import com.renren.ntc.sg.util.SUtils;
import com.renren.ntc.sg.util.wx.MD5Util;
import com.renren.ntc.sg.util.wx.Sha1Util;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

@Service
public class WXService {


//miaomiao shenghuo
    private static String encodingAesKey = "V8SrMqtqyLWFtfAOyyH8cAq8flXuh0YpCoPLTCwSQsA";
    private static String token = "tooooken";
    private static String appKey = "914f4388312ca90e4cb750b817d15368";
    private static String appId = "wx762f832959951212";

    private  static  String ACCESS_TOKEN = "access_token";
    private  static  String JSAPI_TOKEN = "jsapi_ticket";

    private static final int CONN_TIMEOUT = 10000;
	private static final int READ_TIMEOUT = 10000;
	private static final int RETRY = 2;
    private  static  final String OAUTH_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={appId}&secret={appKey}&code={code}&grant_type=authorization_code";

    private  static  final String JSAPI = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={access_token}&type=jsapi";

    private static final String mch_id = "1233699402";
    private static final String key = "210f760a89db30aa72ca258a3483cc7f";
    private static final String  notify_url ="http:/www.mbianli.com/wx/cb";
    private static final  String  trade_type = "JSAPI";
    private static String URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";


    private static final String TXT = "<xml>\n" +
            "   <appid>{appId}</appid>\n" +
            "   <attach>{attach}</attach>\n" +
            "   <body>{body}</body>\n" +
            "   <mch_id>{mch_id}</mch_id>\n" +
            "   <nonce_str>{nonce_str}</nonce_str>\n" +
            "   <notify_url>{notify_url}</notify_url>\n" +
            "   <openid>{openid}</openid>\n" +
            "   <out_trade_no>{out_trade_no}</out_trade_no>\n" +
            "   <spbill_create_ip>{spbill_create_ip}</spbill_create_ip>\n" +
            "   <total_fee>{total_fee}</total_fee>\n" +
            "   <trade_type>JSAPI</trade_type>\n" +
            "   <sign>{sign}</sign>\n" +
            "</xml>"  ;


    public  String  getOpenId (String code ){
        String openId = null;
        String access_token =  getAccessToken();
        String url = OAUTH_URL.replace("{appId}",appId);
        url = url.replace("{appKey}",appKey);
        url = url.replace("{code}",code);

        byte []  t = new byte[0];
        try {
            t = getURLData(url);
            String s = SUtils.toString(t);
            System.out.println("wx re" + s);
            JSONObject res = (JSONObject) JSON.parse(s);
            openId =  res.getString("openid");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return openId;
    }

    public   String getJS_ticket(){
        String jsciket = JRedisUtil.getInstance().get(JSAPI_TOKEN) ;
             if(!StringUtils.isBlank(jsciket)){
                 return jsciket;
             }
        String access_token =  getAccessToken();

        String ticket = "";
        String url = JSAPI.replace("{access_token}",access_token);
        try {
            byte [] t = getURLData(url);
            String s = SUtils.toString(t);
            System.out.println("get ticket wx re" + s);
            JSONObject res = (JSONObject) JSON.parse(s);
            ticket   =  res.getString("ticket");
            if(!StringUtils.isBlank(ticket) ){
               JRedisUtil.getInstance().set(JSAPI_TOKEN,ticket);
               JRedisUtil.getInstance().expire(JSAPI_TOKEN,4900);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
         return  ticket;
    }

    public String  getAccessToken(){
        String access_token = JRedisUtil.getInstance().get(ACCESS_TOKEN);
        if(StringUtils.isBlank(access_token)){
            byte [] t = new byte[0];
            try {
                t = WXService.getURLData("https://api.weixin.qq.com/cgi-bin/token?" +
                        "grant_type=client_credential&appid=" + appId + "&secret=" + appKey);
                String e = new String(t);
                if (StringUtils.isBlank(e)){
                    return null;
                }
                JSONObject ob =(JSONObject) JSONObject.parse(e);
                access_token =  ob.getString("access_token");
                if(!StringUtils.isBlank(access_token) ){
                   JRedisUtil.getInstance().set(ACCESS_TOKEN,access_token);
                   JRedisUtil.getInstance().expire(ACCESS_TOKEN,4900);
                }
            } catch (IOException e) {
                e.printStackTrace();
                return null;
            }
        }
        return access_token;
    }

	private static byte[] getStreamData(InputStream is) throws Exception {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		byte[] bufferByte = new byte[1024 * 30];
		int l = -1;
		int downloadSize = 0;
		try {
			while ((l = is.read(bufferByte)) > -1) {
				downloadSize += l;
				out.write(bufferByte, 0, l);
				out.flush();
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		byte[] btemp = out.toByteArray();
		out.close();
		is.close();
		return btemp;
	}

	private static String _GetCookie() {
		return "2";
    }

	
	
	public static byte[] getURLData(String url) throws IOException {
		byte[] b = null;
		boolean bsuccess = false;
		int retry = 0;
		while (!bsuccess && retry < RETRY) {
			try {
				URL imageURL = new URL(url);
				URLConnection c = null;
				c = imageURL.openConnection();
				c.setConnectTimeout(CONN_TIMEOUT);
				c.setReadTimeout(READ_TIMEOUT);
				c.setRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
				c.setRequestProperty("User-Agent",
                        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0");
				c.setRequestProperty("Host", "weixin.com");
				c.setRequestProperty("Cookie", WXService._GetCookie());
				c.setDoOutput(true);
				c.setDoInput(true);
				b = getStreamData(c.getInputStream());
				bsuccess = true;
			} catch (Exception e) {
				retry++;
				e.printStackTrace();
			}
		}
		return b;
	}

    public static byte[]  sendPostRequest(String url,String postParam) {

        org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();
        client.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET,"utf-8");

        // Create a method instance.
        PostMethod method = new PostMethod(url);
        method.setRequestBody(postParam);
        try {
            client.executeMethod(method);
            byte[] responseBody = method.getResponseBody();

            return responseBody;
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public static String  getTicket(){

           return "" ;
    }



    public static void main(String[] args) throws IOException {
        WXService w = new WXService();
        byte [] t = new byte[0];
        try {
            t = WXService.getURLData("https://api.weixin.qq.com/cgi-bin/token?" +
                    "grant_type=client_credential&appid=" + appId + "&secret=" + appKey);
            String e = new String(t);
            if (StringUtils.isBlank(e)){
            }
            JSONObject ob =(JSONObject) JSONObject.parse(e);
           String  access_token =  ob.getString("access_token");
            JRedisUtil.getInstance().set(ACCESS_TOKEN,access_token);
            JRedisUtil.getInstance().expire(ACCESS_TOKEN,4900);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getPre_id(String open_id,String out_trade_no,int total_fee,String attach,String body) {
        String pre_id = "";
        try {
            SortedMap<String,String> map  = new TreeMap<String,String>();
            String nonce_str = Sha1Util.getNonceStr();
            String timestamp = Sha1Util.getTimeStamp();
            String spbill_create_ip = "";
            map.put("appid",appId);
            map.put("attach",attach);
            map.put("body",body);
            map.put("mch_id",mch_id);
            map.put("nonce_str",nonce_str);
            map.put("notify_url",notify_url) ;
            map.put("openid", open_id);
            map.put("out_trade_no", out_trade_no );
            map.put("spbill_create_ip", spbill_create_ip );
            map.put("total_fee",total_fee + "") ;
            map.put("trade_type", trade_type );
            String sign =  createSign(map).toUpperCase()  ;
            String content = TXT.replace("{appId}",appId);
            content  = content.replace("{attach}",attach);
            content  = content.replace("{body}",body);
            content  = content.replace("{mch_id}",mch_id);
            content  = content.replace("{nonce_str}",nonce_str);
            content  = content.replace("{notify_url}",notify_url);
            content  = content.replace("{openid}",open_id);
            content  = content.replace("{out_trade_no}",out_trade_no);
            content  = content.replace("{spbill_create_ip}",spbill_create_ip);
            content  = content.replace("{total_fee}",total_fee+"");
            content  = content.replace("{trade_type}",trade_type);
            content  = content.replace("{sign}",sign);
            System.out.println("send " + content);
            TenpayHttpClient http = new TenpayHttpClient();
            http.callHttpPost(URL,content);
            String  res  = http.getResContent();
            System.out.println( "wx rec " +  res );
            pre_id = getPrePay(res);
            if (StringUtils.isBlank(pre_id)){
              return pre_id;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return pre_id;
    }

    private static String getPrePay(String res) {
        String s = "<prepay_id><![CDATA[";
        String e = "]]></prepay_id>";
        int start = res.indexOf(s);
        int end = res.indexOf(e);
        if (-1 == start ||  -1 == end){
            return "" ;
        }
        return res.substring( s.length() + start ,end);
    }
    public static String createSign(SortedMap<String, String> packageParams) {
        StringBuffer sb = new StringBuffer();
        Set es = packageParams.entrySet();
        Iterator it = es.iterator();
        while (it.hasNext()) {
            Map.Entry entry = (Map.Entry) it.next();
            String k = (String) entry.getKey();
            String v = (String) entry.getValue();
            if (null != v && !"".equals(v) && !"sign".equals(k)
                    && !"key".equals(k)) {
                sb.append(k + "=" + v + "&");
            }
        }
        sb.append("key=" + key);
        System.out.println("md5 sb:" + sb);
        String sign = MD5Util.MD5Encode(sb.toString(), "utf-8")
                .toUpperCase();
        return sign;
    }
}
