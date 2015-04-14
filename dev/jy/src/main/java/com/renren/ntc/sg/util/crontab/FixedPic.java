package com.renren.ntc.sg.util.crontab;

import com.renren.ntc.sg.bean.Item;
import com.renren.ntc.sg.biz.dao.ItemsDAO;
import com.renren.ntc.sg.biz.dao.ProductDAO;
import com.renren.ntc.sg.util.SHttpClient;
import com.renren.ntc.sg.util.SUtils;
import net.paoding.rose.scanning.context.RoseAppContext;
import org.apache.commons.lang.StringUtils;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class FixedPic {

    private static String URL ="http://s.1688.com/selloffer/offer_search.htm?keywords={key}";

    private static long  shop_id= 10086;


    private static String PATH = "/home/root/webimg2/";

    public FixedPic() throws IOException {

    }

    public static void main(String[] args) throws IOException {
        RoseAppContext rose = new RoseAppContext();
        ItemsDAO itemDao = rose.getBean(ItemsDAO.class);
        ProductDAO pdDao = rose.getBean(ProductDAO.class);
        int offset = 100;
        for (int i=0 ;i < 10000 ; ){
            List<Item> itemls =  itemDao.getItems(SUtils.generTableName(shop_id), shop_id, i, offset);
            if(itemls.size() == 0){
                break;
            }
            for ( Item item :  itemls ){
                String pic = item.getPic_url();
                if (StringUtils.isBlank(pic)|| -1 == pic.indexOf("cat/images")){
                    String fname = item.getSerialNo()+".jpg";
                    String serialNo = item.getSerialNo();
                    String pic_url = "http://www.mbianli.com/cat/images/shop_" + shop_id + fname;
                    if(new File(PATH + fname).exists()){
                         System.out.println("update " + item.getSerialNo() +" " +  pic_url);
//                        itemDao.updateforSerialNo(SUtils.generTableName(shop_id),pic_url,item.getSerialNo());
                        continue;
                    }
                    if( -1 == pic.indexOf("cat/images")) {
                        try{
                            writeFile (pic,fname);
                            if (new File(PATH +fname).exists()){
                                System.out.println("update " + item.getSerialNo() +" " +  pic_url);
//                                itemDao.updateforSerialNo(SUtils.generTableName(shop_id),pic_url,item.getSerialNo());
                                continue;
                            }
                        }
                        catch(Throwable e){
                            e.printStackTrace();
                        }
                        continue ;
                    }

                    String url = URL.replace("{key}", serialNo) ;
                    byte [] ss =  SHttpClient.getURLData(url, "s.1" +
                            "688.com");
                    if (null == ss){
                        continue;
                    }
                    String html = SUtils.toString(ss);


                    html = repare(html);
                    if(-1 !=  html.indexOf("noresult-hd")){
                        continue;
                    }
                    String pat = "<div class=\"su-photo220\"><a  gotoDetail=\".*?\" target=\"_blank\"  href=\".*?\" offer-stat=\"pic\" class=\".*?\"><img class=\".*?\" border=\"0\" alt=\".*?\" src=\"(.*?)\"></img></a></div>";
                    Pattern pattern = Pattern.compile(pat);
                    Matcher matchers = pattern.matcher(html);
                    while (matchers.find()) {
                        int count = matchers.groupCount();
                        for (int k = 1; k <= count; k++) {
                            String value = matchers.group(k).trim();
                            System.out.println( " " + value);
                            try{
                            if (value == null){
                                return ;
                            }
                            writeFile (value,fname);
                            if (new File(PATH +fname).exists()){
                                System.out.println("update " + item.getSerialNo() +" " +  pic_url);
//                                itemDao.updateforSerialNo(SUtils.generTableName(shop_id),pic_url,item.getSerialNo());
                                continue;
                               }
                            }
                            catch(Throwable e){
                                    e.printStackTrace();
                            }
                        }
                    }
                }
            }
            i = i + offset;
        }
    }


    public static void writeFile(String strUrl, String fileName) throws Throwable {
        String dir = PATH;
        if(new File(dir + fileName).exists()){
            return ;
        }
        int bytesRead = 0;
        URL url = null;
        OutputStream os = null;
        URLConnection is = null;
        InputStream i = null ;
        try {
            url = new URL(strUrl);
            is = url.openConnection();
            is.setConnectTimeout(3000);
            is.setReadTimeout(3000);
            i = is.getInputStream();
            File f = new File(dir);
            if(!f.exists()){
                f.mkdirs();
            }
            os = new FileOutputStream( dir + fileName);
            bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = i.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        } catch (Throwable e) {
            e.printStackTrace();
            throw  e;
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


    private static String repare(String html) {
        html = html.replaceAll("<!--.*?-->", "");
        html = html.replaceAll("<script>.*?<\\script>", "");
        html = html.replaceAll("<SCRIPT.*?<\\SCRIPT>", "");
        // html = html.replaceAll(" +", "");
        html = html.replaceAll("\\t*", "");
        html = html.replaceAll("\\n|\\r", "");
//        System.out.println(html);
        return html;
    }




}