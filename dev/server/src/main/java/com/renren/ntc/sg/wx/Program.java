package com.renren.ntc.sg.wx;

import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.qq.weixin.mp.aes.WXBizMsgCrypt;

public class Program {

	public static void main(String[] args) throws Exception {

		//
		// 第三方回复公众平台
		//

		// 需要加密的明文
		String encodingAesKey = "00WsV2hbh3BYF08ycvHn8qAjPXRjtaFNeRJTA3UwElu";
		String token = "toooken";
		String timestamp = "1409304348";
		String nonce = "xxxxxx";
		String appKey = "84f42e0563644d1608814d5b1c2ec1d8";
		String appId = "wx871a815b6738e26d";
		String replyMsg = " 中文<xml><ToUserName><![CDATA[oia2TjjewbmiOUlr6X-1crbLOvLw]]></ToUserName><FromUserName><![CDATA[gh_7f083739789a]]></FromUserName><CreateTime>1407743423</CreateTime><MsgType><![CDATA[video]]></MsgType><Video><MediaId><![CDATA[eYJ1MbwPRJtOvIEabaxHs7TX2D-HV71s79GUxqdUkjm6Gs2Ed1KF3ulAOA9H1xG0]]></MediaId><Title><![CDATA[testCallBackReplyVideo]]></Title><Description><![CDATA[testCallBackReplyVideo]]></Description></Video></xml>";

//		WXBizMsgCrypt pc = new WXBizMsgCrypt(token, encodingAesKey, appId);
//		String mingwen = pc.encryptMsg(replyMsg, timestamp, nonce);
//		System.out.println("加密后: " + mingwen);

        System.out.println("加密后: " + replyMsg);

		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		StringReader sr = new StringReader(replyMsg);
		InputSource is = new InputSource(sr);
		Document document = db.parse(is);

		Element root = document.getDocumentElement();
		NodeList nodelist1 = root.getElementsByTagName("Encrypt");
		NodeList nodelist2 = root.getElementsByTagName("MsgSignature");

		String encrypt = nodelist1.item(0).getTextContent();
		String msgSignature = nodelist2.item(0).getTextContent();

		String format = "<xml><ToUserName><![CDATA[toUser]]></ToUserName><Encrypt><![CDATA[%1$s]]></Encrypt></xml>";
		String fromXML = String.format(format, encrypt);

		//
		// 公众平台发送消息给第三方，第三方处理
		//

		// 第三方收到公众号平台发送的消息
//		String result2 = pc.decryptMsg(msgSignature, timestamp, nonce, fromXML);
//		System.out.println("解密后明文: " + result2);

        System.out.println("解密后明文: " + fromXML);
		
		//pc.verifyUrl(null, null, null, null);
	}
}
