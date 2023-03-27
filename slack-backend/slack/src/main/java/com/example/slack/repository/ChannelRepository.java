package com.example.slack.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.slack.dto.Channel;

public interface ChannelRepository extends MongoRepository<Channel,String>{

}
