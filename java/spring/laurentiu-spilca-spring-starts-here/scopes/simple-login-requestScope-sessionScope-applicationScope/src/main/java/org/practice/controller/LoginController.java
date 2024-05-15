package org.practice.controller;

import org.practice.dto.LoginDTO;
import org.practice.service.LoginProcessorService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {
    private final LoginProcessorService loginProcessorService;

    public LoginController(LoginProcessorService loginProcessorService) {
        this.loginProcessorService = loginProcessorService;
    }

    @GetMapping
    public String loginGet() {
        return "login";
    }

    @PostMapping
    public String loginPost(LoginDTO loginDTO, Model model) {
        if (this.loginProcessorService.validateCredentials(loginDTO)) return "redirect:/secret";

        model.addAttribute("loginStatusMessage", "failed");
        model.addAttribute("loginStatusMessageCSSColor", "red;");

        return "login";
    }
}
