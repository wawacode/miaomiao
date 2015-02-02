package com.renren.ntc.sg.mail;

import java.util.Date;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

public class MailSendServer {

    private static Logger logger = Logger.getLogger(MailSendServer.class);

    private static MailSendServer server;

    private String host;

    private int port;

    private String userName;

    private String password;

    private boolean isValidate = true;

    private Properties pro = new Properties();

    private Authenticator auth = null;

    private Address fromAddress;

    private static Object lock = new Object();

    private MailSendServer(String host, int port, String userName, String password, String fromAddress) {
        this(host, port, userName, password, fromAddress, true);
    }

    private MailSendServer(String host, int port, String userName, String password, String fromAddress,
            boolean isValidate) {
        this.host = host;
        this.userName = userName;
        this.password = password;
        this.port = port;
        this.isValidate = isValidate;
        try {
            this.fromAddress = new InternetAddress(fromAddress);
        } catch (AddressException e) {
            logger.error(String.format("create fromAddress error[%s]", fromAddress), e);
        }
        initServer();
    }

    private void initServer() {
        initProperty();
        if (isValidate) {
            auth = new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    if (StringUtils.isBlank(userName) || StringUtils.isBlank(password)) {
                        throw new NullPointerException(String.format("userName####%s  password####%s", userName,
                                password));
                    }
                    return new PasswordAuthentication(userName, password);
                }
            };
        }
    }

    public boolean sendTextInfo(final MailSendInfo sendInfo,boolean isText) {
        Session sendMailSession = Session.getDefaultInstance(pro, auth);
        try {
            if (null == fromAddress) {
                logger.info("fromAddress is null");
                return false;
            }
            if (null == sendInfo) {
                logger.info("sendInfo is null");
                return false;
            }
            // 根据session创建一个邮件消息
            Message mailMessage = new MimeMessage(sendMailSession);
            // 设置邮件消息的发送者
            mailMessage.setFrom(fromAddress);
            // 创建邮件的接收者地址，并设置到邮件消息中
            mailMessage.setRecipients(Message.RecipientType.TO, sendInfo.getToAddress());
            // 抄送者
            mailMessage.setRecipients(Message.RecipientType.CC, sendInfo.getCcAddress());
            // 设置邮件消息的主题
            mailMessage.setSubject(sendInfo.getSubject());
            // 设置邮件消息发送的时间
            mailMessage.setSentDate(new Date());
            if(isText){
            	// 设置邮件消息的主要内容
                mailMessage.setText(sendInfo.getContent());
            }else {
            //  给消息对象设置内容
            	  BodyPart mdp=new MimeBodyPart();//新建一个存放信件内容的BodyPart对象
            	  mdp.setContent(sendInfo.getContent(),"text/html;charset=gb2312");//给BodyPart对象设置内容和格式/编码方式
            	  Multipart mm=new MimeMultipart();//新建一个MimeMultipart对象用来存放BodyPart对
            	//  象(事实上可以存放多个)
            	  mm.addBodyPart(mdp);//将BodyPart加入到MimeMultipart对象中(可以加入多个BodyPart)
            	  mailMessage.setContent(mm);//把mm作为消息对象的内容
			}
            // 发送邮件
            //logger.info("send方法前一步");
            Transport.send(mailMessage);
            logger.info("email info:" + sendInfo.toString());
            //logger.info("send email ok");
            return true;
        } catch (MessagingException ex) {
        	ex.printStackTrace();
        }
        return false;
    }

    private void initProperty() {
        pro.put("mail.smtp.host", host);
        pro.put("mail.smtp.port", port);
        pro.put("mail.smtp.auth", Boolean.toString(isValidate));
    }

    public static MailSendServer getServer(String host, int port, String userName, String password, String fromAddress) {
        if (null != server) {
            return server;
        }
        synchronized (lock) {
            server = new MailSendServer(host, port, userName, password, fromAddress);
            return server;
        }
    }
//mailSendServer.sendTextInfo(new MailSendInfo("短信转push节省成本汇报", contentBuffer.toString(), to, cc));

}
