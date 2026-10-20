package com.shopsphere.category_service.serviceimpl;

import com.shopsphere.category_service.dto.CategoryRequestDTO;
import com.shopsphere.category_service.dto.CategoryResponseDTO;
import com.shopsphere.category_service.entity.Category;
import com.shopsphere.category_service.exception.CategoryNotFoundException;
import com.shopsphere.category_service.mapper.CategoryMapper;
import com.shopsphere.category_service.repository.CategoryRepository;
import com.shopsphere.category_service.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    // CREATE
    @Override
    public CategoryResponseDTO initiateCategory(CategoryRequestDTO request) {
        // RequestDTO -> enity
        Category category = categoryMapper.toEntity(request);

        // Save
        Category saveCategory = categoryRepository.save(category);

        // entity -> ResponseDTO
        return categoryMapper.toResponseDTO(saveCategory);
    }

    // GET BY ID
    @Override
    @Transactional(readOnly = true)
    public CategoryResponseDTO getCategoryById(Long categoryId) {

        return categoryMapper.toResponseDTO(findOrThrow(categoryId));
    }

    // GET BY NAME
    @Override
    @Transactional(readOnly = true)
    public CategoryResponseDTO getCategoryByName(String categoryName) {
        Category saveCategory = categoryRepository.findByCategoryName(categoryName)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with category name: " + categoryName));

        return categoryMapper.toResponseDTO(saveCategory);
    }

    // GET ALL
    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponseDTO> getAllCategory() {
        List<Category> saveCategory = categoryRepository.findAll();
        return saveCategory.stream().map(categoryMapper::toResponseDTO).toList();
    }

    // UPDATE
    @Override
    public CategoryResponseDTO updateCategory(Long categoryId, CategoryRequestDTO request) {
        Category category = findOrThrow(categoryId);

        category.setCategoryName(request.getCategoryName());
        category.setDescription(request.getDescription());

        Category updateCategory = categoryRepository.save(category);
        return categoryMapper.toResponseDTO(updateCategory);
    }

    // DELETE
    public void deleteCategory(Long categoryId) {
        categoryRepository.delete(findOrThrow(categoryId));
    }

    private Category findOrThrow(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with ID: " + categoryId));
    }
}
