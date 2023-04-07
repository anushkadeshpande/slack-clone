package com.example.slack.dto;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
  
@Document
public class Message {
    @Id
    private String userId;
    
    private String name;
    private String message;
    
	String timestamp;
      
    public Message(String name, String message, String timestamp) {
        super();
        this.name = name;
        this.message = message;
        this.timestamp = timestamp;
    }
    

	public String getTimestamp() {
		return timestamp;
	}


	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "Message [userId=" + userId + ", name=" + name + ", message=" + message + ", timestamp=" + timestamp
				+ "]";
	}

	
}