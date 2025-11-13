package com.vcube.DigitalWalletSystem.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vcube.DigitalWalletSystem.model.Transaction;
import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.service.TransactionService;
import com.vcube.DigitalWalletSystem.service.UserService;
import com.vcube.DigitalWalletSystem.service.WalletService;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*") // Allow all origins
public class TransactionController {

    private static final Logger log = LogManager.getLogger(TransactionController.class);

    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private WalletService walletService;
    
    @Autowired
    private UserService userService;

    // transfer money
    @PostMapping("/transfer")
    public ResponseEntity<?> transferMoney(
            @RequestParam String fromUser,
            @RequestParam String toUser,
            @RequestParam double amount) {

        User sender = userService.findByUsername(fromUser)
                .orElseThrow(() -> {
                    log.error("Sender not found: {}", fromUser);
                    return new RuntimeException("Sender not found: " + fromUser);
                });

        User receiver = userService.findByUsername(toUser)
                .orElseThrow(() -> {
                    log.error("Receiver not found: {}", toUser);
                    return new RuntimeException("Receiver not found: " + toUser);
                });

        // deduct and add balance
        walletService.withdraw(sender, amount);
        walletService.deposit(receiver, amount);

        // Record Transaction
        Transaction transaction = Transaction.builder()
                .transactiontype(Transaction.TransactionType.TRANSFER)
                .amount(amount)
                .fromUser(sender)
                .toUser(receiver)
                .description("Transfer from " + fromUser + " to " + toUser)
                .build();

        transactionService.saveTransaction(transaction);

        log.info("Transfer successful: {} -> {}, Amount: {}", fromUser, toUser, amount);
        return ResponseEntity.ok("Transfer Successful");
    }

    @GetMapping("/getTransactions/{username}")
    public ResponseEntity<?> getTransactions(@PathVariable String username) {

        User user = userService.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("User not found: {}", username);
                    return new RuntimeException("User not found: " + username);
                });

        log.info("Fetching transactions for user: {}", username);
        return ResponseEntity.ok(transactionService.getTransactionsByUser(user));
    }
}
