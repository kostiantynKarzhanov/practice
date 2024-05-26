package org.practice.service;

import org.practice.exception.AccountNotFoundException;
import org.practice.exception.InsufficientBalanceException;
import org.practice.model.UserAccount;
import org.practice.repository.UserAccountDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.function.Supplier;

@Service
public class TransferProcessorService {
    private final UserAccountDAO userAccountDAO;

    public TransferProcessorService(UserAccountDAO userAccountDAO) {
        this.userAccountDAO = userAccountDAO;
    }

    @Transactional
    public void processTransfer(String senderName, String receiverName, BigDecimal amount)
            throws InsufficientBalanceException {
        Optional<UserAccount> senderOptional = this.userAccountDAO.findUserAccount(senderName);
        Optional<UserAccount> receiverOptional = this.userAccountDAO.findUserAccount(receiverName);

        BigDecimal senderNewBalance = senderOptional
                .map(userAccount -> userAccount.balance().subtract(amount))
                .orElseThrow(() -> new AccountNotFoundException());

        if (senderNewBalance.compareTo(BigDecimal.ZERO) < 0) throw new InsufficientBalanceException();

        BigDecimal receiverNewBalance = receiverOptional
                .map(userAccount -> userAccount.balance().add(amount))
                .orElseThrow(AccountNotFoundException::new);

        this.userAccountDAO.updateBalance(senderName, senderNewBalance);
        this.userAccountDAO.updateBalance(receiverName, receiverNewBalance);
    }
}
