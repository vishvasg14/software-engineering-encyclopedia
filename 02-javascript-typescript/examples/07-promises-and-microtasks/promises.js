// Promise combinators

const fast = () => new Promise(r => setTimeout(() => r('fast'), 50));
const slow = () => new Promise(r => setTimeout(() => r('slow'), 100));
const failing = () => new Promise((_, rj) => setTimeout(() => rj(new Error('boom')), 75));

// Promise.all — rejects on first rejection
try {
    const [a, b] = await Promise.all([fast(), slow()]);
    console.log('all:', a, b);
} catch (e) {
    console.error('all rejected:', e.message);
}

// Promise.race — settles on first
try {
    const winner = await Promise.race([fast(), slow()]);
    console.log('race winner:', winner);
} catch (e) {
    console.error('race rejected:', e.message);
}

// Promise.allSettled — never rejects
const settled = await Promise.allSettled([fast(), failing()]);
console.log('allSettled:', settled.map(s => s.status));

// Promise.any — first fulfilled, or AggregateError if all reject
try {
    const first = await Promise.any([failing(), fast()]);
    console.log('any first:', first);
} catch (e) {
    console.error('any rejected:', e.constructor.name);
}

// Promise.withResolvers (ES2024)
const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(() => resolve('manual'), 50);
console.log('withResolvers:', await promise);