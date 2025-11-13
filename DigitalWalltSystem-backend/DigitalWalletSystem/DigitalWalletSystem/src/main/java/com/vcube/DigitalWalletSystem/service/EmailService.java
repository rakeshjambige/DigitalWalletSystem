package com.vcube.DigitalWalletSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


//import com.twilio.Twilio;
//import com.twilio.rest.api.v2010.account.Message;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final String fromEmail;

    @Autowired
    public EmailService(JavaMailSender mailSender, 
                        @Value("${spring.mail.username}") String fromEmail) {
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);  // uses injected property
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

//    // Send SMS
//    public void sendSMS(String toPhoneNumber, String body) {
//        try {
//            Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
//            Message.creator(
//                    new com.twilio.type.PhoneNumber(toPhoneNumber),
//                    new com.twilio.type.PhoneNumber(twilioConfig.getPhoneNumber()),
//                    body
//            ).create();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    // Send notifications to both sender and receiver
//    public void notifyTransaction(String senderEmail, String senderPhone, String receiverEmail, String receiverPhone, double amount) {
//        String debitMsg = "Your account has been debited by " + amount + " in Digital Wallet.";
//        String creditMsg = "Your account has been credited by " + amount + " in Digital Wallet.";

        // Notify sender
//        sendEmail(senderEmail, "Amount Debited", debitMsg);
//        sendSMS(senderPhone, debitMsg);

        // Notify receiver
//        sendEmail(receiverEmail, "Amount Credited", creditMsg);
//        sendSMS(receiverPhone, creditMsg);
    }
//}
