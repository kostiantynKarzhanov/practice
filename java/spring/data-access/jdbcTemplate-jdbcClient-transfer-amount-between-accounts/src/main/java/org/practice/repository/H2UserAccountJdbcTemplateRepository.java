package org.practice.repository;

import org.practice.model.UserAccount;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public class H2UserAccountJdbcTemplateRepository implements UserAccountDAO {
    private final JdbcTemplate jdbcTemplate;
    private final UserAccountRowMapper userAccountRowMapper = new UserAccountRowMapper();

    public H2UserAccountJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<UserAccount> findAllUserAccounts() {
        String sql = "SELECT * FROM user_account;";

        return this.jdbcTemplate.query(sql, this.userAccountRowMapper);
    }

    @Override
    public List<UserAccount> findAllUserAccountsExcept(String username) {
        System.out.println("hello from JdbcClient repo");

        String sql = "SELECT * FROM user_account WHERE username != ?;";

        return this.jdbcTemplate.query(sql, this.userAccountRowMapper, username);
    }

    @Override
    public Optional<UserAccount> findUserAccount(String username) {
        String sql = "SELECT * FROM user_account WHERE username = ?;";

        try {
            UserAccount userAccount = this.jdbcTemplate
                    .queryForObject(sql, this.userAccountRowMapper, username);

            return Optional.of(userAccount);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public int updateBalance(String username, BigDecimal newBalance) {
        String sql = "UPDATE user_account SET balance = ? WHERE username = ?;";

        return this.jdbcTemplate.update(sql, newBalance, username);
    }
}
