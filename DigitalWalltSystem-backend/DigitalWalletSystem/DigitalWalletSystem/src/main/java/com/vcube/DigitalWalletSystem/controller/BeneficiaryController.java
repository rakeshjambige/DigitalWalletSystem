package com.vcube.DigitalWalletSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.vcube.DigitalWalletSystem.model.Beneficiary;
import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.service.BeneficiaryService;
import com.vcube.DigitalWalletSystem.service.UserService;

import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/beneficiaries")
@CrossOrigin(origins = "*") // For production, replace '*' with frontend URL
@Log4j2
public class BeneficiaryController {

    @Autowired
    private BeneficiaryService beneficiaryService;

    @Autowired
    private UserService userService;

    // Add a new beneficiary for a user
    @PostMapping("/{username}/add")
    public ResponseEntity<Beneficiary> addBeneficiary(
            @PathVariable String username,
            @Valid @RequestBody Beneficiary beneficiary) {

        User user = userService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + username));

        log.info("Adding beneficiary '{}' for user '{}'", beneficiary.getNickname(), username);

        Beneficiary saved = beneficiaryService.addBeneficiary(user, beneficiary);

        log.info("Beneficiary '{}' added successfully", saved.getNickname());

        return ResponseEntity.ok(saved);
    }

    // Get all beneficiaries of a user
    @GetMapping("/{username}")
    public ResponseEntity<List<Beneficiary>> getBeneficiaries(@PathVariable String username) {

        User user = userService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + username));

        List<Beneficiary> beneficiaries = beneficiaryService.getBeneficiaries(user);

        log.info("Fetched {} beneficiaries for user '{}'", beneficiaries.size(), username);

        return ResponseEntity.ok(beneficiaries);
    }
}
