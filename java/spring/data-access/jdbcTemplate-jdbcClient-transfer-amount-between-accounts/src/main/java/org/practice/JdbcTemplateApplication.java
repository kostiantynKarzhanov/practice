package org.practice;

import org.practice.controller.TransferController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class JdbcTemplateApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(JdbcTemplateApplication.class, args);

		System.out.println(context.getBean(TransferController.class).getClass().getName());
	}

}
