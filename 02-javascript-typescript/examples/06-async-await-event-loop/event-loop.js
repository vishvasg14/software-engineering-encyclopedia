// Event loop ordering

console.log('1'); // sync

setTimeout(() => console.log('2'), 0); // macrotask

Promise.resolve().then(() => console.log('3')); // microtask

queueMicrotask(() => console.log('4')); // microtask

console.log('5'); // sync

// Output:
// 1 (sync)
// 5 (sync)
// 3 (microtask)
// 4 (microtask)
// 2 (macrotask, after all microtasks drain)