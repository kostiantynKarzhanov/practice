package org.practice.proxy;

import org.practice.model.PaymentDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.UUID;
import java.util.logging.Logger;

@Component
public class PaymentProxy {
    private final Logger logger = Logger.getLogger(PaymentProxy.class.getName());

    private final WebClient webClient;

    public PaymentProxy(@Qualifier("paymentWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<ResponseEntity<PaymentDTO>> createPayment(PaymentDTO paymentDTO) {
        String requestId = UUID.randomUUID().toString();

        this.logger.info("requestId header is set: " + requestId);

        return this.webClient
                .post()
                .uri("/payment")
                .contentType(MediaType.APPLICATION_JSON)
                .header("requestId", requestId)
                .body(Mono.just(paymentDTO), PaymentDTO.class)
                .retrieve()
                .toEntity(PaymentDTO.class);
    }
}
