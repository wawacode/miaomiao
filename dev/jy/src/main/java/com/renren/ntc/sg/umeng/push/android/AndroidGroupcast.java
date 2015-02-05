package com.renren.ntc.sg.umeng.push.android;


import com.renren.ntc.sg.umeng.push.AndroidNotification;

public class AndroidGroupcast extends AndroidNotification {
	public AndroidGroupcast() {
		try {
			this.setPredefinedKeyValue("type", "groupcast");	
		} catch (Exception ex) {
			ex.printStackTrace();
			System.exit(1);
		}
	}
}
