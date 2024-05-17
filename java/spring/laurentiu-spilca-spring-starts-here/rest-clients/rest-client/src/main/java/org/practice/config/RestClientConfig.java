package org.practice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {
    @Bean("paymentRestClient")
    public RestClient restClient(@Value("${service.payment.url:http://localhost:8081/}") String baseUrl) {
        return RestClient.create(baseUrl);
    }
}
