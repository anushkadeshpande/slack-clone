package com.example.slack.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.slack.dto.Message;
  
public interface MessageRepository extends MongoRepository<Message,String>{

//	Object getCollection(String string);
  
}