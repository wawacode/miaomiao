package com.qunar.sg.controllers.suggestion;

import net.paoding.rose.web.ControllerErrorHandler;
import net.paoding.rose.web.Invocation;
import org.apache.log4j.Logger;
import org.springframework.web.util.WebUtils;

public class ExceptionHandler implements ControllerErrorHandler {
	
	private static final Logger logger =Logger.getLogger(ExceptionHandler.class);
	
	public Object onError(Invocation inv, Throwable ex) throws Throwable {
		  inv.getRequest().setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE , null);
		  logger.error("unknow exception ",ex);
		  return "@{\"data\":[]}";
	}

}
