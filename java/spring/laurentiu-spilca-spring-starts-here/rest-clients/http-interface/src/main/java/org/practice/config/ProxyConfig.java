package org.practice.config;

import org.practice.proxy.PaymentProxy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class ProxyConfig {
    @Primary
    @Bean
    public PaymentProxy paymentProxyRestClient(@Value("${service.payment.url:http://localhost:8081/}") String baseUrl) {
//        RestClient restClient = RestClient.builder().baseUrl(baseUrl).build();
        RestClient restClient = RestClient.create(baseUrl);

        RestClientAdapter adapter = RestClientAdapter.create(restClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

        return factory.createClient(PaymentProxy.class);
    }

    @Bean
    public PaymentProxy paymentProxyWebClient(@Value("${service.payment.url:http://localhost:8081/}") String baseUrl) {
//        WebClient webClient = WebClient.builder().baseUrl(baseUrl).build();
        WebClient webClient = WebClient.create(baseUrl);

        WebClientAdapter adapter = WebClientAdapter.create(webClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

        return factory.createClient(PaymentProxy.class);
    }
}
