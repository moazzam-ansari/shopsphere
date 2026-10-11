package com.shopsphere.user_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequestDTO {

    @NotBlank(message = "First name is required")
    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;
}
