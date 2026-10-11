package com.shopsphere.user_service.service;

import com.shopsphere.user_service.dto.UserRequestDTO;
import com.shopsphere.user_service.dto.UserResponseDTO;
import com.shopsphere.user_service.dto.UserUpdateRequestDTO;

import java.util.List;

public interface UserService {
    UserResponseDTO createUser(UserRequestDTO request);
    UserResponseDTO getUserById(Long id);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUser(Long id, UserUpdateRequestDTO request);
    void deleteUser(Long id);
}
