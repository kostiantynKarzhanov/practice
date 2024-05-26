package org.practice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestTemplateApplicationTests {
	@Autowired
	private ApplicationContext applicationContext;

	@Test
	void contextLoads() {
		assertNotNull(this.applicationContext);
	}

	@Test
	void shouldThrowNSBDException() {
//		assertThrows(
//				NoSuchBeanDefinitionException.class,
//				() -> this.applicationContext.getBean("restTemplate")
//		);

		assertThrows(
				NoSuchBeanDefinitionException.class,
				() -> this.applicationContext.getBean(RestTemplate.class)
		);
	}

	@Test
	void shouldPassWhenRestTemplateBuilderBeanExist() {
		assertNotNull(this.applicationContext.getBean(RestTemplateBuilder.class));
	}

}
