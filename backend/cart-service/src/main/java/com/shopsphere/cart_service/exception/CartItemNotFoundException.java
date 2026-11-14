package com.shopsphere.cart_service.exception;

public class CartItemNotFoundException extends RuntimeException {
    public CartItemNotFoundException(Long userId, Long productId) {
        super("Product " + productId + " in not in the cart of user " + userId);
    }
}
