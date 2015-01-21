package com.renren.ntc.sg.wx;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class WXHttpClient {


// miaomiao shenghuo
//    private static String encodingAesKey = "V8SrMqtqyLWFtfAOyyH8cAq8flXuh0YpCoPLTCwSQsA";
//    private static String token = "tooooken";
//    private static String appKey = "914f4388312ca90e4cb750b817d15368";
//    private static String appId = "wx762f832959951212";

// jiajiaxianguo
//    private static String encodingAesKey = "V8SrMqtqyLWFtfAOyyH8cAq8flXuh0YpCoPLTCwSQsA";
//    private static String token = "tooooken";
//    private static String appKey = "2cc1f5c798b91b3ed0c7db6b0b259914";
//    private static String appId = "wx24526189c97e6be3";

//    <xml><ToUserName><![CDATA[gh_226cfc194264]]></ToUserName><FromUserName><![CDATA[ofhqduNm5nNDqE3zV_FIOSz9rJdA]]></FromUserName><CreateTime>1421833304</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[r]]></Content><MsgId>6106727541249712803</MsgId></xml>

    // ceshigongzong hao
    private static String encodingAesKey = "V8SrMqtqyLWFtfAOyyH8cAq8flXuh0YpCoPLTCwSQsA";
    private static String token = "tooooken";
    private static String appKey = "ebd5d6bf4c597a617b2420341da1c03d";
    private static String appId = "wxd64a39a599e2ce3a";


    private static final int CONN_TIMEOUT = 10000;
	private static final int READ_TIMEOUT = 10000;
	private static final int RETRY = 2;

	public static Logger logger = LoggerFactory.getLogger(WXHttpClient.class);

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
			logger.info("getStreamData Exception!!");
			logger.info(e.getMessage());
			e.printStackTrace();
			throw e;
		}
		byte[] btemp = out.toByteArray();
		logger.info("download size: " + downloadSize + ", byte array size: " + out.size());
		out.close();
		is.close();
		return btemp;
	}

	private static String _GetCookie() {
		return "KDTSESSIONID=2s57v4m6nkr1rs6n8fp3cjge10; CNZZDATA5351147=cnzz_eid%3D1702623808-1415023945-%26ntime%3D1415281403; captcha_response=5ee9efbe0d363aa8f1d8a27af2630de0d923cd31; captcha_valid_count=2; user_id=881361; user_weixin=13581861097; user_nickname=%E5%B8%85%E7%82%9C; kdtnote_fans_id=0; login_auth_key=2e3fda48549bde7795cdb468533487b7; check_time=1415281955; kdt_id=391495; team_auth_key=5f4b187a3bd4cf7591d483335e6649ef; nobody_sign=54578dc4ec90e; _kdt_id_=391495; Hm_lvt_61f180f659535f6bde14d3b908c3a7d0=1415023946,1415281703,1415281924,1415503742; Hm_lpvt_61f180f659535f6bde14d3b908c3a7d0=1415504222";
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
				c.setRequestProperty("Cookie", WXHttpClient._GetCookie());
				c.setDoOutput(true);
				c.setDoInput(true);
				logger.info("use to download url: " + url);
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

    public static  void createMenu(String access_token){
         String url =  "https://api.weixin.qq.com/cgi-bin/menu/create?access_token={token}";
         url = url.replace("{token}",access_token);
        JSONObject  ob = new JSONObject();
        JSONArray buttons   = new JSONArray();
        JSONObject button  = new JSONObject();
        button.put("type","view");
        button.put("name","我要下单");
        button.put("url","http://www.mbianli.com/sg/loading" );
        buttons.add(button);


        JSONObject button2  = new JSONObject();
        button2.put("type","view");
        button2.put("name","关于喵喵");
        button2.put("url","http://123.57.38.234/jy-1/sg/about" );
        buttons.add(button2);


        ob.put("button",buttons);

        byte [] t = WXHttpClient.sendPostRequest(url,ob.toJSONString());
        String e = new String(t);
        System.out.println("rec data " + e );

    }

    public static void main(String[] args) throws IOException {
         byte [] t = WXHttpClient.getURLData("https://api.weixin.qq.com/cgi-bin/token?" +
                "grant_type=client_credential&appid=" + appId +"&secret=" + appKey);
        String e = new String(t);
        System.out.println(e);
        if (StringUtils.isBlank(e)){
            System.out.println("rec"+e);
            return ;
        }
        JSONObject ob =(JSONObject) JSONObject.parse(e);
        createMenu(ob.getString("access_token"));
//        String url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={token}";
//        String access_token = ob.getString("access_token");
//        url = url.replace("{token}",access_token);
//        JSONObject jb = new JSONObject() ;
//        jb.put("action_name","QR_LIMIT_STR_SCENE") ;
//        JSONObject action_info = new JSONObject() ;
//        JSONObject scene_str = new JSONObject() ;
//        scene_str.put("scene_str",12) ;
//        action_info.put("scene",scene_str);
//        jb.put("action_info",action_info) ;
//
//        t = WXHttpClient.sendPostRequest(url,jb.toJSONString() ) ;
//        e = new String(t);
//        System.out.println("rec data "+e);

//        {"action_name": "QR_LIMIT_STR_SCENE", "action_info": {"scene": {"scene_str": "123"}}}
//        String url = "https://api.weixin.qq.com/datacube/getusersummary?access_token={token}";
//        url = url.replace("{token}",ob.getString("access_token")) ;
//        JSONObject jb = new JSONObject() ;
//        jb.put("begin_date","2015-01-19") ;
//        jb.put("end_date","2015-01-20") ;
//        t = WXHttpClient.sendPostRequest(url,jb.toJSONString() ) ;
//        e = new String(t);
//        System.out.println("rec data " + e);
    }
}
