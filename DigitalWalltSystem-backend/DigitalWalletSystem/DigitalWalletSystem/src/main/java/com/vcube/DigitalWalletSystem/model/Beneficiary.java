package com.vcube.DigitalWalletSystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "beneficiaries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Beneficiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nickname is required")
    private String nickname;

    @NotBlank(message = "Account number is required")
    @Column(nullable = false)
    private String beneficiaryAccountNumber;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
