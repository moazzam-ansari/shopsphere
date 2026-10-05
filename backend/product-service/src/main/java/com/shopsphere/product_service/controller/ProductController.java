package com.shopsphere.product_service.controller;

import com.shopsphere.product_service.dto.ProductRequestDTO;
import com.shopsphere.product_service.dto.ProductResponseDTO;
import com.shopsphere.product_service.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ProductResponseDTO initiateProduct(@Valid @RequestBody ProductRequestDTO requestDTO) {
        return productService.initiateProduct(requestDTO);
    }

    @GetMapping("/{id}")
    public ProductResponseDTO getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping
    public List<ProductResponseDTO> getAllProduct() {
        return productService.getAllProduct();
    }

    @PutMapping("/{id}")
    public ProductResponseDTO updateProduct(@PathVariable Long id,@Valid @RequestBody ProductRequestDTO requestDTO) {
        return productService.updateProduct(id, requestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
