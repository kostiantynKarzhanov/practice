package org.practice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class RestTemplateApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(RestTemplateApplication.class, args);
	}

}
