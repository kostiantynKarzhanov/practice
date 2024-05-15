package org.practice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(Application.class, args);
//
//		System.out.println(context.getBean(LoginCounterService.class));
//
//		for (String beanName : context.getBeanNamesForType(LoginCounterService.class)) {
//			System.out.println(beanName);
//		}
	}

}
