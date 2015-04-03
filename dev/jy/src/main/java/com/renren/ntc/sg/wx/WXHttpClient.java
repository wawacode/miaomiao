package com.renren.ntc.sg.wx;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.renren.ntc.sg.util.MD5Utils;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.lang.StringUtils;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;

public class WXHttpClient {


//miaomiao shenghuo
    private static String encodingAesKey = "V8SrMqtqyLWFtfAOyyH8cAq8flXuh0YpCoPLTCwSQsA";
    private static String token = "tooooken";
    private static String appKey = "914f4388312ca90e4cb750b817d15368";
    private static String appId = "wx762f832959951212";






    private static final int CONN_TIMEOUT = 10000;
	private static final int READ_TIMEOUT = 10000;
	private static final int RETRY = 2;


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
        button.put("url","https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx762f832959951212&redirect_uri=http%3A%2F%2Fwww.mbianli.com%2Fsg%2Floading&response_type=code&scope=snsapi_base&state=128#wechat_redirect");
        buttons.add(button);

        JSONObject button2  = new JSONObject();
        button2.put("name","我的");
        JSONArray sub_button =  new JSONArray ();
        JSONObject order   = new JSONObject();
        order.put("name","我的订单");
        order.put("type","view");
        order.put("url","https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx762f832959951212&redirect_uri=" +
                "http%3A%2F%2Fwww.mbianli.com%2Fsg%2Floading%23%2Forders&response_type=code&scope=snsapi_base&state=128#wechat_redirect");
        sub_button.add(order);

        JSONObject coupon   = new JSONObject();
        coupon.put("name","代金券");
        coupon.put("type","view");
        coupon.put("url","https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx762f832959951212&redirect_uri=" +
                "http%3A%2F%2Fwww.mbianli.com%2Fsg%2Floading%23%2Fmycoupons&response_type=code&scope=snsapi_base&state=128#wechat_redirect");
        sub_button.add(coupon);

//        JSONObject findshop  = new JSONObject();
//        findshop.put("name","切换店铺");
//        findshop.put("type","view");
//        findshop.put("url","https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx762f832959951212&redirect_uri=" +
//                "http%3A%2F%2Fwww.mbianli.com%2Fsg%2Floading%23%2Ffindshop&response_type=code&scope=snsapi_base&state=128#wechat_redirect");
//        sub_button.add(findshop) ;

        button2.put("sub_button", sub_button);
        buttons.add(button2);



        JSONObject button3 = new JSONObject() ;
        button3.put("name","关于喵喵") ;
        JSONArray sub_button2 =  new JSONArray ();
//        JSONObject fuwofanwei   = new JSONObject();
//        fuwofanwei.put("name","服务范围");
//        fuwofanwei.put("type","click");
//        fuwofanwei.put("key","Vfuwufanwei");
//        sub_button2.add(fuwofanwei);

        JSONObject yijianfankui   = new JSONObject();
        yijianfankui.put("name","意见反馈");
        yijianfankui.put("type","view");
        yijianfankui.put("url","https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx762f832959951212&redirect_uri=" +
                "http%3A%2F%2Fwww.mbianli.com%2Fsg%2Fabout&response_type=code&scope=snsapi_base&state=128#wechat_redirect");
        sub_button2.add(yijianfankui);
        JSONObject kefudianhua    = new JSONObject();
        kefudianhua.put("name","客服电话");
        kefudianhua.put("type","click");
        kefudianhua.put("key","Vkefudianhua");
        sub_button2.add(kefudianhua);

        button3.put("sub_button",sub_button2);
        buttons.add(button3);

        ob.put("button",buttons);
        byte [] t = sendPostRequest(url, ob.toJSONString());
        String e = new String(t);
        System.out.println("rec data " + e );

    }

    public static void getTicket(String access_token ,int qcode){
        String url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={token}";
        url = url.replace("{token}",access_token);
        System.out.println(url);
        JSONObject  ob = new JSONObject();
        ob.put("action_name","QR_LIMIT_SCENE") ;
        JSONObject scene = new JSONObject() ;
        scene.put("scene_id",qcode);
        JSONObject s = new JSONObject() ;
        s.put("scene",scene);
        ob.put("action_info",s ) ;
        System.out.println(ob.toJSONString());
        byte [] t = sendPostRequest(url,ob.toJSONString());
        String e = new String(t);
        System.out.println(e );
        JSONObject o = (JSONObject) JSON.parse(e);
        String ticket = o.getString("ticket") ;
        String turl  =    o.getString("url");
        String ticketUrl = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket={ticket}";
        ticketUrl = ticketUrl.replace("{ticket}",ticket ) ;
        String fileName = qcode + ".jpg";
        System.out.println(ticketUrl +  " " + turl);
        writeFile(ticketUrl,fileName) ;
    }





    public static void addkf(String access_token){
        String url = "https://api.weixin.qq.com/customservice/kfaccount/add?access_token={token}";
        url = url.replace("{token}",access_token);
        JSONObject  ob = new JSONObject();
        ob.put("kf_account","dev@lizi-inc.com") ;
        ob.put("nickname","喵喵客服10010") ;
        ob.put("password", MD5Utils.MD5("pwd2015")) ;
        System.out.println(ob.toJSONString());
        byte [] t = WXHttpClient.sendPostRequest(url,ob.toJSONString());
        String e = new String(t);
        System.out.println("rec data " + e );
    }

    public static void writeFile(String strUrl, String fileName) {
        String dir = "d:\\ticket_300\\";
        if(new File(dir + fileName).exists()){
            return ;
        }
        int bytesRead = 0;
        URL url = null;
        OutputStream os = null;
        URLConnection is = null;
        InputStream i = null ;
        System.out.println("down load " + strUrl);
        try {
            url = new URL(strUrl);
            is = url.openConnection();
            is.setConnectTimeout(5000);
            is.setReadTimeout(5000);
            i = is.getInputStream();
            File f = new File(dir);
            if(!f.exists()){
                f.mkdirs();
            }
            os = new FileOutputStream(dir + fileName);
            bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = i.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
        finally {
            try {
                os.close();
                i.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
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
    }
}
