package com.vcube.DigitalWalletSystem.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.model.WalletAccount;
import com.vcube.DigitalWalletSystem.repository.UserRepository;
import com.vcube.DigitalWalletSystem.repository.WalletAccountRepository;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class WalletService {

    @Autowired
    private WalletAccountRepository walletRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EmailService emailService;

    
//    not using this code beacause when user registers automatically wallet account will be create for user.
//    // Create wallet for a user
//    public WalletAccount createWallet(User user) {
//        WalletAccount wallet = new WalletAccount();
//        wallet.setUser(user);
//        wallet.setAccountNumber("ACCT-" + UUID.randomUUID().toString().substring(0, 8));
//        wallet.setBalance(0.0);
//
//        log.info("Creating wallet '{}' for user '{}'", wallet.getAccountNumber(), user.getUsername());
//        WalletAccount savedWallet = walletRepo.save(wallet);
//        log.info("Wallet '{}' created successfully for user '{}'", savedWallet.getAccountNumber(), user.getUsername());
//
//        return savedWallet;
//    }

    // Deposit Money
    public double deposit(User user, double amount) {
        WalletAccount wallet = walletRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        wallet.setBalance(wallet.getBalance() + amount);
        walletRepo.save(wallet);
        log.info("Deposited {} into wallet '{}'. New balance: {}", amount, wallet.getAccountNumber(), wallet.getBalance());

        // Send email notification
        emailService.sendEmail(
                user.getEmail(),
                "Digital Wallet - Amount Credited",
                "Hi " + user.getFullname() + ",\n\n" +
                        "Your wallet has been credited with amount: " + amount + ".\n" +
                        "Current Balance: " + wallet.getBalance() + "\n\n" +
                        "Thank you for using Digital Wallet."
        );

        return wallet.getBalance();
    }

    // Withdraw money
    public double withdraw(User user, double amount) {
        WalletAccount wallet = walletRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        if (wallet.getBalance() < amount) {
            log.error("Insufficient balance for wallet '{}' (current balance: {}, requested: {})",
                    wallet.getAccountNumber(), wallet.getBalance(), amount);
            throw new RuntimeException("Insufficient balance");
        }

        wallet.setBalance(wallet.getBalance() - amount);
        walletRepo.save(wallet);
        log.info("Withdrawn {} from wallet '{}'. New balance: {}", amount, wallet.getAccountNumber(), wallet.getBalance());

        // Send email notification
        emailService.sendEmail(
                user.getEmail(),
                "Digital Wallet - Amount Debited",
                "Hi " + user.getFullname() + ",\n\n" +
                        "Your wallet has been debited by amount: " + amount + ".\n" +
                        "Current Balance: " + wallet.getBalance() + "\n\n" +
                        "Thank you for using Digital Wallet."
        );

        return wallet.getBalance();
    }

    // Check balance
    public double checkBalance(User user) {
        WalletAccount wallet = walletRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));
        log.info("Balance check for wallet '{}': {}", wallet.getAccountNumber(), wallet.getBalance());
        return wallet.getBalance();
    }

    // Get all wallets
    public List<WalletAccount> getAllWallets() {
        return walletRepo.findAll();
    }

    // Get wallet by user ID
    public Optional<WalletAccount> getWalletByUserId(Long userId) {
        return walletRepo.findByUserId(userId);
    }

    // Transfer money between users
    public void transfer(User sender, User receiver, double amount) {
        if (sender.getId().equals(receiver.getId())) {
            throw new RuntimeException("Cannot transfer to self");
        }

        withdraw(sender, amount);   // withdraw sends email automatically
        deposit(receiver, amount);  // deposit sends email automatically

        log.info("Transfer of {} from {} to {} completed", amount, sender.getUsername(), receiver.getUsername());
    }
}
