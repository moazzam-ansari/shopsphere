package com.shopsphere.cart_service.serviceimpl;

import com.shopsphere.cart_service.client.ProductClient;
import com.shopsphere.cart_service.dto.*;
import com.shopsphere.cart_service.entity.CartItem;
import com.shopsphere.cart_service.exception.CartItemNotFoundException;
import com.shopsphere.cart_service.exception.InsufficientStockException;
import com.shopsphere.cart_service.exception.ProductNotFoundException;
import com.shopsphere.cart_service.exception.ProductUnavailableException;
import com.shopsphere.cart_service.mapper.CartItemMapper;
import com.shopsphere.cart_service.repository.CartItemRepository;
import com.shopsphere.cart_service.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductClient productClient;
    private final CartItemMapper cartItemMapper;


    public CartServiceImpl(CartItemRepository cartItemRepository, ProductClient productClient, CartItemMapper cartItemMapper) {
        this.cartItemRepository = cartItemRepository;
        this.productClient = productClient;
        this.cartItemMapper = cartItemMapper;
    }

    // Add product to cart
    @Override
    @Transactional
    public CartResponseDTO addToCart(Long userId, CartItemRequestDTO requestDTO) {

        // Find whether product exists and is active
        ProductDTO product = loadActiveProduct(requestDTO.getProductId());

        // Find existing cart item
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(userId, requestDTO.getProductId());

        // Calculate new quantity
        int newQuantity = existingItem
                .map(item -> item.getQuantity() + requestDTO.getQuantity())
                .orElse(requestDTO.getQuantity());

        // Check available stock
        checkStock(product, newQuantity);

        // Get existing item or create a new item
        CartItem item = existingItem.orElseGet(() -> cartItemMapper.toEntity(userId, requestDTO));

        // Update quantity
        item.setQuantity(newQuantity);

        // Save cart item
        cartItemRepository.save(item);

        // Return updated cart
        return buildCart(userId);
    }

    // Get complete cart of a user
    @Override
    @Transactional
    public CartResponseDTO getCart(Long userId) {
        return buildCart(userId);
    }

    // Update product quantity in cart
    @Override
    @Transactional
    public CartResponseDTO updateQuantity(Long userId, Long productId, CartItemUpdateRequestDTO requestDTO) {

        // Find cart item
        CartItem item = findItem(userId, productId);

        // Check product details
        ProductDTO product = loadActiveProduct(productId);

        // Check available stock
        checkStock(product, requestDTO.getQuantity());

        // Update quantity
        item.setQuantity(requestDTO.getQuantity());

        // Save update item
        cartItemRepository.save(item);

        // Return updated cart
        return buildCart(userId);
    }

    // Remove a specific product from cart
    @Override
    @Transactional
    public CartResponseDTO removeItem(Long userId, Long productId) {

        // Find product in user's cart
        CartItem item = findItem(userId, productId);

        // Delete product from cart
        cartItemRepository.delete(item);

        // Return updated cart
        return buildCart(userId);
    }

    // Remove all products from user's cart
    @Override
    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }


    // ---------HELPERS---------

    // Find specific cart item
    private CartItem findItem(Long userId, Long productId) {
        return cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new CartItemNotFoundException(userId, productId));
    }

    // Find product and check whether it is active
    private ProductDTO loadActiveProduct(Long productId) {

        ProductDTO product = productClient.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        if(!"ACTIVE".equals(product.getStatus())) {
            throw new ProductUnavailableException(productId);
        }

        return product;
    }

    // Check Whether requested quantity is available in stock
    private void checkStock(ProductDTO product, int wanted) {

        int availableStock = Optional.ofNullable(product.getProductStock()).orElse(0);

        if (wanted > availableStock) {
            throw new InsufficientStockException(product.getProductId(), availableStock);
        }
    }

    // Build complete cart response
    private CartResponseDTO buildCart(Long userId) {

        // Get all cart item of user
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);

        // Convert cart items into cart responseDTO
        List<CartItemResponseDTO> responseItems = cartItems.stream().map(item -> {
            // Get product details from product service
            Optional<ProductDTO> product = productClient.findById(item.getProductId());

            // Convert product and cart item into response
            return product.map(productDTO -> cartItemMapper.toItemResponse(item, productDTO))
                    .orElseGet(() -> cartItemMapper.toUnavailableItemResponse(item));
        }).toList();

        // Create complete cart response
        return cartItemMapper.toCartResponse(userId, responseItems);
    }
}
