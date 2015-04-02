package com.renren.ntc.sg.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.renren.ntc.sg.mail.MailSendInfo;
import com.renren.ntc.sg.mail.MailSendServer;
/**
 * 需要先申请短信模板的id再进行发送
 * @author chunhai.li
 *
 */
public class NewUserUtil {
		//private static final String filePath = "E:\\new.txt";
		private static final Map<String, String[]> map = new HashMap<String, String[]>();
		private static final Map<String, String> codeMap = new HashMap<String, String>();
		public static void main(String[] args) {
			System.out.println("arg[0]="+args[0]+",arg[1]="+args[1]);
			init();
			readTxtFileAndSendSms(args[0]);
			String[] mailList = args[1].split(",");
			sendMail(map, codeMap,mailList);
		}
		private static void init(){
			 map.put("625", new String[]{"1","43"});
			 map.put("嘉美超市", new String[]{"15","17","42"}); 
			 map.put("日日鑫晟超市", new String[]{"14","18","41"}); 
			 map.put("108生活超市", new String[]{"13","19","40"});
			 map.put("方舟苑9号楼超市", new String[]{"29","39","108"});
			 map.put("嘉源康超市传单", new String[]{"11","28","38"});
			 map.put("108便利店", new String[]{"10","27","37"});
			 map.put("113便利店", new String[]{"9","26","36"});
			 map.put("鑫世纪华联超市", new String[]{"25","35","109"});
			 map.put("京诚超市", new String[]{"24","34","110"});
			 map.put("2号超市", new String[]{"6","23","33"}); 
			 map.put("又来玛特", new String[]{"5","22","32"});
			 map.put("金隅丽港城便民店", new String[]{"20","30","111"}); 
			 map.put("大西洋新城便民店", new String[]{"21","31","112"});
			 map.put("金兴超市", new String[]{"49","57","113"}); 
			 map.put("花家地小区超市水站", new String[]{"47","50","58"}); 
			 map.put("银领水站商店", new String[]{"51","59","114"});
			 map.put("华芝益民超市", new String[]{"52","101","115"});
			 map.put("福莱特便利店 ", new String[]{"5","102","104"});
			 map.put("望京西园二区超市", new String[]{"103","105","106"}); 
		}
		public static void readTxtFileAndSendSms(String filePath) {
			System.out.println("filepath="+filePath);
	        InputStreamReader read = null;
	        try {
	            String encoding = "utf-8";
	            File file = new File(filePath);
	            if (file.isFile() && file.exists()) { //判断文件是否存在
	                read = new InputStreamReader(new FileInputStream(file), encoding);//考虑到编码格式
	                BufferedReader bufferedReader = new BufferedReader(read);
	                String lineTxt = null;
	                int k = 0;
	                while ((lineTxt = bufferedReader.readLine()) != null) {
	                	if(StringUtils.isBlank(lineTxt)){
	                		continue;
	                	}
	                	String[] result = lineTxt.split("_");
	                	//System.out.println("-----------"+result[0]+":扫码报告--------------------------------");
	                	String code = result[2];
	                	String[] uvpvArr = lineTxt.split(" ");
	                	String uv = uvpvArr[1];
	                	String pv = uvpvArr[2];
	                	codeMap.put(code, uv+"|"+pv);
	                }
	            } else {
	                System.out.println("找不到指定的文件");
	            }
	            System.out.println("codemap="+codeMap);
	        } catch (Exception e) {
	            System.out.println("读取文件内容出错");
	            e.printStackTrace();
	        } finally {
	            if (null != read) {
	                try {
	                    read.close();
	                } catch (IOException e) {
	                    e.printStackTrace();
	                }
	            }
	        }

	    }
		
		private static void sendMail(Map<String, String[]> shopCodeMap,Map<String, String> codeResultMap,String[] mailList){
			System.out.println("shopcodemap="+shopCodeMap);
			System.out.println("codeResultMap="+codeResultMap);
			
			StringBuffer message = new StringBuffer("每日新增 "+Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(-1, 0, 0, 0)));
			message.append("\n");
			for (Iterator iterator = shopCodeMap.keySet().iterator(); iterator.hasNext();) {
				String shopName = (String) iterator.next();
				String[]  codeArr = shopCodeMap.get(shopName);
				int uv = 0;
				int pv = 0;
				int totalUv = 0;
				int totalPv = 0;
				for(String code : codeArr){
					String uvPvStr = codeResultMap.get(code);
					if(StringUtils.isBlank(uvPvStr)){
						continue;
					}
					String[] uvpvArr = uvPvStr.split("\\|");
					uv = Integer.parseInt(uvpvArr[0]);
					pv = Integer.parseInt(uvpvArr[1]);
					totalUv += uv;
					totalPv += pv;
					
				}
				
				message.append("<tr> <td> "+shopName+" </td> <td> "+totalUv+" </td> <td> "+totalPv+" </td> </tr>");
				
			}

			MailSendServer mailSendServer = com.renren.ntc.sg.mail.MailSendServer.getServer("smtp.163.com", 25, "lee_yeah1@163.com", "Lee1qaz2wsx",
		              "lee_yeah1@163.com");
			 
			  
			  mailSendServer.sendTextInfo(new MailSendInfo("新增用户列表",getHtmlBody(message.toString()), mailList, new String[0]),false);
		}
	  
		private static String getHtmlBody(String info){
			String html = "<html><head><title></title></head><body>"+
			"<table style='width:100%' cellpadding='2' cellspacing='0' border='1' bordercolor='#000000'>"+
			"<tbody> <tr> <td> <br /> </td> <td> "+Dateutils.tranferDefaultDate2Str(Dateutils.getDateByCondition(-1, 0, 0, 0))+"新增用户列表</td> <td> <br /> </td> </tr> <tr> <td> 名称 </td> <td> uv </td> <td> pv </td> </tr>"+		
			info+		
			"</tbody> </table> </body> </html>";
			return html;
		}
}
