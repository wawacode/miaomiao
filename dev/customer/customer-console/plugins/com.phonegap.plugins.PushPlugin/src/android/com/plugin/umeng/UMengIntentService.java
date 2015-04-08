package com.plugin.umeng;

import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import org.android.agoo.client.BaseConstants;

import com.umeng.message.UTrack;
import com.umeng.message.UmengBaseIntentService;
import com.umeng.message.entity.UMessage;

@SuppressLint("NewApi")
public class UMengIntentService extends UmengBaseIntentService {

    private static final String TAG = "UMengIntentService";

    public UMengIntentService() {
        super();
    }

    @Override
    public void onRegistered(Context context, String regId) {

        Log.v(TAG, "onRegistered: "+ regId);

        JSONObject json;

        try
        {
            json = new JSONObject().put("event", "registered");
            json.put("regid", regId);

            Log.v(TAG, "onRegistered: " + json.toString());

            // Send this JSON data to the JavaScript application above EVENT should be set to the msg type
            // In this case this is the registration ID
            PushPlugin.sendJavascript( json );

        }
        catch( JSONException e)
        {
            // No message to the user is sent, JSON failed
            Log.e(TAG, "onRegistered: JSON exception");
        }
    }

    @Override
    public void onUnregistered(Context context, String regId) {
        Log.d(TAG, "onUnregistered - regId: " + regId);
    }

    @Override
    protected void onMessage(Context context, Intent intent) {

        super.onMessage(context, intent);
        try {
            String message = intent.getStringExtra(BaseConstants.MESSAGE_BODY);
            UMessage msg = new UMessage(new JSONObject(message));
            UTrack.getInstance(context).trackMsgClick(msg);

            // Extract the payload from the message
            Bundle extras = intent.getExtras();
            if (extras != null)
            {
                // if we are in the foreground, just surface the payload, else post it to the statusbar
                if (PushPlugin.isInForeground()) {
                    extras.putBoolean("foreground", true);
                    PushPlugin.sendExtras(extras);
                }
                else {
                    extras.putBoolean("foreground", false);

                    // Send a notification if there is a message
                    if (msg != null) {
                        createNotification(context, extras,msg);
                    }
                }
            }

        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

    public void createNotification(Context context, Bundle extras, UMessage msg)
    {
        NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        String appName = getAppName(this);

        Intent notificationIntent = new Intent(this, PushHandlerActivity.class);
        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        notificationIntent.putExtra("pushBundle", extras);

        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        int defaults = Notification.DEFAULT_ALL;

        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(context)
                        .setDefaults(defaults)
                        .setSmallIcon(context.getApplicationInfo().icon)
                        .setWhen(System.currentTimeMillis())
                        .setContentTitle(msg.title)
                        .setTicker(msg.title)
                        .setContentIntent(contentIntent)
                        .setAutoCancel(true);

        mBuilder.setContentText(msg.text);
        mBuilder.setNumber(1);
        int notId = 0;
        try {
            notId = Integer.parseInt(msg.msg_id);
        }
        catch(NumberFormatException e) {
            Log.e(TAG, "Number format exception - Error parsing Notification ID: " + e.getMessage());
        }
        catch(Exception e) {
            Log.e(TAG, "Number format exception - Error parsing Notification ID" + e.getMessage());
        }

        mNotificationManager.notify((String) appName, notId, mBuilder.build());
    }

    private static String getAppName(Context context)
    {
        CharSequence appName =
                context
                        .getPackageManager()
                        .getApplicationLabel(context.getApplicationInfo());

        return (String)appName;
    }

    @Override
    public void onError(Context context, String errorId) {
        Log.e(TAG, "onError - errorId: " + errorId);
    }

}
