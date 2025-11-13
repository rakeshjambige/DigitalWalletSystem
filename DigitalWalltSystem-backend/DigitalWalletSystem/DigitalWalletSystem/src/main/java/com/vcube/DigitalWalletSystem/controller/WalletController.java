package com.vcube.DigitalWalletSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.service.UserService;
import com.vcube.DigitalWalletSystem.service.WalletService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "*") // Allow all origins
@Log4j2
public class WalletController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private WalletService walletService;
	
	@PostMapping("/deposit/{username}")
	public ResponseEntity<?> deposit(@PathVariable String username, @RequestParam double amount){
		User user = userService.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
		
		log.info("Depositing amount {} for user '{}'", amount, username);
		double balance = walletService.deposit(user, amount);
		log.info("Deposit successful. New Balance for user '{}': {}", username, balance);
		
		return ResponseEntity.ok("Deposit successful. New Balance: " + balance);
	}
	
	@PostMapping("/withdraw/{username}")
	public ResponseEntity<?> withdraw(@PathVariable String username, @RequestParam double amount) {
	    User user = userService.findByUsername(username)
	        .orElseThrow(() -> new RuntimeException("User not found"));

	    log.info("Withdrawing amount {} for user '{}'", amount, username);
	    double balance = walletService.withdraw(user, amount);
	    log.info("Withdrawal successful. New Balance for user '{}': {}", username, balance);

	    return ResponseEntity.ok("Withdrawal successful. New Balance: " + balance);
	}


	@GetMapping("/balance/{username}")
	public ResponseEntity<?> checkBalance(@PathVariable String username){
		User user = userService.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
		
		double balance = walletService.checkBalance(user);
		log.info("Checked balance for user '{}': {}", username, balance);
		
		return ResponseEntity.ok("Current Balance: " + balance);
	}
}
