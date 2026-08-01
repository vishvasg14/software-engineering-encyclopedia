// 16 — Message queue: full system design (TypeScript)

interface Message {
    id: string;
    topic: string;
    partition: number;
    offset: number;
    key?: string;
    value: string;
    timestamp: number;
}

class Partition {
    private messages: Message[] = [];
    private offset = 0;

    append(key: string | undefined, value: string): Message {
        const msg: Message = {
            id: crypto.randomUUID(),
            topic: '',
            partition: 0,
            offset: this.offset++,
            key,
            value,
            timestamp: Date.now(),
        };
        this.messages.push(msg);
        return msg;
    }

    read(fromOffset: number, limit: number): Message[] {
        return this.messages.slice(fromOffset, fromOffset + limit);
    }

    size(): number {
        return this.messages.length;
    }
}

class Topic {
    private partitions: Partition[];

    constructor(name: string, numPartitions: number) {
        this.partitions = Array.from({ length: numPartitions }, () => new Partition());
    }

    partitionFor(key: string | undefined): number {
        if (!key) return Math.floor(Math.random() * this.partitions.length);
        // Simple hash partitioning
        let hash = 0;
        for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) | 0;
        return Math.abs(hash) % this.partitions.length;
    }

    produce(key: string | undefined, value: string): Message {
        const partition = this.partitions[this.partitionFor(key)];
        const msg = partition.append(key, value);
        msg.topic = `${partition}`;
        return msg;
    }

    consume(partitionId: number, fromOffset: number): Message[] {
        return this.partitions[partitionId].read(fromOffset, 100);
    }
}

class MessageQueue {
    private topics = new Map<string, Topic>();

    createTopic(name: string, numPartitions: number = 3): Topic {
        const topic = new Topic(name, numPartitions);
        this.topics.set(name, topic);
        return topic;
    }

    getTopic(name: string): Topic {
        return this.topics.get(name)!;
    }

    // === Producer ===
    produce(topicName: string, key: string | undefined, value: string) {
        return this.getTopic(topicName).produce(key, value);
    }

    // === Consumer (with consumer group offsets) ===
    consume(topicName: string, partitionId: number, fromOffset: number) {
        return this.getTopic(topicName).consume(partitionId, fromOffset);
    }
}

// === Use ===
const mq = new MessageQueue();
const orders = mq.createTopic('orders', 3);

// Producers
orders.produce('order-1', '{"item": "book", "qty": 1}');
orders.produce('order-2', '{"item": "pen", "qty": 5}');
orders.produce('order-1', '{"item": "laptop", "qty": 1}');

// Consumers (per partition)
for (let p = 0; p < 3; p++) {
    const msgs = orders.consume(p, 0);
    console.log(`Partition ${p}: ${msgs.length} messages`);
    for (const m of msgs) console.log(`  ${m.offset}: ${m.value}`);
}

// === Production concerns ===
// - Replication: each partition has N replicas (one leader, N-1 followers)
// - ISR: in-sync replicas
// - Retention: time-based, size-based
// - Compaction: keep latest per key
// - Consumer groups: offset per (group, topic, partition)
// - Delivery semantics: at-least-once (default), at-most-once (explicit), exactly-once (transactions)

console.log('Done');