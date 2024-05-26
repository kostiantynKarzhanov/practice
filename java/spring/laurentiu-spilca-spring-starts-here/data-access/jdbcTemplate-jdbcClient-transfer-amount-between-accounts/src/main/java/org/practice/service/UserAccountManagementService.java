package org.practice.service;

import org.practice.exception.AccountNotFoundException;
import org.practice.model.UserAccount;
import org.practice.repository.UserAccountDAO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class UserAccountManagementService {
    private final UserAccountDAO userAccountDAO;

    public UserAccountManagementService(UserAccountDAO userAccountDAO) {
        this.userAccountDAO = userAccountDAO;
    }

    public List<UserAccount> findAllUserAccounts() {
        return this.userAccountDAO.findAllUserAccounts();
    }

    public List<UserAccount> findAllUserAccountsExcept(String username) {
        return this.userAccountDAO.findAllUserAccountsExcept(username);
    }

    public Optional<UserAccount> findUserAccount(String username) {
        return this.userAccountDAO.findUserAccount(username);
    }
    
    public BigDecimal getUserAccountBalance(String username) {
        Optional<UserAccount> userAccountOptional = this.findUserAccount(username);

        return userAccountOptional
                .map(UserAccount::balance)
                .orElseThrow(AccountNotFoundException::new);
    }
}
