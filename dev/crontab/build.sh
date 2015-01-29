mvn clean package
/home/q/tools/bin/stop_tomcat.sh  /home/q/www/cat.com
mv  /home/q/www/cat.com/webapps/ROOT/   ~/ROOT`date +%Y%m%d`
mv target/jy-1    /home/q/www/cat.com/webapps/ROOT
/home/q/tools/bin/start_tomcat.sh  /home/q/www/cat.com