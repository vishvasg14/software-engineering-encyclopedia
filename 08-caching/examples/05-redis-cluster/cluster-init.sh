# 05 — Redis Cluster setup

# Step 1: Start 6 Redis nodes (3 masters + 3 replicas)
for port in 7000 7001 7002 7003 7004 7005; do
    mkdir -p /tmp/redis-cluster/$port
    cat > /tmp/redis-cluster/$port/redis.conf <<EOF
port $port
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
appendonly yes
dir /tmp/redis-cluster/$port
daemonize yes
pidfile /tmp/redis-cluster/$port/redis.pid
logfile /tmp/redis-cluster/$port/redis.log
EOF
    redis-server /tmp/redis-cluster/$port/redis.conf
done

# Step 2: Create cluster
echo "yes" | redis-cli --cluster create \
    127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
    127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \
    --cluster-replicas 1

# Step 3: Verify
redis-cli -p 7000 cluster info
redis-cli -p 7000 cluster nodes

# Step 4: Use
redis-cli -c -p 7000 set foo bar
redis-cli -c -p 7000 get foo
redis-cli -c -p 7000 set {user:123}:profile "{name: alice}"
redis-cli -c -p 7000 set {user:123}:sessions "[s1, s2]"
# Both keys go to the same slot (hash tag user:123)

# Step 5: Reshard (if needed)
# redis-cli --cluster reshard 127.0.0.1:7000

# Step 6: Add a node
# redis-cli --cluster add-node 127.0.0.1:7006 127.0.0.1:7000