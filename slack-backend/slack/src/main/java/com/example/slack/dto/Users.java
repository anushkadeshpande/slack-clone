package com.example.slack.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Users {
	   @Id
	    private String userId;
	    
	    private String userName;
	    private String password;
	    
	    public Users() {
	    	this.userName = "";
	    	this.password = "";
	    }
	    
	    public Users(String userName, String password) {
	        super();
	        this.userName = userName;
	        this.password = password;
	    }
	    public String getUserId() {
			return userId;
		}

		public void setUserId(String userId) {
			this.userId = userId;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		
}
