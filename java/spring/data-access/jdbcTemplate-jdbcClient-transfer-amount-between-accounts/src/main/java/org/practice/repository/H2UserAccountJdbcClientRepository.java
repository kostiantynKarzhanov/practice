package org.practice.repository;

import org.practice.model.UserAccount;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Primary
@Repository
public class H2UserAccountJdbcClientRepository implements UserAccountDAO {
    private final JdbcClient jdbcClient;

    public H2UserAccountJdbcClientRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    @Override
    public List<UserAccount> findAllUserAccounts() {
        return this.jdbcClient
                .sql("SELECT * FROM user_account;")
                .query(UserAccount.class)
                .list();
    }

    @Override
    public List<UserAccount> findAllUserAccountsExcept(String username) {
        System.out.println("hello from JdbcClient repo");

        return this.jdbcClient
                .sql("SELECT * FROM user_account WHERE username != :username;")
                .param("username", username)
                .query(UserAccount.class)
                .list();
    }

    @Override
    public Optional<UserAccount> findUserAccount(String username) {
        return this.jdbcClient
                .sql("SELECT DISTINCT * FROM user_account WHERE username = :username;")
                .param("username", username)
                .query(UserAccount.class)
                .optional();
    }

    @Override
    public int updateBalance(String username, BigDecimal newBalance) {
        Map<String, Object> paramMap = new HashMap<>();

        paramMap.put("username", username);
        paramMap.put("newBalance", newBalance);

        return this.jdbcClient
                .sql("UPDATE user_account SET balance = :newBalance WHERE username = :username;")
                .params(paramMap)
                .update();
    }
}
