package com.example.slack.dto;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class Channel {
    @Id
    String channelId;
    
    private List<Message> messages;
      
    public Channel(String channelId, List<Message> messages) {
		this.channelId = channelId;
		this.messages = messages;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
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