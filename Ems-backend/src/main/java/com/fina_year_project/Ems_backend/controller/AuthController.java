package com.fina_year_project.Ems_backend.controller;

import com.fina_year_project.Ems_backend.dto.LoginRequest;
import com.fina_year_project.Ems_backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            // Generate the JWT token
            String token = jwtUtil.generateToken(authentication.getName());

            // Return the token
            return ResponseEntity.ok().body(token);
        } catch (Exception e) {
            // Handle failed authentication
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
