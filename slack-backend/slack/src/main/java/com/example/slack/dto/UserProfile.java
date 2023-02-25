package com.example.slack.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class UserProfile {
	   @Id
	    private String userId;
	    
	    private String userName;
	    private String userDPCol;
	    
	    public UserProfile() {
	    	this.userName = "";
	    	this.userDPCol = "";
	    }
	    
	    public String getUserDPCol() {
			return userDPCol;
		}

		public void setUserDPCol(String userDPCol) {
			this.userDPCol = userDPCol;
		}

		public UserProfile(String userName, String col) {
	        super();
	        this.userName = userName;
	        this.userDPCol = col;
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

	
}
