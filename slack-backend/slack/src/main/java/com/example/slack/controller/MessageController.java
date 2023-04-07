package com.example.slack.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.slack.dto.Channel;
import com.example.slack.dto.Message;
import com.example.slack.repository.ChannelRepository;
import com.example.slack.repository.MessageRepository;
import com.mongodb.client.FindIterable;

@RestController
@CrossOrigin(origins = "*")
public class MessageController {
	
	@Autowired
	private MessageRepository messageRepo;
	
	@Autowired
	SimpMessagingTemplate template;
	
	@Autowired
	ChannelController chController;
	
//	@Autowired
//	private ChannelRepository channelRepo;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@PostMapping("/send")
	public ResponseEntity<Void> sendMessage(@RequestBody Message textMessageDTO) {
		
//		LocalDate currentDate = LocalDate.now();
//		org.bson.Document dateId =  new org.bson.Document("year", currentDate.getYear())
//                .append("month", currentDate.getMonth())
//                .append("day",currentDate.getDayOfMonth());
		ZoneId zid = ZoneId.of("Asia/Kolkata");
		System.out.println(zid);
		
//		LocalDateTime now = LocalDateTime.now(zid);  
//		System.out.println(now);
//		textMessageDTO.setTimestamp(now);
		System.out.println(textMessageDTO);
		messageRepo.save(textMessageDTO);		
//		Set<String> coll = mongoTemplate.getCollectionNames();
//		
//		
//		
//		Channel ch = chController.insert(textMessageDTO);

		template.convertAndSend("/topic/message", textMessageDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@MessageMapping("/sendMessage")
	public void receiveMessage(@Payload Message textMessageDTO) {
		// receive message from client
	}

	@SendTo("/topic/message")
	public Message broadcastMessage(@Payload Message textMessageDTO) {
		return textMessageDTO;
	}
//	@PostMapping("/send")
//	public Message sendMessage(@RequestBody Message message) {
//		return messageRepo.save(message);
//	}
	
	@GetMapping("/getAllMessages")
	public List<Message> getAllUser(){
		return messageRepo.findAll();
	}
	
	
}
