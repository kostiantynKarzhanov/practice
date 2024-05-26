package org.practice.exception;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException() {
        this("Something happened. Account not found");
    }

    public AccountNotFoundException(String message) {
        super(message);
    }
}
