package com.shopsphere.category_service.controller;

import com.shopsphere.category_service.dto.CategoryRequestDTO;
import com.shopsphere.category_service.dto.CategoryResponseDTO;
import com.shopsphere.category_service.serviceimpl.CategoryServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryServiceImpl categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> initiateCategory(@Valid @RequestBody CategoryRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.initiateCategory(request));
    }

    @GetMapping("/{categoryId}")
    public CategoryResponseDTO getCategoryById(@PathVariable Long categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

    @GetMapping("/name/{categoryName}")
    public CategoryResponseDTO getCategoryByName(@PathVariable String categoryName) {
        return categoryService.getCategoryByName(categoryName);
    }

    @GetMapping
    public List<CategoryResponseDTO> getAllCategory() {
        return categoryService.getAllCategory();
    }

    @PutMapping("/{categoryId}")
    public CategoryResponseDTO updateCategory(@Valid @PathVariable Long categoryId, @Valid @RequestBody CategoryRequestDTO request) {
        return categoryService.updateCategory(categoryId, request);
    }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}
