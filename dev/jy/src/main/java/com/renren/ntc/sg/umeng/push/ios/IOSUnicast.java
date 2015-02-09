package com.renren.ntc.sg.umeng.push.ios;


import com.renren.ntc.sg.umeng.push.IOSNotification;
import org.json.JSONException;

public class IOSUnicast extends IOSNotification {
	public IOSUnicast() {
		try {
			this.setPredefinedKeyValue("type", "unicast");	
		} catch (Exception ex) {
			ex.printStackTrace();
			System.exit(1);
		}
	}

    public void print() {
        try {
            System.out.println(rootJson.toString(1));
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }
}
