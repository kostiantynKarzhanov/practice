package org.practice.repository;

import org.practice.model.UserAccount;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface UserAccountDAO {
    List<UserAccount> findAllUserAccounts();

    List<UserAccount> findAllUserAccountsExcept(String username);

    Optional<UserAccount> findUserAccount(String username);

    int updateBalance(String username, BigDecimal newBalance);
}
