package org.practice;

import org.junit.jupiter.api.Test;
import org.practice.aspect.LoggerAspect;
import org.practice.controller.PaymentController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestClientApplicationTests {
	@Autowired
	private ApplicationContext applicationContext;

	@Test
	void shouldPassWhenContextAutowired() {
		assertNotNull(this.applicationContext);
	}

	@Test
	void shouldPassWhenRestClientBeanDefinedInContext() {
		assertNotNull(this.applicationContext.getBean("paymentRestClient"));
	}

	@Test
	void shouldPassWhenLoggerAspectDefinedInContext() {
		assertNotNull(this.applicationContext.getBean(LoggerAspect.class));
	}

}
