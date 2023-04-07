package com.example.slack.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.slack.dto.Channel;
import com.example.slack.dto.Message;
import com.example.slack.repository.ChannelRepository;
import com.mongodb.client.FindIterable;

@Service
public class ChannelController {
//	@Autowired
//	private ChannelRepository channelRepo;
//	
//	@Autowired
//	private MongoTemplate mongoTemplate;
//	
//	public Channel insert(Message m) {
////		LocalDate currentDate = LocalDate.now();
////		int year = currentDate.getYear();
////		int month = currentDate.getMonthValue();
////		int day = currentDate.getDayOfMonth();
////		
////		Document idDoc = new Document("year", year)
////                .append("month", month)
////                .append("day",day);
//		LocalDate currentDate = LocalDate.now();
//		org.bson.Document dateId =  new org.bson.Document("year", currentDate.getYear())
//                .append("month", currentDate.getMonth())
//                .append("day",currentDate.getDayOfMonth());
//		
//		boolean a = checkIfExists(dateId);
//		Channel ch = null;
//		List<Message> messageList = new ArrayList<Message>();
//		messageList.add(m);
//		if(!a) {
//			
//			ch = new Channel(dateId, messageList);
//			
//		}
//		else {
//				
//			Query query = new Query(Criteria.where("_id").is(dateId));
//			ch = mongoTemplate.findOne(query, Channel.class, "channel");
//			ch.getMessages().add(m);
//		}
//		// get message id
//		channelRepo.save(ch);
//		
//		return ch;
//	}
//	
//	public boolean checkIfExists(Document dateDoc) {
//		Query query = new Query(Criteria.where("_id").is(dateDoc));
//		return mongoTemplate.exists(query, "channel");
//	}
}
