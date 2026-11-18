package com.shopsphere.product_service.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockAdjustRequestDTO {

    @NotNull(message = "Delta is required")
    @Min(value = -1000, message = "Delta must be at least -1000")
    @Max(value = 1000, message = "Delta must be at most 1000")
    private Integer delta;   // negative = reduce stock, positive = restore stock
}
