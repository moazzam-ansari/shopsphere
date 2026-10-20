package com.shopsphere.category_service.service;

import com.shopsphere.category_service.dto.CategoryRequestDTO;
import com.shopsphere.category_service.dto.CategoryResponseDTO;
import com.shopsphere.category_service.entity.Category;

import java.util.List;

public interface CategoryService {
    CategoryResponseDTO initiateCategory(CategoryRequestDTO request);
    CategoryResponseDTO getCategoryById(Long categoryId);
    CategoryResponseDTO getCategoryByName(String categoryName);
    List<CategoryResponseDTO> getAllCategory();
    CategoryResponseDTO updateCategory(Long categoryId, CategoryRequestDTO request);
    void deleteCategory(Long categoryId);
}
