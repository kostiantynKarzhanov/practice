package org.practice.service;

import org.practice.dto.LoginDTO;
import org.practice.model.UserAccount;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import java.util.Optional;

@Service
@RequestScope
public class LoginProcessorService {
    private final LoggedUserManagementService loggedUserManagementService;
    private final UserAccountManagementService userAccountManagementService;

    public LoginProcessorService(
            LoggedUserManagementService loggedUserManagementService,
            UserAccountManagementService userAccountManagementService
    ) {
        this.loggedUserManagementService = loggedUserManagementService;
        this.userAccountManagementService = userAccountManagementService;
    }

    public boolean validateCredentials(LoginDTO loginDTO) {
        Optional<UserAccount> userAccountOptional =
                this.userAccountManagementService.findUserAccount(loginDTO.username());

        return userAccountOptional.map(userAccount -> {
            boolean isLoggedIn = false;

            if (loginDTO.password().equals(userAccount.password())) {
                this.loggedUserManagementService.setUsername(userAccount.username());

                isLoggedIn = true;
            }

            return isLoggedIn;
        }).orElse(false);
    }
}
