package org.practice.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.practice.service.LoggedUserManagementService;

@Aspect
public class RedirectAspect {
    private final LoggedUserManagementService loggedUserManagementService;

    public RedirectAspect(LoggedUserManagementService loggedUserManagementService) {
        this.loggedUserManagementService = loggedUserManagementService;
    }

    @Around("@annotation(org.practice.annotation.RedirectToLogin)")
    public String redirect(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object[] argList = proceedingJoinPoint.getArgs();

        String logout = (String) argList[0];

        if (logout != null) this.loggedUserManagementService.setUsername(null);
        if (this.loggedUserManagementService.getUsername() == null) return "redirect:/login";

        return (String) proceedingJoinPoint.proceed();
    }
}
