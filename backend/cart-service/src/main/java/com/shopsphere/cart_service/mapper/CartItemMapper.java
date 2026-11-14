package com.shopsphere.cart_service.mapper;

import com.shopsphere.cart_service.dto.CartItemRequestDTO;
import com.shopsphere.cart_service.dto.CartItemResponseDTO;
import com.shopsphere.cart_service.dto.CartResponseDTO;
import com.shopsphere.cart_service.dto.ProductDTO;
import com.shopsphere.cart_service.entity.CartItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class CartItemMapper {

    // Convert incoming requestDTO -> entity (use when saving a new cart item)
    public CartItem toEntity(Long userId, CartItemRequestDTO requestDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setUserId(userId);
        cartItem.setProductId(requestDTO.getProductId());
        cartItem.setQuantity(requestDTO.getQuantity());

        return cartItem;
    }

    // Convert cart item entity -> responseDTO (use when sending data back to the client)
    public CartItemResponseDTO toItemResponse(CartItem item, ProductDTO product) {

        BigDecimal unitPrice = product.getProductPrice();

        // Check if product price is unavailable
        if (unitPrice == null) {
            unitPrice = BigDecimal.ZERO;
        }

        // Calculate product total price
        BigDecimal lineTotal = unitPrice.multiply(
                BigDecimal.valueOf(item.getQuantity())
        );

        int stock = product.getProductStock();

        // Check product stock
        if (product.getProductStock() == null) {
            stock = 0;
        }

        // Check the product status
        boolean available = false;
        if ("ACTIVE".equals(product.getStatus())) {
            available = true;
        }

        return new CartItemResponseDTO(
                product.getProductId(),
                product.getProductName(),
                unitPrice,
                item.getQuantity(),
                lineTotal,
                stock,
                available
        );
    }

    // Return response when product is unavailable
    public CartItemResponseDTO toUnavailableItemResponse(CartItem item) {
        return new CartItemResponseDTO(
                item.getProductId(),
                "Unavailable product",
                BigDecimal.ZERO,
                item.getQuantity(),
                BigDecimal.ZERO,
                0,
                false
        );
    }

    // Convert all cart items into complete cart response
    public CartResponseDTO toCartResponse(Long userId, List<CartItemResponseDTO> items) {

        BigDecimal totalAmount = BigDecimal.ZERO;

        int totalItems = 0;

        // Calculate total amount and total quantity
        for (CartItemResponseDTO item : items) {
            if (item.isAvailable()) {
                totalAmount = totalAmount.add(item.getLineTotal());
            }

            totalItems = totalItems + item.getQuantity();
        }

        return new CartResponseDTO(
                userId,
                items,
                totalItems,
                totalAmount
        );
    }
}
