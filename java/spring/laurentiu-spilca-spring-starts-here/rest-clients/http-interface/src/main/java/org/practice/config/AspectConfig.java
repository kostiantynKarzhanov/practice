package org.practice.config;

import org.practice.aspect.LoggerAspect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
//@EnableAspectJAutoProxy
public class AspectConfig {
    @Bean
    public LoggerAspect loggerAspect() {
        return new LoggerAspect();
    }
}
