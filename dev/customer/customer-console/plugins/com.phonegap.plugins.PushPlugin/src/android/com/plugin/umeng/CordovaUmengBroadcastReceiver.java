package com.plugin.umeng;

import android.content.Context;

import com.umeng.message.UmengBroadcastReceiver;
import static com.umeng.message.MsgConstant.DEFAULT_INTENT_SERVICE_CLASS_NAME;

public class CordovaUmengBroadcastReceiver extends UmengBroadcastReceiver {
	/*
	 * Implementation of GCMBroadcastReceiver that hard-wires the intent service to be 
	 * com.plugin.gcm.GCMIntentService, instead of your_package.GCMIntentService 
	 */
	@Override
	protected String a(Context context) {
    	return "com.plugin.umeng." + DEFAULT_INTENT_SERVICE_CLASS_NAME;
    }
}
