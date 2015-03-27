rm -fr CatStaffTool.apk
rm -fr www/build/CatStaffTool.apk

cordova build --release android
echo 0000001 | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore  platforms/android/ant-build/CordovaApp-release-unsigned.apk alias_name
 ~/android-sdks/build-tools/21.1.2/zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk CatStaffTool.apk

#update build/apk
cp -f CatStaffTool.apk www/build/CatStaffTool.apk