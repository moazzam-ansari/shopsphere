package com.shopsphere.product_service.exception;


public class InvalidCategoryException extends RuntimeException {
    public InvalidCategoryException(Long id) {
        super("Category doesn't exist with ID: " + id);
    }
}
