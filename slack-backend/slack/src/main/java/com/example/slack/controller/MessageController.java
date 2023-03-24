package com.example.slack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.slack.dto.Message;
import com.example.slack.repository.MessageRepository;

@RestController
@CrossOrigin(origins = "*")
public class MessageController {
	
	@Autowired
	private MessageRepository messageRepo;
	
	@Autowired
	SimpMessagingTemplate template;
	
	@PostMapping("/send")
	public ResponseEntity<Void> sendMessage(@RequestBody Message textMessageDTO) {
		messageRepo.save(textMessageDTO);
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
