package com.qunar.quzilla.tools;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

import net.paoding.rose.scanning.context.RoseAppContext;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import com.qunar.quzilla.dao.SuggestionDAO;
import com.qunar.quzilla.pojo.SDoc;
import com.qunar.quzilla.utils.Constants.ErrorCode;
import com.qunar.quzilla.utils.MessageUtils;

public class LoadMain {

	private static final Logger logger = Logger.getLogger(LoadMain.class);

	private static final int COUNT = 1000;
	public static void main(String[] agrs) {
		RoseAppContext ctx = new RoseAppContext();
		SuggestionDAO suggest = ctx.getBean(SuggestionDAO.class);
		int count = suggest.getCount().getCount();
	
		for (int i = 0; i < count; i = i + COUNT) {
			List<SDoc> ldoc = suggest.getDoc(i, COUNT);
			for (SDoc doc : ldoc) {
				String url;
				try {
					url = formUrl(doc);
					String res = get(url);
					if (!check(res)){
						logger.error(String.format("fail to  add key %s  uuid %d  resion: %s ", doc.getWord(), doc.getId(),res));
					}
					logger.info(String.format("add to  add key %s  uuid %d ", doc.getWord(), doc.getId()));
					
				} catch (UnsupportedEncodingException e) {
					logger.error(String.format("fail to  add key %s  uuid %d ", doc.getWord(), doc.getId()), e);
				}
			}
		}
	}

	private static boolean check(String res) {
		JSONObject jb = JSONObject.parseObject(res);
		if (null !=jb.getString("error")){
			return false;
		}
		return true;
	}

	private static String formUrl(SDoc doc) throws UnsupportedEncodingException {
		String url = String.format("http://l-qps3.wap.cn6.qunar.com:8080/add?key=%s&uuid=%d",
				URLEncoder.encode(doc.getWord(), "utf-8"), doc.getId());
		return url;
	}

	public static String get(String url) {
		HttpClient client = new HttpClient();
		GetMethod method = new GetMethod(url);
		String response = "";
		try {
			client.executeMethod(method);
			method.getStatusLine();
			response = method.getResponseBodyAsString();
		} catch (HttpException e) {
			e.printStackTrace();
			response = MessageUtils.formErrorMessage(ErrorCode.UNKNOWEXCEPTION);
		} catch (IOException e) {
			e.printStackTrace();
			response = MessageUtils.formErrorMessage(ErrorCode.UNKNOWEXCEPTION);
		} catch (Exception e) {
			e.printStackTrace();
			response = MessageUtils.formErrorMessage(ErrorCode.UNKNOWEXCEPTION);
		} finally {
			method.releaseConnection();
		}
		return response;
	}

}
