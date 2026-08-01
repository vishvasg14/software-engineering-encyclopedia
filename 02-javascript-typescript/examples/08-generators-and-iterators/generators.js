// Generators and iterators

function* range(start, end) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}

// Use in for...of
for (const n of range(0, 5)) {
    console.log('range:', n);
}

// Fibonacci generator
function* fib() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const it = fib();
const first10 = [];
for (const n of it) {
    first10.push(n);
    if (first10.length === 10) break;
}
console.log('first 10 fib:', first10);

// Iterator protocol (manual)
const manual = {
    [Symbol.iterator]() {
        let i = 0;
        return {
            next() {
                i++;
                return i <= 3
                    ? { value: i, done: false }
                    : { value: undefined, done: true };
            },
        };
    },
};
console.log('manual:', [...manual]);