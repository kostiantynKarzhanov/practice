package org.practice.controller;

import org.practice.model.Payment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.logging.Logger;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final Logger logger = Logger.getLogger(PaymentController.class.getName());

    @PostMapping
    public ResponseEntity<Payment> createPayment(
            @RequestHeader String requestId,
            @RequestBody Payment payment
    ) {
        this.logger.info(
                String.format(
                        "Payment service received payment: [ id=%s; amount=%f ]",
                        requestId,
                        payment.getAmount()
                )
        );

        payment.setId(UUID.randomUUID().toString());

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(payment);
    }

}
