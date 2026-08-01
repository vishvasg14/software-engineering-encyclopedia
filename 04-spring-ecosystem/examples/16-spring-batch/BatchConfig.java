package com.example.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BatchConfig {

    @Bean
    public Job importJob(JobBuilderFactory jobBuilderFactory,
                         Step step,
                         StepBuilderFactory stepBuilderFactory) {
        return jobBuilderFactory.get("importJob")
            .start(step)
            .build();
    }

    @Bean
    public Step step(ItemReader<String> reader,
                     ItemProcessor<String, String> processor,
                     ItemWriter<String> writer,
                     StepBuilderFactory stepBuilderFactory) {
        return stepBuilderFactory.get("step")
            .<String, String>chunk(100)
            .reader(reader)
            .processor(processor)
            .writer(writer)
            .build();
    }
}