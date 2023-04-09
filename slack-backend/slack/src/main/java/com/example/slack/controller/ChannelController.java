package com.example.slack.controller;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.slack.dto.Channel;
import com.example.slack.dto.Message;
import com.example.slack.model.ChannelModel;
//import com.example.slack.repository.ChannelListRepository;
import com.example.slack.repository.ChannelRepository;

@RestController
@CrossOrigin(origins = "*")
public class ChannelController {
	@Autowired
	private ChannelRepository channelRepo;
	
//	@Autowired
//	private ChannelListRepository channelListRepo;
//	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private MessageController messageController;
	
	@Autowired
	SimpMessagingTemplate template;
	
	@PostMapping("/{channel}/send")
	public ResponseEntity<Void> sendMessage(@PathVariable String channel, @RequestBody Message textMessageDTO) {
		// in current channel, append the message to the messages list
//		channelRepo.
		
		System.out.println(textMessageDTO);
		Optional<Channel> result = channelRepo.findById(channel);
		
		Channel ch = result.get();
		
		List<Message> messages = ch.getMessages();
		
		messages.add(textMessageDTO);
		
		channelRepo.save(ch);		

		template.convertAndSend("/topic/"+channel, textMessageDTO);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@MessageMapping("/sendMessage")
	public void receiveMessage(@Payload Message textMessageDTO) {
		// receive message from client
	}

	@SendTo("/topic/{channel}")
	public Message broadcastMessage(@Payload Message textMessageDTO) {
		return textMessageDTO;
	}
	
	@GetMapping("/{channel}/getAllMessages")
	public List<Message> fetchChannel(@PathVariable String channel) {
	// fetch channel with given id
		Optional<Channel> ch = channelRepo.findById(channel);
		System.out.println(ch);
	// return messages array from that channel
		return(ch.get().getMessages());
	}
	
	@GetMapping("/getChannelsList")
	public List<ChannelModel> getChannelsList() {
		List<ChannelModel> channels = getAllChannels();
	        return channels;
	}
	
	@PostMapping("/addChannel") 
	public String addChannel(@RequestBody ChannelModel newChannel) {
	
		List<ChannelModel> channels = getAllChannels();
		System.out.println(channels);
		System.out.println(newChannel);


		
		for(int i=0; i<channels.size(); i++) {
			if(channels.get(i).getChannel().equals(newChannel.getChannel())) {
				return "A channel with this name already exists";
			}
		}
		
		 
			List<Message> messages = new ArrayList<Message>();
			Channel ch = new Channel(newChannel.getChannel(), messages);
			channelRepo.save(ch);
			return "New channel created successfully!";
		
	}
	
	public List<ChannelModel> getAllChannels() {
		Aggregation aggregation = Aggregation.newAggregation(
	            Aggregation.project("_id")
	        );
	        AggregationResults<ChannelModel> result = mongoTemplate.aggregate(aggregation, "channel", ChannelModel.class);
	        List<ChannelModel> channels = result.getMappedResults();
	        return channels;
	}
}
