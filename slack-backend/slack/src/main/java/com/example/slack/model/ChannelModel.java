package com.example.slack.model;

public class ChannelModel {
	private String _id;

	public String getChannel() {
		return _id;
	}

	public void setChannel(String channel) {
		this._id = channel;
	}

	@Override
	public String toString() {
		return "ChannelModel [_id=" + _id + "]";
	}
	
	
}
