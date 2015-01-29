unzip -oq jy-1.war -d web
cd web/WEB-INF/classes
/home/q/java/default/bin/java -classpath ./:../lib/*  com.renren.ntc.sg.util.ShopOrderReportDaliy
