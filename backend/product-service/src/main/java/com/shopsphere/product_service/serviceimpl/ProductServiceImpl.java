package com.shopsphere.product_service.serviceimplementation;

import com.shopsphere.product_service.dto.ProductRequestDTO;
import com.shopsphere.product_service.dto.ProductResponseDTO;
import com.shopsphere.product_service.entity.Product;
import com.shopsphere.product_service.mapper.ProductMapper;
import com.shopsphere.product_service.repository.ProductRepository;
import com.shopsphere.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    // CREATE
    @Override
    public ProductResponseDTO initiateProduct(ProductRequestDTO requestDTO) {

        // Resquest DTO -> Entity
        Product product = productMapper.toEntity(requestDTO);

        // Save
        Product saveProduct = productRepository.save(product);

        // Entity -> Response DTO
        return productMapper.toResponseDTO(saveProduct);
    }

    // GET BY ID
    @Override
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not fount with ID: "+ id));

        return productMapper.toResponseDTO(product);
    }

    // GET ALL
    @Override
    public List<ProductResponseDTO> getAllProduct() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(productMapper::toResponseDTO).toList();
    }

    // UPDATE
    @Override
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setProductName(requestDTO.getProductName());
        product.setProductPrice(requestDTO.getProductPrice());
        product.setProductStock(requestDTO.getProductStock());

        Product updateProduct = productRepository.save(product);

        return productMapper.toResponseDTO(updateProduct);
    }

    // DELETE
    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        productRepository.delete(product);
    }
}
