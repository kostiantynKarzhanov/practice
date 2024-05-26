package org.practice.exception;

import org.practice.model.UserAccount;
import org.practice.service.LoggedUserManagementService;
import org.practice.service.UserAccountManagementService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class TransferControllerAdvice {
    private final LoggedUserManagementService loggedUserManagementService;
    private final UserAccountManagementService userAccountManagementService;

    public TransferControllerAdvice(
            LoggedUserManagementService loggedUserManagementService,
            UserAccountManagementService userAccountManagementService
    ) {
        this.loggedUserManagementService = loggedUserManagementService;
        this.userAccountManagementService = userAccountManagementService;
    }

    @ExceptionHandler(InsufficientBalanceException.class)
    public String insufficientBalanceExceptionHandler(
            InsufficientBalanceException insufficientBalanceException,
            Model model
    ) {
        String loggedUserName = this.loggedUserManagementService.getUsername();
        BigDecimal loggedUserBalance =
                this.userAccountManagementService.getUserAccountBalance(loggedUserName);

        List<String> userAccountNameList = this.userAccountManagementService
                .findAllUserAccountsExcept(loggedUserName)
                .stream()
                .map(UserAccount::username)
                .toList();

        Map<String, Object> modelAttributes = new HashMap<>();

        modelAttributes.put("loggedUserName", loggedUserName);
        modelAttributes.put("balance", loggedUserBalance);
        modelAttributes.put("userAccountNameList", userAccountNameList);
        modelAttributes.put("InsufficientBalanceException", insufficientBalanceException.getMessage());

        model.addAllAttributes(modelAttributes);

        return "transfer";
    }
}
