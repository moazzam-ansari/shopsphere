package com.shopsphere.product_service.service;

import com.shopsphere.product_service.dto.ProductRequestDTO;
import com.shopsphere.product_service.dto.ProductResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    ProductResponseDTO initiateProduct(ProductRequestDTO requestDTO);
    ProductResponseDTO getProductById(Long id);
    List<ProductResponseDTO> getAllProduct();
    ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO);
    void deleteProduct(Long id);

    Page<ProductResponseDTO> getProducts(String search, Long categoryId, String status, Pageable pageable);
}
