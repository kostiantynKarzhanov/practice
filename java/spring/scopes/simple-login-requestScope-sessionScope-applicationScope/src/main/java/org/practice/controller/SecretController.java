package org.practice.controller;

import org.practice.service.LoggedUserManagementService;
import org.practice.service.LoginCounterService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/secret")
public class SecretController {
    private final LoggedUserManagementService loggedUserManagementService;
    private final LoginCounterService loginCounterService;

    public SecretController(
            LoggedUserManagementService loggedUserManagementService,
            LoginCounterService loginCounterService
    ) {
        this.loggedUserManagementService = loggedUserManagementService;
        this.loginCounterService = loginCounterService;
    }

    @GetMapping
    public String secretGet(
            @RequestParam(required = false) String logout,
            Model model
    ) {
        if (logout != null) this.loggedUserManagementService.setUsername(null);

        String username = this.loggedUserManagementService.getUsername();

        if (username == null) return "redirect:/login";

        model.addAttribute("username", username);
        model.addAttribute("loginCountNumber", this.loginCounterService.getCount());

        return "secret";
    }
}
