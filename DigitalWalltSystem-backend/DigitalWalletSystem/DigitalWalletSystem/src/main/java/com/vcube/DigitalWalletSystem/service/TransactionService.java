package com.vcube.DigitalWalletSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube.DigitalWalletSystem.model.Transaction;
import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.repository.TransactionRepository;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepo;

    // ✅ Save a transaction
    public Transaction saveTransaction(Transaction transaction) {
        log.info("Saving transaction: {} -> {} amount: {}", 
                 transaction.getFromUser().getUsername(),
                 transaction.getToUser().getUsername(),
                 transaction.getAmount());
        Transaction savedTransaction = transactionRepo.save(transaction);
        log.info("Transaction saved successfully with ID: {}", savedTransaction.getId());
        return savedTransaction;
    }

    // ✅ Get all transactions for a specific user
    public List<Transaction> getTransactionsByUser(User user) {
        log.info("Fetching transactions for user '{}'", user.getUsername());
        List<Transaction> sent = transactionRepo.findByFromUser(user);
        List<Transaction> received = transactionRepo.findByToUser(user);
        sent.addAll(received);
        log.info("Found {} total transactions for user '{}'", sent.size(), user.getUsername());
        return sent;
    }

    // ✅ Get all transactions (for Admin)
    public List<Transaction> getAllTransactions() {
        log.info("Fetching all transactions for admin view");
        return transactionRepo.findAll();
    }
}
