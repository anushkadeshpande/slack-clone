package com.example.slack.dto;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class Channel {
    @Id
    org.bson.Document channelId;
    
    private List<Message> messages;
      
    public Channel(org.bson.Document channelId, List<Message> messages) {
		super();
		this.channelId = channelId;
		this.messages = messages;
	}

	public org.bson.Document getChannelId() {
		return channelId;
	}

	public void setChannelId(org.bson.Document channelId) {
		this.channelId = channelId;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	@Override
	public String toString() {
		return "Channel [channelId=" + channelId + ", messages=" + messages + "]";
	}
	
	

}