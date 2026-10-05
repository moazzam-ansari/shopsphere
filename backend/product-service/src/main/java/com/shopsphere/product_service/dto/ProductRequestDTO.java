package com.shopsphere.product_service.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {

    @NotBlank(message = "Name is required")
    private String productName;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    @Positive
    private BigDecimal productPrice;

    @NotNull(message = "Stock are required")
    @PositiveOrZero
    private Integer productStock;

    @NotNull(message = "productCategory is required")
    @PositiveOrZero
    private Long productCategory;

}
