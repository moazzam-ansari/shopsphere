package com.shopsphere.product_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Value("${category.service.url}")
    private String categoryServiceUrl;

    @Bean
    public RestClient categoryRestClient() {
        return RestClient.builder().baseUrl(categoryServiceUrl).build();
    }
}
