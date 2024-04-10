package com.ucaldas.mssecurity.services;

import com.ucaldas.mssecurity.Models.Permission;
import com.ucaldas.mssecurity.Models.Role;
import com.ucaldas.mssecurity.Models.RolePermission;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.PermissionRepository;
import com.ucaldas.mssecurity.Repositories.RolePermissionRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class ValidatorsService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolePermissionRepository rolePermissionRepository;

    private static final String BEARER_PREFIX = "Bearer ";

    public boolean validationRolePermission(HttpServletRequest request, String url, String method) {
        boolean success = false;
        User user = this.getUser(request);

        if (user != null) {
            Role role = user.getRole();
            System.out.println("Antes URL " + url + " metodo " + method);
            url = url.replaceAll("[0-9a-fA-F]{24}|\\d+", "?");
            System.out.println("URL " + url + " metodo " + method);

            try {
                Permission permission = permissionRepository.getPermission(url, method);
                if (role != null && permission != null) {
                    System.out.println("Rol " + role.getName() + " Permission " + permission.getUrl());
                    RolePermission rolePermission = rolePermissionRepository.getRolePermission(role.get_id(), permission.get_id());
                    if (rolePermission != null) {
                        success = true;
                    }
                }
            } catch (Exception e) {
                System.err.println("Error durante la validación de roles y permisos: " + e.getMessage());
            }
        }
        return success;
    }

    public User getUser(HttpServletRequest request) {
        User user = null;
        String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Header " + authorizationHeader);

        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER_PREFIX)) {
            String token = authorizationHeader.substring(BEARER_PREFIX.length());
            System.out.println("Bearer Token: " + token);
            User userFromToken = jwtService.getUserFromToken(token);
            System.out.println("User from token: " + userFromToken);

            if (userFromToken != null) {
                user = userRepository.findById(userFromToken.get_id()).orElse(null);
                if (user != null) {
                    user.setPassword("");
                }
            }
        }
        return user;
    }
}
