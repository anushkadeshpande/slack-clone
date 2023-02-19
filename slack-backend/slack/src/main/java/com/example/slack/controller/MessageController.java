package com.example.slack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
	
	@PostMapping("/send")
	public Message sendMessage(@RequestBody Message message) {
		return messageRepo.save(message);
	}
	
	@GetMapping("/getAllMessages")
	public List<Message> getAllUser(){
		return messageRepo.findAll();
	}
	
	
}
