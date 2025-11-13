package com.vcube.DigitalWalletSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.DigitalWalletSystem.model.Beneficiary;
import com.vcube.DigitalWalletSystem.model.User;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary,Long>{
	
	List<Beneficiary> findByUser(User user);

}
