package com.example.slack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.slack.model.ChatModel;

@RestController
public class SlackController {
	
	@GetMapping("/read")
	public ResponseEntity<String> readData() {
//	    Data createdData = myService.createData(data);
	    return ResponseEntity.ok("Hi");
	  }
	
	@PostMapping("/send")
	  public ResponseEntity<ChatModel> createData(@RequestBody ChatModel chatModel) {
//	    Data createdData = myService.createData(data);
	    return ResponseEntity.ok(chatModel);
	  }
}
