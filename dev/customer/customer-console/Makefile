
prepare: 
	ionic prepare

ios:   prepare
	ionic build ios;

android: prepare 
	ionic build android;

minify: 
	cd tools && ant -f minifyJsCss.xml && cd .. ;

pack-android : minify android
	sh buildAndroidAPK.sh;

