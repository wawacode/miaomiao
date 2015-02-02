package com.qunar.quzilla.pojo;
public class SDoc {
	private Long id;

	private String word;
	public SDoc(){
		
	}
	public SDoc(Long docid,String key){
		this.id = docid;
		this.word = key;
		
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long docid) {
		this.id = docid;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String key) {
		this.word = key;
	}

}
