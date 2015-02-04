喵喵 商家 管理 工具
=====================

this is ionic -based hybrid app, install ionic first and run:

DEBUG MODE:


ionic serve

For android:

cordova platform add android

cordova plugin add nl.x-services.plugins.toast 2.0.3 "Toast"
cordova plugin add org.apache.cordova.console 0.2.12 "Console"
cordova plugin add org.apache.cordova.device 0.2.13 "Device"
cordova plugin add org.apache.cordova.dialogs 0.2.11 "Notification"
cordova plugin add org.apache.cordova.file 1.3.2 "File"
cordova plugin add org.apache.cordova.media 0.2.15 "Media"
cordova plugin add https://github.com/liangji101/PushPlugin

ionic build android
ionic emulate or run android

build android apk
-------------

cordova build --release android


jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore  platforms/android/ant-build/CordovaApp-release-unsigned.apk alias_name

~/android-sdks/build-tools/21.1.2/zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk mmconsole.apk


For iOS:

cordova platform add iOS

cordova plugin add nl.x-services.plugins.toast 2.0.3 "Toast"
cordova plugin add org.apache.cordova.console 0.2.12 "Console"
cordova plugin add org.apache.cordova.device 0.2.13 "Device"
cordova plugin add org.apache.cordova.dialogs 0.2.11 "Notification"
cordova plugin add org.apache.cordova.file 1.3.2 "File"
cordova plugin add org.apache.cordova.media 0.2.15 "Media"
cordova plugin add https://github.com/liangji101/PushPlugin


ionic build ios
ionic emulate ios


