package com.renren.ntc.sg.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.jredis.JRedisUtil;
import com.renren.ntc.sg.util.MD5Utils;
import com.renren.ntc.sg.util.SUtils;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;

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

    private  static  final String JSAPI = "https://api.weixin.qq.com/cgAi-bin/ticket/getticket?access_token={access_token}&type=jsap";


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
            System.out.println("wx re" + s);
            JSONObject res = (JSONObject) JSON.parse(s);
            ticket   =  res.getString("ticket");
            JRedisUtil.getInstance().set(JSAPI_TOKEN,ticket);
            JRedisUtil.getInstance().expire(JSAPI_TOKEN,4900);
        } catch (IOException e) {
            e.printStackTrace();
        }
         return  ticket;
    }

    public String  getAccessToken(){
        String access_token = JRedisUtil.getInstance().get(ACCESS_TOKEN);
        if(null == access_token){
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
                JRedisUtil.getInstance().set(ACCESS_TOKEN,access_token);
                JRedisUtil.getInstance().expire(ACCESS_TOKEN,4900);
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
        Object res = JSON.parse("{\"access_token\":\"OezXcEiiBSKSxW0eoylIeJ73JkSLxBH35eDvH8BHZg6Jq9c12WnoOvvrSP1q6j6PrE8nPbQk_yoqjyveHWeNq1DtVecLHrppEOapeDC128LLk7aSyZYw5s8kesKaWCAuUVeliAazerm0_6tS1fHlpA\",\"expires_in\":7200,\"refresh_token\":\"OezXcEiiBSKSxW0eoylIeJ73JkSLxBH35eDvH8BHZg6Jq9c12WnoOvvrSP1q6j6PoYqwyrLlR2bp_GvBlgB3FhoDRxcxRz5Nx_Qda0i7gvb3sBohI3hXqacII3AZaB-gaOasYfpRne5Ivf3bpjVT5A\",\"openid\":\"oQfDLjmZD7Lgynv6vuoBlWXUY_ic\",\"scope\":\"snsapi_base\"}");
        ;;
        System.out.println(res.toString());
    }
}
