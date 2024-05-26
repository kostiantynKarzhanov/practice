package org.practice.controller;

import org.practice.annotation.ToLog;
import org.practice.model.PaymentDTO;
import org.practice.proxy.PaymentProxy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;
import java.util.logging.Logger;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final Logger logger = Logger.getLogger(PaymentController.class.getName());
    private final PaymentProxy paymentProxy;

    public PaymentController(PaymentProxy paymentProxy) {
        this.paymentProxy = paymentProxy;
    }

    @ToLog
    @PostMapping
    public ResponseEntity<PaymentDTO> createPayment(
            @RequestBody PaymentDTO paymentDTO
    ) {
        String requestId = UUID.randomUUID().toString();
        this.logger.info("requestId header is set: " + requestId);

        return this.paymentProxy.createPayment(requestId, paymentDTO);
    }
}
