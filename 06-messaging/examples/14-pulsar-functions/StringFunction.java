package com.example.pulsar;

import org.apache.pulsar.functions.api.Context;
import org.apache.pulsar.functions.api.Function;

/**
 * Pulsar Function: converts input to uppercase.
 *
 * Deploy: pulsar-admin functions create --auto-ack true
 *   --jar target/functions-1.0.jar
 *   --className com.example.pulsar.StringFunction
 *   --inputs my-input-topic
 *   --output my-output-topic
 */
public class StringFunction implements Function<String, String> {

    @Override
    public String process(String input, Context context) {
        context.getLogger().info("Processing: " + input);
        if (input == null) return null;
        return input.toUpperCase();
    }
}