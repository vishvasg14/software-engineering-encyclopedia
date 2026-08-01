'use strict';

const { EventEmitter } = require('events');

// Common memory leak: event listeners that are never removed

class LeakyServer extends EventEmitter {
    constructor() {
        super();
        // Simulating per-request handlers
        for (let i = 0; i < 100_000; i++) {
            // Each handler closes over `this` (the server) and `i`
            this.on('request', function handler() {
                return i + this.name;
            });
        }
        this.name = 'server';
    }
}

// Good practice: bound listeners, weak refs where appropriate
class FixedServer extends EventEmitter {
    handleRequest(reqId) {
        const handler = (data) => {
            // work
        };
        this.on('request', handler);
        // Cleanup pattern
        this.once('done', () => this.removeListener('request', handler));
    }
}

// Run the leak
const leaky = new LeakyServer();
console.log('listeners:', leaky.listenerCount('request'));

if (global.gc) {
    console.log('Before GC:', Math.round(process.memoryUsage().heapUsed / 1024 / 1024), 'MB');
    global.gc();
    console.log('After GC:', Math.round(process.memoryUsage().heapUsed / 1024 / 1024), 'MB');
    // Heap likely stays large — listeners are reachable via `this._events`
}

console.log('Inspect with heap snapshot to see the retained objects.');
console.log('Use --inspect to attach Chrome DevTools and take a snapshot.');