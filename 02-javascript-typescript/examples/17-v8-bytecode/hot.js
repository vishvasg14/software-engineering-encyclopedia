// Simple hot function for V8 to inspect

function sum(n) {
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += i;
    }
    return total;
}

// Warm up
sum(1_000_000);
sum(1_000_000);

console.log(sum(10));

// Run with:
// node --print-bytecode hot.js
// (V8 will print the bytecode for `sum`)