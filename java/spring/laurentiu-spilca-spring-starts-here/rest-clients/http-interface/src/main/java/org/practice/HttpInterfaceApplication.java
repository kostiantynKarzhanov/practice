package org.practice;

import org.practice.controller.PaymentController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class HttpInterfaceApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(HttpInterfaceApplication.class, args);

		System.out.println(context.getBean(PaymentController.class).getClass().getName());
	}

}
