// 17 — MongoDB storage and queries

// Insert sample documents
db.users.insertMany([
    {
        name: 'Alice',
        email: 'alice@example.com',
        address: { city: 'Springfield', zip: '12345' },
        tags: ['admin', 'active'],
        createdAt: new Date()
    },
    {
        name: 'Bob',
        email: 'bob@example.com',
        address: { city: 'Shelbyville', zip: '54321' },
        tags: ['user', 'active'],
        createdAt: new Date()
    },
    {
        name: 'Carol',
        email: 'carol@example.com',
        tags: ['user'],
        createdAt: new Date()
    }
]);

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ 'address.city': 1 });
db.users.createIndex({ tags: 1 });

// Find with operators
db.users.find({ 'address.city': 'Springfield' });
db.users.find({ tags: { $in: ['admin', 'active'] } });
db.users.find({ email: { $regex: /^alice/ } });

// Aggregation
db.users.aggregate([
    { $match: { tags: 'active' } },
    { $group: { _id: '$address.city', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]);

// Update with operators
db.users.updateOne(
    { name: 'Alice' },
    { $set: { 'address.zip': '99999' }, $addToSet: { tags: 'premium' } }
);

// Cleanup
db.users.drop();