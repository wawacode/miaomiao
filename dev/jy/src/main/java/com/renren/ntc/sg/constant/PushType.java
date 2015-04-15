package com.renren.ntc.sg.constant;

public enum PushType {
	NEW_ORDER("new_order"),REMIND_ORDER("remind_order"),CANCEL_ORDER("cancel_order");
	private String type;
	private PushType(String type){
		this.type = type;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
