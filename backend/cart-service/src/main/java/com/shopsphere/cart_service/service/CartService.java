package com.shopsphere.cart_service.service;

import com.shopsphere.cart_service.dto.CartItemRequestDTO;
import com.shopsphere.cart_service.dto.CartItemUpdateRequestDTO;
import com.shopsphere.cart_service.dto.CartResponseDTO;

public interface CartService {
    CartResponseDTO addToCart(Long userId, CartItemRequestDTO requestDTO);

    CartResponseDTO getCart(Long userId);

    CartResponseDTO updateQuantity(Long userId, Long productId, CartItemUpdateRequestDTO requestDTO);

    CartResponseDTO removeItem(Long userId, Long productId);

    void clearCart(Long userId);
}
