package org.practice.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Aspect
@Order(1)
@Component
public class SecurityAspect {
    private final Logger logger = Logger.getLogger(SecurityAspect.class.getName());

    @Around("@annotation(org.practice.config.ToSecure)")
    public void secureAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        this.logger.info("SecurityAspect. Before execution: " + proceedingJoinPoint.getSignature().getName());

        proceedingJoinPoint.proceed();

        this.logger.info("SecurityAspect. After execution: " + proceedingJoinPoint.getSignature().getName());
    }
}
