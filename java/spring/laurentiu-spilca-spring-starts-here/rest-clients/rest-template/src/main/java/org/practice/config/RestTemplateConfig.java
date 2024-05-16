package org.practice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
    @Bean("paymentRestTemplate")
    public RestTemplate restTemplate(
            @Value("${service.payment.url:http://localhost:8081/}") String baseUrl,
            RestTemplateBuilder restTemplateBuilder
    ) {
        return restTemplateBuilder.rootUri(baseUrl).build();
    }
}
