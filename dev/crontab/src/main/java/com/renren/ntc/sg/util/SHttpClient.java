package com.renren.ntc.sg.util;

import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class SHttpClient {
	private static final int CONN_TIMEOUT = 2000;
	private static final int READ_TIMEOUT = 2000;
	private static final int RETRY = 1;

	public static Logger logger = LoggerFactory.getLogger(SHttpClient.class);

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
		return "ali_beacon_id=211.151.238.52.1421235281646.509720.4; cna=xfM3DV+BBn0CAdoetLPm1IFt; h_keys=8850339008022#6903148170496#6930799503618#6948960100429#5000267024202#6900228381124#6901035609272#6901672912704#6902890227687#4002103248262; JSESSIONID=8L78eDuu1-fK2TWHaehDm8HaamRA-hDiz92P-djN; __cn_logon__=true; __cn_logon_id__=lyih_tom_com; ali_apache_track=\"c_ms=1|c_mid=b2b-157159659|c_lid=lyih_tom_com\"; ali_apache_tracktmp=\"c_w_signed=Y\"; _cn_slid_=IALeRbJJYF; LoginUmid=\"kECtq5RRYr4z3n1RRuZvOdvfRGwT82yOvJnriuVsniiOMv4GYTxyHg%3D%3D\"; userID=\"An6c0PbfS5HpQcL4bvfCNIkcAAdYlfgjzqkFfpkDUwg6sOlEpJKl9g%3D%3D\"; last_mid=b2b-157159659; unb=157159659; __last_loginid__=lyih_tom_com; login=\"kFeyVBJLQQI%3D\"; cn_tmp=\"Z28mC+GqtZ3VdQba+kYRKEW8FFJrKr/BHeBNufq7XlHryJVaRQINu+zJuwuRgeDi9XwPCz571CPRbYLudcTKtBHvYsBCqr6YS1kpamaTB3lLsf4NuFOwZp0j95v9wKoKWK/Z5JRQVp3fza3ZkPjvnOvfzTG1w/JjWo1Iw4iYWXxDejL+YJO2QdUT1ts5OaFRSg0DvgUr7sRfMOJUau0pHVZKFOH3E/61mWlHycm3tS8aVE3odKxd3Q==\"; _csrf_token=1421985906004; _is_show_loginId_change_block_=b2b-157159659_false; _show_force_unbind_div_=b2b-157159659_false; _show_sys_unbind_div_=b2b-157159659_false; _show_user_unbind_div_=b2b-157159659_false; __rn_refer_login_id__=lyih_tom_com; __rn_alert__=false; alisw=swIs1200%3D1%7C; userIDNum=\"1QjT8uzkrs90ZvS19%2BaAOg%3D%3D\"; _nk_=\"eK8y%2FElKhco3v0aDEMbKdw%3D%3D\"; ali_ab=211.151.238.52.1421235282069.2; ad_prefer=\"2015/01/23 12:07:05\"; _tmp_ck_0=\"xgO3kdSAfU1C4t7vT%2BOFHV%2B3FrL%2BeUqB12zylN%2FSBIrjQfBi6MPhgGdF5%2FnhOLL%2BTgvJszpPcnLoXu7%2Fi4En9PduS5ttxuaWaDrFMVTfzseGbHNC3FA9dNXaoQ09G1GhAHRZ9RX%2Bt4Q1z2eD2HkTscJTpx42a2PpylnKiL6aXM9I779nQa%2BjSD1lGICc94ieTTsb0OcfeFGWwOs9HbWtUgldjWh%2BnZkQmkcQIHXk3MFsPnQTWFcbGJWgPbrZiL6qNTKVSHDcZOSNpzwevMEwPbbbvY2ckJcIV8CfRtOpiHE9jxnvhHy0dI71FidCVZmyhLpUwIzChWBxaigASK%2FSoSaWV6Y97laqgTVPG%2BHznAy2Z%2FLfx1Rtzfgj7zRuOzwdrkSs2bf4YxhWreiz1OVMJeuoEev4eJ8oGph8QnYdDyWwZcOy2dGQny6%2BIvh3xGRGIB1BJbCoaxxqGECnMtfA3dsWGpnOB5EbIr%2B21WHaQ3e78kiDkITiZrABPyIG6o4gHp4XYXUsmzsLcx9jk556zf8l5AzcjwEVVa2%2BqDkWcoH%2BHtB1F4HMo9F9jYfm4glU\"; alicnweb=touch_tb_at%3D1421986025312; isg=83517260C2AA7590D53CED6805558064";
    }

	
	
	public static byte[] getURLData(String url, String host) throws IOException {
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
				c.setRequestProperty("Host", host);
				c.setRequestProperty("Cookie", SHttpClient._GetCookie());
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
        method.setParameter("data",postParam );
        try {
            client.executeMethod(method);
            byte[] responseBody = method.getResponseBody();

            return responseBody;
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

}
