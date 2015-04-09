package com.renren.ntc.sg.service;

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
	private static final int CONN_TIMEOUT = 10000;
	private static final int READ_TIMEOUT = 10000;
	private static final int RETRY = 5;

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
		return "KDTSESSIONID=2s57v4m6nkr1rs6n8fp3cjge10;";
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
