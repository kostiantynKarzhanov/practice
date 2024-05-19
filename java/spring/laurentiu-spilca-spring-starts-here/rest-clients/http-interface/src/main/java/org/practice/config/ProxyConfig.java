package org.practice.config;

import org.practice.proxy.PaymentProxy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class ProxyConfig {
    @Bean
    public PaymentProxy paymentProxy(@Value("${service.payment.url:http://localhost:8081/}") String baseUrl) {
//        RestClient restClient = RestClient.builder().baseUrl(baseUrl).build();
        RestClient restClient = RestClient.create(baseUrl);

        RestClientAdapter adapter = RestClientAdapter.create(restClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

        return factory.createClient(PaymentProxy.class);
    }
}
