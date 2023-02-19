package com.example.slack.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.slack.dto.Users;

public interface UsersRepository extends MongoRepository<Users,String>{

}
