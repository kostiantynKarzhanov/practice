package org.practice.model;

import java.math.BigDecimal;

public record UserAccount(Long id, String username, String password, BigDecimal balance) {
}
