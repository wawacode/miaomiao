package com.renren.ntc.sg.controllers.wx;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;
import java.util.TreeMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wxap.client.TenpayHttpClient;
import com.wxap.util.MD5Util;
import com.wxap.util.TenpayUtil;

/*
 '΢��֧��������ǩ��֧������������
 '============================================================================
 'api˵����
 'init(app_id, app_secret, partner_key, app_key);
 '��ʼ������Ĭ�ϸ�һЩ����ֵ����cmdno,date�ȡ�
 'setKey(key_)'�����̻���Կ
 'getLasterrCode(),��ȡ�������
 'GetToken();��ȡToken
 'getTokenReal();Token���ں�ʵʱ��ȡToken
 'createMd5Sign(signParams);���Md5ǩ��
 'genPackage(packageParams);��ȡpackage��
 'createSHA1Sign(signParams);����ǩ��SHA1
 'sendPrepay(packageParams);�ύԤ֧��
 'getDebugInfo(),��ȡdebug��Ϣ
 '============================================================================
 '*/
public class RequestHandler {
	/** Token��ȡ��ص�ַ��ַ */
	private String tokenUrl;
	/** Ԥ֧�����url��ַ */
	private String gateUrl;
	/** ��ѯ֧��֪ͨ���URL */
	private String notifyUrl;
	/** �̻����� */
	private String appid;
	private String appkey;
	private String partnerkey;
	private String appsecret;
	private String key;
	/** ����Ĳ��� */
	private SortedMap parameters;
	/** Token */
	private String Token;
	private String charset;
	/** debug��Ϣ */
	private String debugInfo;
	private String last_errcode;

	private HttpServletRequest request;

	private HttpServletResponse response;

	/**
	 * ��ʼ���캯��
	 * 
	 * @return
	 */
	public RequestHandler(HttpServletRequest request,
			HttpServletResponse response) {
		this.last_errcode = "0";
		this.request = request;
		this.response = response;
		this.charset = "GBK";
		this.parameters = new TreeMap();
		// ��֤notify֧���������
		notifyUrl = "https://gw.tenpay.com/gateway/simpleverifynotifyid.xml";
		
	}

	/**
	 * ��ʼ������
	 */
	public void init(String app_id, String app_secret, String app_key,
			String partner_key) {
		this.last_errcode = "0";
		this.Token = "token_";
		this.debugInfo = "";
		this.appkey = app_key;
		this.appid = app_id;
		this.partnerkey = partner_key;
		this.appsecret = app_secret;
	}

	public void init() {
	}

	/**
	 * ��ȡ�������
	 */
	public String getLasterrCode() {
		return last_errcode;
	}

	/**
	 *��ȡ��ڵ�ַ,�������ֵ
	 */
	public String getGateUrl() {
		return gateUrl;
	}

	/**
	 * ��ȡ����ֵ
	 * 
	 * @param parameter
	 *            �������
	 * @return String
	 */
	public String getParameter(String parameter) {
		String s = (String) this.parameters.get(parameter);
		return (null == s) ? "" : s;
	}

	
	 //������Կ
	
	public void setKey(String key) {
		this.partnerkey = key;
	}
	//����΢����Կ
	public void  setAppKey(String key){
		this.appkey = key;
	}
	
	// �����ַ���
	public String UrlEncode(String src) throws UnsupportedEncodingException {
		return URLEncoder.encode(src, this.charset).replace("+", "%20");
	}

	// ��ȡpackage��ǩ���
	public String genPackage(SortedMap<String, String> packageParams)
			throws UnsupportedEncodingException {
		String sign = createSign(packageParams);

		StringBuffer sb = new StringBuffer();
		Set es = packageParams.entrySet();
		Iterator it = es.iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();
			String k = (String) entry.getKey();
			String v = (String) entry.getValue();
			sb.append(k + "=" + UrlEncode(v) + "&");
		}

		// ȥ�����һ��&
		String packageValue = sb.append("sign=" + sign).toString();
		System.out.println("packageValue=" + packageValue);
		return packageValue;
	}

	/**
	 * ����md5ժҪ,������:���������a-z����,������ֵ�Ĳ���μ�ǩ��
	 */
	public String createSign(SortedMap<String, String> packageParams) {
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
		sb.append("key=" + this.getKey());
		System.out.println("md5 sb:" + sb);
		String sign = MD5Util.MD5Encode(sb.toString(), this.charset)
				.toUpperCase();

		return sign;

	}
	/**
	 * ����packageǩ��
	 */
	public boolean createMd5Sign(String signParams) {
		StringBuffer sb = new StringBuffer();
		Set es = this.parameters.entrySet();
		Iterator it = es.iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();
			String k = (String) entry.getKey();
			String v = (String) entry.getValue();
			if (!"sign".equals(k) && null != v && !"".equals(v)) {
				sb.append(k + "=" + v + "&");
			}
		}

		// ���ժҪ
		String enc = TenpayUtil.getCharacterEncoding(this.request,
				this.response);
		String sign = MD5Util.MD5Encode(sb.toString(), enc).toLowerCase();

		String tenpaySign = this.getParameter("sign").toLowerCase();

		// debug��Ϣ
		this.setDebugInfo(sb.toString() + " => sign:" + sign + " tenpaySign:"
				+ tenpaySign);

		return tenpaySign.equals(sign);
	}

	

    //���XML
	   public String parseXML() {
		   StringBuffer sb = new StringBuffer();
	       sb.append("<xml>");
	       Set es = this.parameters.entrySet();
	       Iterator it = es.iterator();
	       while(it.hasNext()) {
				Map.Entry entry = (Map.Entry)it.next();
				String k = (String)entry.getKey();
				String v = (String)entry.getValue();
				if(null != v && !"".equals(v) && !"appkey".equals(k)) {
					
					sb.append("<" + k +">" + getParameter(k) + "</" + k + ">\n");
				}
			}
	       sb.append("</xml>");
			return sb.toString();
		}

	/**
	 * ����debug��Ϣ
	 */
	protected void setDebugInfo(String debugInfo) {
		this.debugInfo = debugInfo;
	}
	public void setPartnerkey(String partnerkey) {
		this.partnerkey = partnerkey;
	}
	public String getDebugInfo() {
		return debugInfo;
	}
	public String getKey() {
		return key;
	}

}
