package com.shopsphere.cart_service.controller;

import com.shopsphere.cart_service.dto.CartItemRequestDTO;
import com.shopsphere.cart_service.dto.CartItemUpdateRequestDTO;
import com.shopsphere.cart_service.dto.CartResponseDTO;
import com.shopsphere.cart_service.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart/{userId}")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponseDTO> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponseDTO> addToCart(@PathVariable Long userId, @Valid @RequestBody CartItemRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addToCart(userId, requestDTO));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<CartResponseDTO> updateQuantity(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @Valid @RequestBody CartItemUpdateRequestDTO requestDTO) {
        return ResponseEntity.ok(cartService.updateQuantity(userId, productId, requestDTO));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<CartResponseDTO> removeItem(@PathVariable Long userId, @PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeItem(userId, productId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}

