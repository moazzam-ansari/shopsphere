package com.shopsphere.product_service.service;

import com.shopsphere.product_service.entity.Product;

import java.util.List;

public interface ProductService {
    Product initiateProduct(Product product);
    Product getProductById(Long id);
    List<Product> getAllProduct();
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
}
