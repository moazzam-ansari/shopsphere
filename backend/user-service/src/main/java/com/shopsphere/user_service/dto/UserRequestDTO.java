package com.shopsphere.user_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    @NotNull(message = "Fisrt name is required")
    @Size(max = 50, message = "First name must be at most 50 character")
    private String firstName;

    @Size(max = 50, message = "Last name must be at most 50 character")
    private String lastName;

    @NotNull(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotNull(message = "Password is required")
    @Size(min = 8, max = 64, message = "Password must be 8 to 64 character")
    private String password;
}
