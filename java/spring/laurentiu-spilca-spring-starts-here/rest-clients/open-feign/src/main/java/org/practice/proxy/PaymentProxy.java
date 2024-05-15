package org.practice.proxy;

import org.practice.dto.PaymentDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(
        name = "paymentService",
        url = "${service.payment.url}"
)
public interface PaymentProxy {
    @PostMapping("/payment")
    ResponseEntity<PaymentDTO> createPayment(
            @RequestHeader String requestId,
            @RequestBody PaymentDTO paymentDTO
    );
}
