package org.practice.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@ComponentScan(basePackages = {"org.practice.service", "org.practice.aspect"})
@EnableAspectJAutoProxy
public class ApplicationConfig {
}
