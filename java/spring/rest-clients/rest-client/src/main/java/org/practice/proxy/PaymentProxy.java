package org.practice.proxy;

import org.practice.model.PaymentDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.UUID;
import java.util.logging.Logger;

@Component
public class PaymentProxy {
    private final Logger logger = Logger.getLogger(PaymentProxy.class.getName());

    private final RestClient restClient;

    public PaymentProxy(@Qualifier("paymentRestClient") RestClient restClient) {
        this.restClient = restClient;
    }

    public ResponseEntity<PaymentDTO> createPayment(PaymentDTO paymentDTO) {
        String requestId = UUID.randomUUID().toString();

        this.logger.info("requestId header is set: " + requestId);

        return this.restClient
                .post()
                .uri("/payment")
                .contentType(MediaType.APPLICATION_JSON)
                .header("requestId", requestId)
                .body(paymentDTO)
                .retrieve()
                .toEntity(PaymentDTO.class);
    }
}
