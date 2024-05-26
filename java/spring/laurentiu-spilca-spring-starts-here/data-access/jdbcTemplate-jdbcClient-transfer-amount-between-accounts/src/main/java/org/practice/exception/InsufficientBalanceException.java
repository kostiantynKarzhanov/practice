package org.practice.exception;

public class InsufficientBalanceException extends Throwable {
    public InsufficientBalanceException() {
        this("The balance is too low");
    }

    public InsufficientBalanceException(String message) {
        super(message);
    }
}
