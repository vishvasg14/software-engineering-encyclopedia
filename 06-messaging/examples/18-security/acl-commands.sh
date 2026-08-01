# 18 — Kafka ACL examples

# Allow alice to read from orders topic
kafka-acls --bootstrap-server localhost:9092 \
    --add --allow-principal User:alice --operation Read --topic orders

# Allow bob to write to orders topic
kafka-acls --bootstrap-server localhost:9092 \
    --add --allow-principal User:bob --operation Write --topic orders

# Allow consumer group 'analytics' to read from all topics
kafka-acls --bootstrap-server localhost:9092 \
    --add --allow-principal User:analytics-service --operation Read \
    --topic '*' --group analytics

# List all ACLs
kafka-acls --bootstrap-server localhost:9092 --list

# Remove an ACL
kafka-acls --bootstrap-server localhost:9092 \
    --remove --allow-principal User:bob --operation Write --topic orders