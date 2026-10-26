package com.shopsphere.product_service.serviceimpl;

import com.shopsphere.product_service.client.CategoryClient;
import com.shopsphere.product_service.dto.ProductRequestDTO;
import com.shopsphere.product_service.dto.ProductResponseDTO;
import com.shopsphere.product_service.entity.Product;
import com.shopsphere.product_service.exception.InvalidCategoryException;
import com.shopsphere.product_service.exception.ProductNotFoundException;
import com.shopsphere.product_service.mapper.ProductMapper;
import com.shopsphere.product_service.repository.ProductRepository;
import com.shopsphere.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    private final CategoryClient categoryClient;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper, CategoryClient categoryClient) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.categoryClient = categoryClient;
    }

    // CREATE
    @Override
    public ProductResponseDTO initiateProduct(ProductRequestDTO requestDTO) {

        // Resquest DTO -> Entity
        Product product = productMapper.toEntity(requestDTO);
        if (!categoryClient.exists(requestDTO.getProductCategory())) {
            throw new InvalidCategoryException(requestDTO.getProductCategory());
        }

        // Save
        Product saveProduct = productRepository.save(product);

        // Entity -> Response DTO
        return productMapper.toResponseDTO(saveProduct);
    }

    // GET BY ID
    @Override
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: "+ id));

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
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + id));

        if (!categoryClient.exists(requestDTO.getProductCategory())) {
            throw new InvalidCategoryException(requestDTO.getProductCategory());
        }

        product.setProductName(requestDTO.getProductName());
        product.setProductPrice(requestDTO.getProductPrice());
        product.setProductStock(requestDTO.getProductStock());
        product.setProductCategory(requestDTO.getProductCategory());

        Product updateProduct = productRepository.save(product);

        return productMapper.toResponseDTO(updateProduct);
    }

    // DELETE
    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + id));
        productRepository.delete(product);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponseDTO> getProducts(String search, Long categoryId, String status, Pageable pageable) {
        String s = (search == null || search.isBlank()) ? null : search.trim();
        return productRepository.search(s, categoryId, status, pageable)
                .map(productMapper::toResponseDTO);
    }
}
