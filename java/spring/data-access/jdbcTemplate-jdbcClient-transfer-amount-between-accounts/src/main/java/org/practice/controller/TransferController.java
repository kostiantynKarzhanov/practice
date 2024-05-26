package org.practice.controller;

import org.practice.annotation.RedirectToLogin;
import org.practice.dto.TransferDTO;
import org.practice.exception.InsufficientBalanceException;
import org.practice.model.UserAccount;
import org.practice.service.LoggedUserManagementService;
import org.practice.service.TransferProcessorService;
import org.practice.service.UserAccountManagementService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/transfer")
public class TransferController {
    private final LoggedUserManagementService loggedUserManagementService;
    private final UserAccountManagementService userAccountManagementService;
    private final TransferProcessorService transferProcessorService;

    public TransferController(
            LoggedUserManagementService loggedUserManagementService,
            UserAccountManagementService userAccountManagementService,
            TransferProcessorService transferProcessorService
    ) {
        this.loggedUserManagementService = loggedUserManagementService;
        this.userAccountManagementService = userAccountManagementService;
        this.transferProcessorService = transferProcessorService;
    }

    @RedirectToLogin
    @GetMapping
    public String getTransferView(
            @RequestParam(required = false) String logout,
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

        model.addAllAttributes(modelAttributes);

        return "transfer";
    }

    @PostMapping
    public String transfer(TransferDTO transferDTO) throws InsufficientBalanceException {
        this.transferProcessorService.processTransfer(
                this.loggedUserManagementService.getUsername(),
                transferDTO.userAccountName(),
                transferDTO.amount()
        );

        return "redirect:/transfer";
    }
}
