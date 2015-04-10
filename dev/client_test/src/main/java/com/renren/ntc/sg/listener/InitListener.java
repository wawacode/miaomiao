package com.renren.ntc.sg.listener;

import com.renren.ntc.sg.service.LoggerUtils;
import com.renren.ntc.sg.service.ScheduleTask;
import com.renren.ntc.sg.service.ScheduleTaskV2;
import com.renren.ntc.sg.util.BootHeplerV2;
import com.renren.ntc.sg.util.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.*;
import java.util.Properties;
import java.util.zip.GZIPInputStream;

public class InitListener implements ServletContextListener {

	private static final Logger LOG = LoggerFactory.getLogger(InitListener.class);

	public void contextInitialized(ServletContextEvent sce) {
        LoggerUtils.getInstance().log("context Initialized ....");
        String main_url = BootHeplerV2.getInstance().getKey(Constants.MASTER_URL);
        String loopTime =  BootHeplerV2.getInstance().getKey(Constants.LOOPTIME);
        main_url = main_url.replace("{ver}",BootHeplerV2.getInstance().getKey(Constants.VER));
        LoggerUtils.getInstance().log("start loop work ....");

        ScheduleTaskV2.getinstance().start(6000,Long.valueOf(loopTime),main_url);
        LoggerUtils.getInstance().log("start loop work .... end");
	}

	public void contextDestroyed(ServletContextEvent sce) {
	}

}
