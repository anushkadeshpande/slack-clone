package com.example.slack.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.slack.dto.UserProfile;

public interface UserProfileRepository extends MongoRepository<UserProfile,String>{

}
