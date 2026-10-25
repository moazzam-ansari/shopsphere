package com.shopsphere.product_service.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class CategoryClient {

    private final RestClient categoryRestClient;

    public boolean exists(Long categoryId) {
        try {
            categoryRestClient.get()
                    .uri("/api/categories/{id}", categoryId)
                    .retrieve()
                    .toBodilessEntity();
            return true;
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        }
    }
}
