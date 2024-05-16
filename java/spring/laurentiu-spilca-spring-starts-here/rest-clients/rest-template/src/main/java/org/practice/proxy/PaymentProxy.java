package org.practice.proxy;

import org.practice.model.PaymentDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;
import java.util.logging.Logger;

@Component
public class PaymentProxy {
    private final Logger logger = Logger.getLogger(PaymentProxy.class.getName());

    private final RestTemplate restTemplate;

    public PaymentProxy(@Qualifier("paymentRestTemplate") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<PaymentDTO> createPayment(PaymentDTO paymentDTO) {
        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.add(
                "requestId",
                UUID.randomUUID().toString()
        );

        this.logger.info("requestId header is set: " + httpHeaders.get("requestId"));

        HttpEntity<PaymentDTO> requestEntity = new HttpEntity<>(paymentDTO, httpHeaders);

        return this.restTemplate.exchange(
                "/payment",
                HttpMethod.POST,
                requestEntity,
                PaymentDTO.class
        );
    }
}
