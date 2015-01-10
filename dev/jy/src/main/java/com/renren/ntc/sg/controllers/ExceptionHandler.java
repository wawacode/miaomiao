package com.renren.ntc.sg.controllers;

import net.paoding.rose.web.ControllerErrorHandler;
import net.paoding.rose.web.Invocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.WebUtils;

public class ExceptionHandler implements ControllerErrorHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(ExceptionHandler.class);
	
	public Object onError(Invocation inv, Throwable ex) throws Throwable {
		  inv.getRequest().setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE , null);
          ex.printStackTrace();
		  logger.error("unknow exception ",ex);
		  return "@{\"code\":500,\"msg\":\"uk error\"}";
	}

}
