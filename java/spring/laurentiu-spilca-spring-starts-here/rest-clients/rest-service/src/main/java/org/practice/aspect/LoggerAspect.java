package org.practice.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.practice.model.Payment;
import org.springframework.http.ResponseEntity;

import java.util.logging.Logger;


@Aspect
public class LoggerAspect {
    private final Logger logger = Logger.getLogger(LoggerAspect.class.getName());

    @Around("execution(* org.practice.controller.PaymentController.createPayment(..))")
    public ResponseEntity<Payment> log(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object[] args = proceedingJoinPoint.getArgs();
        String requestId = (String) args[0];
        Payment payment = (Payment) args[1];

        this.logger.info(
                String.format(
                        "Payment Service received payment with requestId header: %s and payment amount: %f",
                        requestId,
                        payment.getAmount()
                )
        );

        ResponseEntity<Payment> returnedValue = (ResponseEntity<Payment>) proceedingJoinPoint.proceed();

        this.logger.info("Payment Service sent response to client: " + returnedValue.getBody());

        return returnedValue;
    }
}
