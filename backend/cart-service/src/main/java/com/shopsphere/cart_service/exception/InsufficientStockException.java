package com.shopsphere.cart_service.exception;

public class InsufficientStockException extends RuntimeException{
    public InsufficientStockException(Long id, int available) {
        super("Only " + available + " in stock for product " + id);
    }
}
