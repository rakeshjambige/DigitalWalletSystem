package com.vcube.DigitalWalletSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vcube.DigitalWalletSystem.model.Transaction;
import com.vcube.DigitalWalletSystem.model.User;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long>{
	
	List<Transaction> findByFromUser(User user);
	List<Transaction> findByToUser(User user);

}
