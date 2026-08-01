package com.example.lifecycle;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

@Component
public class Service implements InitializingBean, DisposableBean {

    public Service() {
        System.out.println("1. Constructor");
    }

    @PostConstruct
    public void postConstruct() {
        System.out.println("3. @PostConstruct");
    }

    @Override
    public void afterPropertiesSet() {
        System.out.println("4. InitializingBean.afterPropertiesSet()");
    }

    public void customInit() {
        System.out.println("5. Custom init-method (from @Bean)");
    }

    @PreDestroy
    public void preDestroy() {
        System.out.println("7. @PreDestroy");
    }

    @Override
    public void destroy() {
        System.out.println("8. DisposableBean.destroy()");
    }

    public void customDestroy() {
        System.out.println("9. Custom destroy-method");
    }
}