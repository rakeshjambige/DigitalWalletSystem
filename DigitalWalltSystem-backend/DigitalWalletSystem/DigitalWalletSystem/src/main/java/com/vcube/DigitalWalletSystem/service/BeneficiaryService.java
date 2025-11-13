package com.vcube.DigitalWalletSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube.DigitalWalletSystem.model.Beneficiary;
import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.repository.BeneficiaryRepository;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class BeneficiaryService {

    @Autowired
    private BeneficiaryRepository beneficiaryRepo;

    // Add new beneficiary
    public Beneficiary addBeneficiary(User user, Beneficiary beneficiary) {
        log.info("Adding beneficiary '{}' for user '{}'", beneficiary.getNickname(), user.getUsername());
        beneficiary.setUser(user);
        Beneficiary saved = beneficiaryRepo.save(beneficiary);
        log.info("Beneficiary '{}' added successfully with ID: {}", saved.getNickname(), saved.getId());
        return saved;
    }

    // Get all beneficiaries of a user
    public List<Beneficiary> getBeneficiaries(User user) {
        List<Beneficiary> beneficiaries = beneficiaryRepo.findByUser(user);
        log.info("Fetched {} beneficiaries for user '{}'", beneficiaries.size(), user.getUsername());
        if (beneficiaries.isEmpty()) {
            log.warn("No beneficiaries found for user '{}'", user.getUsername());
        }
        return beneficiaries;
    }
}
