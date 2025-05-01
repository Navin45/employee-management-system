package com.fina_year_project.Ems_backend.security;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String jwtSecret = "secret_key";  // Ensure this secret key is long and secure
    private final int jwtExpirationMs = 86400000; // Default expiration time: 1 day (can be passed dynamically)

    // Generate a JWT token for a given username with a custom expiration time
    public String generateToken(String username, int expirationMs) {
        return Jwts.builder()
                .setSubject(username) // The Subject is typically the username
                .setIssuedAt(new Date())  // Time when token is created
                .setExpiration(new Date(new Date().getTime() + expirationMs)) // Expiration time
                .signWith(SignatureAlgorithm.HS512, jwtSecret)  // Sign with HS512 algorithm
                .compact();
    }

    // Default token generation with default expiration time
    public String generateToken(String username) {
        return generateToken(username, jwtExpirationMs);
    }

    // Extract username (subject) from the token
    public String getUsernameFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject(); // The subject in the token is the username
        } catch (JwtException | IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid JWT token", e); // Throw more specific exception
        }
    }

    // Validate if the JWT token is still valid
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token); // Parses and validates the token
            return true;  // Token is valid
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired");
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported");
        } catch (MalformedJwtException e) {
            System.out.println("JWT token is malformed");
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature");
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("Invalid JWT token");
        }
        return false; // If any exception occurs, the token is invalid
    }
}
