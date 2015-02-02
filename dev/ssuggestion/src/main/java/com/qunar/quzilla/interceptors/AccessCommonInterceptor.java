package com.qunar.quzilla.interceptors;

import net.paoding.rose.web.ControllerInterceptorAdapter;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Interceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Interceptor(oncePerRequest = true)
public class AccessCommonInterceptor extends ControllerInterceptorAdapter {

	private static final String  POSTSTRING = "POSTSTRING";
	private static final Logger logger = LoggerFactory.getLogger(AccessCommonInterceptor.class);

	public AccessCommonInterceptor() {
		setPriority(10000);
	}

	@Override
	protected Object before(Invocation inv) throws Exception {
		statistic(inv);
		return true;
	}

	protected Object after(Invocation inv, Object instruction) throws Exception {
		
		if (instruction instanceof String) {
			String re = (String) instruction;
			if (re.startsWith("@")) {
				if (logger.isInfoEnabled()) {
					logger.info(String.format("params: %s response: %s"), inv.getAttribute(POSTSTRING), re);
				}
			}
		}
		return instruction;
	}

	@SuppressWarnings("unchecked")
	private final void statistic(Invocation inv) {
		HttpServletRequest request = inv.getRequest();
		if ("POST".equalsIgnoreCase(request.getMethod()) || "GET".equalsIgnoreCase(request.getMethod())) {
			Map<String, String[]> params = request.getParameterMap();
			if (params != null && params.size() > 0) {
				StringBuilder buf = new StringBuilder();
				for (Map.Entry<String, String[]> entry : params.entrySet()) {
					String[] values = entry.getValue();
					if (values == null) {
						buf.append(entry.getKey());
						buf.append('=');
						buf.append('&');
						continue;
					}
					for (String value : values) {
						buf.append(entry.getKey());
						buf.append('=');
						buf.append(value);
						buf.append('&');
					}
				}
				request.setAttribute(POSTSTRING, buf.substring(0, buf.length() - 1));
			}
		}
	}

}
