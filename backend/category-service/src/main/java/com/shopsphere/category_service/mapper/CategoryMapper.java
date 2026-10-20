package com.shopsphere.category_service.mapper;

import com.shopsphere.category_service.dto.CategoryRequestDTO;
import com.shopsphere.category_service.dto.CategoryResponseDTO;
import com.shopsphere.category_service.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    // Convert incoming requestDTO -> entity (use when saving a new product)
    public Category toEntity(CategoryRequestDTO request) {
        Category category = new Category();
        category.setCategoryName(request.getCategoryName());
        category.setDescription(request.getDescription());

        return category;
    }

    // Convert entity -> responseDTO (use when sending data back to the client)
    public CategoryResponseDTO toResponseDTO(Category category) {

        return new CategoryResponseDTO(
                category.getCategoryId(),
                category.getCategoryName(),
                category.getDescription(),
                category.getStatus(),
                category.getCreatedAt()
        );
    }
}
