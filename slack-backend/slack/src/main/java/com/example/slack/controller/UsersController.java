package com.example.slack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.slack.dto.Users;
import com.example.slack.repository.UsersRepository;

@RestController
@CrossOrigin(origins = "*")
public class UsersController {
	
	MongoTemplate mongoTemplate;
	
	@Autowired
	private UsersRepository userRepo;
	
	@GetMapping("/checkUser") 
	public boolean checkUser(@RequestBody String userName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("name").is(userName));
		List<Users> users = mongoTemplate.find(query, Users.class);
		
		if(users.size() == 1)
			return true;
		else 
			return false;
	}
	
	@PostMapping("/registerUser")
	public Users registerUser(@RequestBody Users user) {
		return userRepo.save(user);
	}
}
