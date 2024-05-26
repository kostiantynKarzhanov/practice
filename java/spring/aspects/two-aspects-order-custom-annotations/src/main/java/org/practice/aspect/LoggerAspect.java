package org.practice.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.practice.model.Comment;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.logging.Logger;

@Aspect
@Order(2)
@Component
public class LoggerAspect {
    private final Logger logger = Logger.getLogger(LoggerAspect.class.getName());

    @Around("execution(* org.practice.service.CommentService.publishComment(..))")
    public String logAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String methodName = proceedingJoinPoint.getSignature().getName();
        Object[] methodArgs = proceedingJoinPoint.getArgs();

        this.logger.info("Before execution. \"" + methodName + "\" has arguments: " + Arrays.asList(methodArgs));

        Comment comment = new Comment("modifiedAuthor", "modifiedComment");
        Object[] modifiedArgs = {comment};

        var commentServiceReturnedValue = proceedingJoinPoint.proceed(modifiedArgs);

        this.logger.info("After execution. \"" + methodName + "\" has return value: \"" + commentServiceReturnedValue + "\"");

        return commentServiceReturnedValue + " MODIFIED in aspect";
    }

    @Before("@annotation(org.practice.config.ToLog)")
    public void logBefore() {
        this.logger.info("*** Before execution of the annotated method ***");
    }

    @After("@annotation(org.practice.config.ToLog)")
    public void logAfter() {
        this.logger.info("*** After execution of the annotated method ***");
    }

//    @AfterReturning(
//            value = "@annotation(org.practice.config.ToLog)",
//            returning = "returnedValue"
//    )
//    public void logAfterReturning(Object returnedValue) {
//        logger.info("*** AfterReturning execution of the annotated method. Returned value: " + returnedValue + " ***");
//    }
}
