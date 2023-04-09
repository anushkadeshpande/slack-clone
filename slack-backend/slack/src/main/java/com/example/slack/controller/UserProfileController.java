package com.example.slack.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.example.slack.dto.UserProfile;
import com.example.slack.dto.Users;
import com.example.slack.repository.UserProfileRepository;
import com.google.gson.Gson;


@RestController
@CrossOrigin(origins = "*")
@EnableWebMvc
public class UserProfileController {

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	private UserProfileRepository userProfileRepo;
	
	@PostMapping("/addUserProfile")
	public UserProfile addUserProfile(@RequestBody UserProfile userProfile) {
		return userProfileRepo.save(userProfile);
	}
	
	@PostMapping("/getUserProfile")
	public UserProfile getUserProfile(@RequestBody String userNameReq) {
		Map jsonReq = new Gson().fromJson(userNameReq, Map.class);
		String userName = (String) jsonReq.get("userName");
		List<UserProfile> users = findUser(userName);
		if(users.size() == 1)
			return users.get(0);
		else 
			return new UserProfile();
	} 
	
	public List<UserProfile> findUser(String userName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userName").is(userName));
		List<UserProfile> users = mongoTemplate.find(query, UserProfile.class);
		
		return users;
	}
	
	@GetMapping("/getAllUserProfiles")
	public List<UserProfile> getAllUserProfiles() {
		return userProfileRepo.findAll();
	}
	
	@PutMapping("/{userName}/updateUserDp")
	public void updateUserDp(@PathVariable String userName,@RequestBody String newDpCol) {
		Query query = new Query().addCriteria(Criteria.where("userName").is(userName));
		Update updateDpCol = new Update().set("userDPCol", newDpCol);
		FindAndModifyOptions options= new FindAndModifyOptions().upsert(true);
		
		mongoTemplate.findAndModify(query, updateDpCol, options, UserProfile.class);
	}
}
