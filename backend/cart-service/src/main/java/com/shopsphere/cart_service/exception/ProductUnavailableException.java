package com.shopsphere.cart_service.exception;

public class ProductUnavailableException extends RuntimeException{
    public ProductUnavailableException(Long id) {
        super("Product is not available: " + id);
    }
}
