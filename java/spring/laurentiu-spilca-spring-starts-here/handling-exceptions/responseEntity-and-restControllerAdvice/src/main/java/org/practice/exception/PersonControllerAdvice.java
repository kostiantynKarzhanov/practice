package org.practice.exception;

import org.practice.model.RestErrorDetail;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PersonControllerAdvice {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<RestErrorDetail> customExceptionHandler(CustomException CustomException) {
        RestErrorDetail restErrorDetail =
                new RestErrorDetail(CustomException.getMessage());

        return ResponseEntity
                .status(HttpStatus.I_AM_A_TEAPOT)
                .body(restErrorDetail);
    }

}
