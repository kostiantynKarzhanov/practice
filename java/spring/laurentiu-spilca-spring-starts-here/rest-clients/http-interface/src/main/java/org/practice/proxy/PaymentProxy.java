package org.practice.proxy;

import org.practice.model.PaymentDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange(
        url = "/payment",
        contentType = "application/json"
)
public interface PaymentProxy {
    @PostExchange
    ResponseEntity<PaymentDTO> createPayment(
            @RequestHeader String requestId,
            @RequestBody PaymentDTO paymentDTO
    );
}
