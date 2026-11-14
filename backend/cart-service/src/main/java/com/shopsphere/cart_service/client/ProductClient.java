package com.shopsphere.cart_service.client;

import com.shopsphere.cart_service.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.Optional;

@Component
public class ProductClient {

    private final RestClient restClient;

    public ProductClient(
            @Value("${product.service.url}") String productServiceUrl) {
        this.restClient = RestClient.builder().baseUrl(productServiceUrl).build();
    }

    public Optional<ProductDTO> findById(Long productId) {
        try {
            return Optional.ofNullable(restClient.get()
                    .uri("/api/products/{id}", productId)
                    .retrieve()
                    .body(ProductDTO.class));
        }
        catch (HttpClientErrorException.NotFound e) {
            return Optional.empty();
        }
    }

    public boolean productExists(Long productId) {
        return findById(productId).isPresent();
    }
}
