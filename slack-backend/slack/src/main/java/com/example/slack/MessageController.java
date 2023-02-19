package com.example.slack;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class MessageController {
	
	@Autowired
	private MessageRepository messageRepo;
	
	// Save method is predefine method in Mongo Repository
	// with this method we will save user in our database
	@PostMapping("/send")
	public Message sendMessage(@RequestBody Message message) {
		return messageRepo.save(message);
	}
	
	// findAll method is predefine method in Mongo Repository
	// with this method we will all user that is save in our database
	@GetMapping("/getAllMessages")
	public List<Message> getAllUser(){
		return messageRepo.findAll();
	}
}
