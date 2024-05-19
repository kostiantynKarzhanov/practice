package org.practice.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.practice.model.PaymentDTO;
import org.springframework.http.ResponseEntity;

import java.util.logging.Logger;

@Aspect
public class LoggerAspect {
    private final Logger logger = Logger.getLogger(LoggerAspect.class.getName());

    @Around("@annotation(org.practice.annotation.ToLog)")
    public ResponseEntity<PaymentDTO> log(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        this.logger.info(
                "payment received from the client and is going to be send further to Payment Service"
        );

        ResponseEntity<PaymentDTO> returnedValue =
                (ResponseEntity<PaymentDTO>) proceedingJoinPoint.proceed();

        this.logger.info("Payment Service response received and is going to be send further to client: " + returnedValue.getBody());

        return returnedValue;
    }
}
