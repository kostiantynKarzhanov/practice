package org.practice.service;

import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

@Service
@ApplicationScope
public class LoginCounterService {
    private int count;

    public void increment() {
        this.count++;
    }

    public int getCount() {
        return this.count;
    }
}
