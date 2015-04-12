#
# make sure : 1. install cordova 2. install android sdk 3. replace android skd path
#

rm -fr mmconsole*.apk
rm -fr www/build/*

cordova build --release android
echo 0000001 | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore  platforms/android/ant-build/MainActivity-release-unsigned.apk alias_name
 ~/android-sdks/build-tools/21.1.1/zipalign -v 4 platforms/android/ant-build/MainActivity-release-unsigned.apk mmconsole.apk

#update build/apk
cp -f mmconsole.apk www/build/mmconsole.apk
