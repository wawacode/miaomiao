package com.renren.ntc.sg.mail;

import javax.mail.Address;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

public class MailSendInfo {

    private static Logger logger = Logger.getLogger(MailSendInfo.class);

    private String subject;

    private String content;

    private Address[] toAddress;

    private Address[] ccAddress;

    public MailSendInfo(String subject, String content, final String[] toAddressStr, final String[] ccAddressStr) {
        this.subject = subject;
        this.content = content;
        if (null == toAddressStr) {
            throw new NullPointerException("toAddress is null");
        }
        toAddress = new Address[toAddressStr.length];
        initAddress(toAddress, toAddressStr);
        if (null != ccAddressStr) {
            ccAddress = new Address[ccAddressStr.length];
            initAddress(ccAddress, ccAddressStr);
        }
    }

    private void initAddress(Address[] address, String[] addressStr) {
        if (null == addressStr) {
            return;
        }
        int len = addressStr.length;
        String addr = "";
        for (int i = 0; i < len; i++) {
            try {
                addr = addressStr[i];
                address[i] = new InternetAddress(addr);
            } catch (AddressException e) {
                logger.error("");
            }
        }
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Address[] getToAddress() {
        return toAddress;
    }

    public Address[] getCcAddress() {
        return ccAddress;
    }

    public String toString() {
        StringBuilder str = new StringBuilder();
        str.append("subject[").append(subject).append("]");
        str.append("toAddress[").append(StringUtils.join(toAddress, ',')).append("]");
        str.append("ccAddress[").append(StringUtils.join(ccAddress, ',')).append("]");
        str.append("content[").append(content).append("]");
        return str.toString();
    }
}
