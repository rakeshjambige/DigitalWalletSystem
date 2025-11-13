package com.vcube.DigitalWalletSystem.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vcube.DigitalWalletSystem.model.WalletAccount;
import com.vcube.DigitalWalletSystem.service.TransactionService;
import com.vcube.DigitalWalletSystem.service.UserService;
import com.vcube.DigitalWalletSystem.service.WalletService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private WalletService walletService;

    @Autowired
    private TransactionService transactionService;
    

    // ✅ 1. View all users
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ✅ 2. View all transactions
    @GetMapping("/transactions")
    public ResponseEntity<?> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    // ✅ 3. Delete a user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

//    // ✅ 4. Update user balance (deposit or correction)
//    @PutMapping("/users/{id}/balance")
//    public ResponseEntity<String> updateUserBalance(@PathVariable Long id, @RequestParam double amount) {
//        userService.updateUserBalance(id, amount);
//        return ResponseEntity.ok("User balance updated successfully");
//    }

    @GetMapping("/wallets")
    public ResponseEntity<?> getAllWallets() {
        return ResponseEntity.ok(walletService.getAllWallets());
    }

    // ✅ 6. View a specific user's wallet
    @GetMapping("/wallets/{userId}")
    public ResponseEntity<?> getWalletByUserId(@PathVariable Long userId) {
        Optional<WalletAccount> walletOpt = walletService.getWalletByUserId(userId);

        if (walletOpt.isPresent()) {
            return ResponseEntity.ok(walletOpt.get());
        } else {
            return ResponseEntity.status(404).body("Wallet not found for user ID " + userId);
        }
    }

}
