package com.shopsphere.user_service.exception;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String email) {
        super("email already registered: " + email);
    }
}
