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

import com.example.slack.dto.UserProfile;
import com.example.slack.dto.Users;
import com.example.slack.model.PasswordChangeModel;
import com.example.slack.repository.UsersRepository;
import com.google.gson.Gson;

@RestController
@CrossOrigin(origins = "*")
public class UsersController {
	
	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	private UsersRepository userRepo;
	
	@PostMapping("/checkUser") 
	public Users checkUser(@RequestBody String userNameReq) {
		Map jsonReq = new Gson().fromJson(userNameReq, Map.class);
		String userName = (String) jsonReq.get("userName");
        return getUser(userName);
	}
	
	@PostMapping("/registerUser")
	public String registerUser(@RequestBody Users user) {
		System.out.println(user);
		Users users = getUser(user.getUserName());
		if(users.getUserId() == null) {
			userRepo.save(user);
			return "";
		}
		else
			return "A user with this username already exists. Please enter a new username!";
	}
	
	
	private Users getUser(String userName) {
		List<Users> users = findUser(userName);
		if(users.size() == 1)
			return users.get(0);
		else 
			return new Users();
	} 
	
	public List<Users> findUser(String userName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userName").is(userName));
		List<Users> users = mongoTemplate.find(query, Users.class);
		
		return users;
	}
	
	@GetMapping("{username}/getCurrentPassword")
	public String getCurrentPassword(@PathVariable String username) {
		// get current password
		List<Users> users = findUser(username);
		String currentPassword = users.get(0).getPassword();
		return currentPassword;
	}
	
	@PutMapping("{username}/changePassword")
	public String changePassword(@PathVariable String username, @RequestBody PasswordChangeModel pwdChngBody) {

			// update password
			Query query = new Query().addCriteria(Criteria.where("userName").is(username));
			Update updatePwd = new Update().set("password", pwdChngBody.getNewPassword());
			FindAndModifyOptions options= new FindAndModifyOptions().upsert(true);
			
			mongoTemplate.findAndModify(query, updatePwd, options, Users.class);
			
			
			return "Password changed successfully!";
		
	}
}
