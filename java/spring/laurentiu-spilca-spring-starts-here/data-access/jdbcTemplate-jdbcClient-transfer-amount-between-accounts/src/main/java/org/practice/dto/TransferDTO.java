package org.practice.dto;

import java.math.BigDecimal;

public record TransferDTO(BigDecimal amount, String userAccountName) {
}
