package org.practice.config;

import org.practice.aspect.RedirectAspect;
import org.practice.service.LoggedUserManagementService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
//@EnableAspectJAutoProxy
public class AspectConfig {
    @Bean
    public RedirectAspect redirectAspect(
            LoggedUserManagementService loggedUserManagementService
    ) {
        return new RedirectAspect(loggedUserManagementService);
    }
}
