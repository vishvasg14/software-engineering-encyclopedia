// 15 — Twitter timeline: full system design (TypeScript)

import express from 'express';

const app = express();

// === Storage layer ===

// Tweets table
// CREATE TABLE tweets (
//   id BIGSERIAL PRIMARY KEY,
//   user_id UUID NOT NULL,
//   content TEXT NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );

// Follows table
// CREATE TABLE follows (
//   follower_id UUID NOT NULL,
//   followee_id UUID NOT NULL,
//   PRIMARY KEY (follower_id, followee_id)
// );

// === Hydration strategy: hybrid (push for normal, pull for celebrities) ===

const CELEBRITY_THRESHOLD = 10000;  // > 10K followers = celebrity

// === Fanout service ===
async function fanoutOnTweet(tweetId: string, userId: string, content: string) {
    const followerCount = await getFollowerCount(userId);

    if (followerCount < CELEBRITY_THRESHOLD) {
        // Push to fan-out cache for each follower
        const followers = await getFollowers(userId);
        for (const follower of followers) {
            await redis.lPush(`timeline:${follower}`, JSON.stringify({
                id: tweetId,
                userId,
                content,
                createdAt: Date.now(),
            }));
            await redis.lTrim(`timeline:${follower}`, 0, 999);  // keep 1000 latest
        }
    }
    // For celebrities, pull at read time
}

// === Read timeline ===
async function getTimeline(userId: string, limit: number = 20) {
    // 1. Try cache first (push fill)
    const cached = await redis.lRange(`timeline:${userId}`, 0, limit - 1);
    if (cached.length >= limit) {
        return cached.map(JSON.parse);
    }

    // 2. Merge with celebrity tweets (pull)
    const followees = await getFollowees(userId);
    const celebrities = followees.filter((id) => /* is celebrity */ true);
    const celebrityTweets = await queryDatabase(
        `SELECT * FROM tweets
         WHERE user_id = ANY($1)
         ORDER BY created_at DESC LIMIT $2`,
        [celebrities, limit]
    );

    const cachedTweets = cached.map(JSON.parse);
    const merged = mergeAndSort(cachedTweets, celebrityTweets);

    // Backfill cache
    await redis.lPush(`timeline:${userId}`, ...JSON.stringify(merged));

    return merged.slice(0, limit);
}

function mergeAndSort(a: any[], b: any[]) {
    return [...a, ...b].sort((x, y) => y.createdAt - x.createdAt);
}

// === Mock DB / Redis ===
async function getFollowerCount(userId: string): Promise<number> { return 0; }
async function getFollowers(userId: string): Promise<string[]> { return []; }
async function getFollowees(userId: string): Promise<string[]> { return []; }
async function queryDatabase(sql: string, params: any[]): Promise<any[]> { return []; }

const redis = {
    lPush: async () => {},
    lRange: async () => [],
    lTrim: async () => {},
};

// === HTTP ===
app.get('/timeline/:userId', async (req, res) => {
    const timeline = await getTimeline(req.params.userId);
    res.json(timeline);
});

app.listen(3000);