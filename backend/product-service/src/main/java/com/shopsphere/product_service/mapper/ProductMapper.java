package com.shopsphere.product_service.mapper;

import com.shopsphere.product_service.dto.ProductRequestDTO;
import com.shopsphere.product_service.dto.ProductResponseDTO;
import com.shopsphere.product_service.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    // Convert incoming request DTO -> entity (used when saving new product)
    public Product toEntity(ProductRequestDTO requestDTO) {
        Product product = new Product();
        product.setProductName(requestDTO.getProductName());
        product.setProductPrice(requestDTO.getProductPrice());
        product.setProductStock(requestDTO.getProductStock());
        product.setProductCategory(requestDTO.getProductCategory());

        return product;
    }

    // Convert entity -> response DTO (used when sending data back to the client)
    public ProductResponseDTO toResponseDTO(Product product) {
        return new ProductResponseDTO(
                product.getProductId(),
                product.getProductName(),
                product.getProductPrice(),
                product.getProductStock(),
                product.getProductCategory(),
                product.getStatus(),
                product.getCreatedAt()
        );
    }
}
