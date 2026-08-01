'use strict';

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require('path');

if (isMainThread) {
    // Main thread: spawn workers
    const file = __filename;
    const N = 50_000_000;

    const w1 = new Worker(file, { workerData: { n: N } });
    const w2 = new Worker(file, { workerData: { n: N } });

    let results = 0;
    w1.on('message', (msg) => {
        console.log('worker 1:', msg);
        if (++results === 2) console.log('all done');
    });
    w2.on('message', (msg) => {
        console.log('worker 2:', msg);
        if (++results === 2) console.log('all done');
    });

    w1.on('error', console.error);
    w2.on('error', console.error);
    w1.on('exit', (code) => {
        if (code !== 0) console.error('worker 1 exited with code', code);
    });
    w2.on('exit', (code) => {
        if (code !== 0) console.error('worker 2 exited with code', code);
    });
} else {
    // Worker thread: do CPU-bound work
    let sum = 0;
    for (let i = 0; i < workerData.n; i++) {
        sum += Math.sqrt(i);
    }
    parentPort.postMessage(`computed sqrt sum up to ${workerData.n}: ${Math.round(sum)}`);
}