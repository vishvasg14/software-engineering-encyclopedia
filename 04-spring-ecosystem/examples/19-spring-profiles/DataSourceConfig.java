package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class DataSourceConfig {

    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        return new DataSource("h2:mem:dev", "sa", "");
    }

    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        return new DataSource(System.getenv("DB_URL"), System.getenv("DB_USER"), System.getenv("DB_PASSWORD"));
    }

    @Bean
    @Profile("test")
    public DataSource testDataSource() {
        return new DataSource("h2:mem:test", "sa", "");
    }
}

record DataSource(String url, String username, String password) {}