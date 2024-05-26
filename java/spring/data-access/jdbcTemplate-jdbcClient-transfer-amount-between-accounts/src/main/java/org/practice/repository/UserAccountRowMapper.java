package org.practice.repository;

import org.practice.model.UserAccount;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserAccountRowMapper implements RowMapper<UserAccount> {
    @Override
    public UserAccount mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new UserAccount(
                rs.getLong("id"),
                rs.getString("username"),
                rs.getString("password"),
                rs.getBigDecimal("balance")
        );
    }
}
