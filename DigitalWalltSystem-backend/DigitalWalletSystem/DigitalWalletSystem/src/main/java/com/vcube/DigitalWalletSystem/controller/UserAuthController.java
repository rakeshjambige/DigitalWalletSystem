package com.vcube.DigitalWalletSystem.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vcube.DigitalWalletSystem.config.JwtUtil;
import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.service.UserService;

import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/authentication")
@CrossOrigin(origins = "*") // Allow all origins
@Log4j2
public class UserAuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

//    @PostMapping("/register")
//    public ResponseEntity<User> registerUser(@RequestBody User user) {
//        log.info("Registering new user '{}'", user.getUsername());
//        User savedUser = userService.registerUser(user);
//        log.info("User '{}' registered successfully", savedUser.getUsername());
//        return ResponseEntity.ok(savedUser);
//    }

    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        
        if (result.hasErrors()) {
            // Return first validation error message
            String errorMsg = result.getAllErrors().get(0).getDefaultMessage();
            log.warn("Registration failed: {}", errorMsg);
            return ResponseEntity.badRequest().body("Registration failed: " + errorMsg);
        }

        User savedUser = userService.registerUser(user);
        log.info("User '{}' registered successfully", savedUser.getUsername());
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Fetch full user safely from DB
            User user = userService.findByUsername(loginRequest.getUsername())
                                   .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate JWT
            String token = jwtUtil.generateToken(user);

            log.info("User '{}' logged in successfully", user.getUsername());
            return ResponseEntity.ok(token);
        } catch (Exception ex) {
            log.error("Login failed for user '{}': {}", loginRequest.getUsername(), ex.getMessage());
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping("/getUsers")
    public List<User> getUser() {
        return userService.getAllUsers();
    }
    
    @GetMapping("/getUsers/{username}")
    public ResponseEntity<?> checkUserExists(@PathVariable String username) {
        boolean exists = userService.findByUsername(username).isPresent();
        return ResponseEntity.ok(Map.of("exists", exists));
    }
}
