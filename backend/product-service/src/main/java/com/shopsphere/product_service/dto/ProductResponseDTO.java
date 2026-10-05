package com.shopsphere.product_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private Long productId;
    private String productName;
    private BigDecimal productPrice;
    private Integer productStock;
    private Long productCategory;
    private String status;
    private LocalDateTime createdAt;
}
