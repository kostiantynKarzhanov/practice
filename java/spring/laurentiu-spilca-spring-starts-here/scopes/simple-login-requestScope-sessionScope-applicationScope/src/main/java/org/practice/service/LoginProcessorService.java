package org.practice.service;

import org.practice.dto.LoginDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import java.util.HashMap;
import java.util.Map;

@Service
@RequestScope
public class LoginProcessorService {
    private final LoggedUserManagementService loggedUserManagementService;
    private final LoginCounterService loginCounterService;

    public LoginProcessorService(
            LoggedUserManagementService loggedUserManagementService,
            LoginCounterService loginCounterService
    ) {
        this.loggedUserManagementService = loggedUserManagementService;
        this.loginCounterService = loginCounterService;
    }

    public boolean validateCredentials(LoginDTO loginDTO) {
        this.loginCounterService.increment();

        Map<String, String> registeredUsersMap = new HashMap<>();

        registeredUsersMap.put("test1", "test1");
        registeredUsersMap.put("test2", "test2");

        boolean isCredentialsValid = registeredUsersMap.containsKey(loginDTO.username()) &&
                registeredUsersMap.get(loginDTO.username()).equals(loginDTO.password());

        if (isCredentialsValid) this.loggedUserManagementService.setUsername(loginDTO.username());

        return isCredentialsValid;
    }
}
