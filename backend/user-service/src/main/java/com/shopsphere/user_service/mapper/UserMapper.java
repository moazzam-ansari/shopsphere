package com.shopsphere.user_service.mapper;

import com.shopsphere.user_service.dto.UserRequestDTO;
import com.shopsphere.user_service.dto.UserResponseDTO;
import com.shopsphere.user_service.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    // Convert incoming request dto -> entity (Used when saving a new user)
    public User toEntity(UserRequestDTO dto, String encodedPassword) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(encodedPassword);
        return user;
    }

    // Convert entity -> response dto (Used when sending data back to client)

    public UserResponseDTO toResponse(User user) {
        return new UserResponseDTO(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.getStatus(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
