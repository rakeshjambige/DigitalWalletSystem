package com.vcube.DigitalWalletSystem.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.model.WalletAccount;
import com.vcube.DigitalWalletSystem.repository.UserRepository;
import com.vcube.DigitalWalletSystem.repository.WalletAccountRepository;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private WalletAccountRepository walletRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Register a new user and create wallet account
    public User registerUser(User user) {
        log.info("Attempting to register user with email '{}'", user.getEmail());

        if (userRepo.existsByEmail(user.getEmail())) {
            log.error("Registration failed: Email '{}' already registered", user.getEmail());
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        

        // Enforce default role
        user.setRole(User.Role.USER);

        // Save user
        User savedUser = userRepo.save(user);
        log.info("User '{}' registered successfully", savedUser.getUsername());

        // Create wallet account
        WalletAccount wallet = WalletAccount.builder()
                .user(savedUser)
                .balance(0.0)
                .status(WalletAccount.Status.ACTIVE)
                .createdAt(LocalDateTime.now())
                .accountNumber(generateAccountNumber())
                .build();

        walletRepo.save(wallet);
        log.info("Wallet account created for user '{}'", savedUser.getUsername());

        return savedUser;
    }

    private String generateAccountNumber() {
        return String.valueOf((long) (Math.random() * 1_000_000_000_000L));
    }

    // ✅ Find user by username
    public Optional<User> findByUsername(String name) {
        log.info("Searching for user by username '{}'", name);
        return userRepo.findByUsername(name);
    }

    // ✅ Find user by email
    public Optional<User> findByEmail(String email) {
        log.info("Searching for user by email '{}'", email);
        return userRepo.findByEmail(email);
    }

    // ✅ Find all users
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // ✅ Delete user by ID
    public void deleteUserById(Long id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            log.info("User with ID {} deleted by admin", id);
        } else {
            log.warn("Attempt to delete non-existent user ID {}", id);
        }
    }

    // ✅ Admin-only: manually adjust a user's balance
    public Optional<WalletAccount> updateUserBalance(Long userId, double amount) {
        Optional<WalletAccount> walletOpt = walletRepo.findByUserId(userId);
        if (walletOpt.isPresent()) {
            WalletAccount wallet = walletOpt.get();
            wallet.setBalance(wallet.getBalance() + amount); // ✅ use the instance

            walletRepo.save(wallet);
            log.info("Balance updated for user ID {} by {}", userId, amount);
            return Optional.of(wallet);
        } else {
            log.warn("Wallet not found for user ID {}", userId);
            return Optional.empty();
        }
    }
}
