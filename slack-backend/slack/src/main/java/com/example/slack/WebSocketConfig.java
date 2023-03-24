package com.example.slack;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic");
		config.setApplicationDestinationPrefixes("/app");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// with sockjs
		registry.addEndpoint("/ws-message").setAllowedOriginPatterns("*").withSockJS();
		// without sockjs
		//registry.addEndpoint("/ws-message").setAllowedOriginPatterns("*");
	}
	
//	 @Override
//	    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
//	        registration.addDecoratorFactory(new WebSocketHandlerDecoratorFactory() {
//	            @Override
//	            public WebSocketHandler decorate(WebSocketHandler handler) {
//	                return new WebSocketHandlerDecorator(handler) {
//	                    @Override
//	                    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//	                        String origin = session.getHandshakeHeaders().getOrigin();
//	                        if (origin != null && origin.contains("localhost")) {
//	                            session.getAttributes().put("origin", origin);
//	                        }
//	                        super.afterConnectionEstablished(session);
//	                    }
//	                };
//	            }
//	        });
//	    }
//	
//	   @Override
//	   public void configureMessageBroker(MessageBrokerRegistry config) {
//	      config.enableSimpleBroker("/topic");
//	      config.setApplicationDestinationPrefixes("/app");
//	   }
//
//	   @Override
//	    public void registerStompEndpoints(StompEndpointRegistry registry) {
//	        registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
//	    }
//	   
//////	   @Override
////	   public void addCorsMappings(CorsRegistry registry) {
////	     registry.addMapping("/ws/info").allowedOrigins("*");
////	   }
//	   
//////	   @Override
////	    public void addCorsMappings(CorsRegistry registry) {
////	        registry.addMapping("/**")
////	                .allowedOrigins("*")
////	                .allowedMethods("GET", "POST", "PUT", "DELETE")
////	                .allowedHeaders("*")
////	                .exposedHeaders("Authorization")
////	                .allowCredentials(true)
////	                .maxAge(3600);
////	    }
	}