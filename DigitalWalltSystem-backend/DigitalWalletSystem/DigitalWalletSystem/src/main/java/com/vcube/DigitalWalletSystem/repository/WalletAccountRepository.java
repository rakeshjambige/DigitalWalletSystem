package com.vcube.DigitalWalletSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vcube.DigitalWalletSystem.model.User;
import com.vcube.DigitalWalletSystem.model.WalletAccount;

@Repository
public interface WalletAccountRepository extends JpaRepository<WalletAccount,Long>{
	
	Optional<WalletAccount> findByUser(User user);
	Optional<WalletAccount> findByAccountNumber(String accountNumber);
	 Optional<WalletAccount> findByUserUsername(String username);
	 Optional<WalletAccount> findByUserId(Long user_id);

}
