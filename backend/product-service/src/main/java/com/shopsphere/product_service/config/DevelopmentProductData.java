package com.shopsphere.product_service.config;

import com.shopsphere.product_service.entity.Product;
import com.shopsphere.product_service.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.math.BigDecimal;
import java.util.List;

/** Creates local catalogue records in the backend's embedded dev database. */
@Configuration
@Profile("dev")
public class DevelopmentProductData {

    @Bean
    CommandLineRunner loadDevelopmentProducts(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() != 0) {
                return;
            }

            productRepository.saveAll(List.of(
                    product("Aarunya Emerald Kanjeevaram", "38900", 8, 6),
                    product("Obsidian Tailored Velvet Blazer", "145000", 5, 2),
                    product("Saanjh Maroon Banarasi Silk", "34100", 10, 6),
                    product("Architectural Draped Silk Gown", "285000", 3, 1),
                    product("Imperial Royal Gold Bandhgala Suit", "180000", 4, 2),
                    product("Midnight Italian Tuxedo Jacket", "165000", 6, 2),
                    product("Celestial Embroidered Organza Gown", "340000", 2, 1),
                    product("Atelier Midnight Velvet Dress", "145000", 7, 3),
                    product("Sculpted Gold Stiletto Heels", "78000", 12, 5),
                    product("Mor Royal Gold Monogram Tote Bag", "45000", 9, 4)
            ));
        };
    }

    private Product product(String name, String price, int stock, long category) {
        Product product = new Product();
        product.setProductName(name);
        product.setProductPrice(new BigDecimal(price));
        product.setProductStock(stock);
        product.setProductCategory(category);
        return product;
    }
}
