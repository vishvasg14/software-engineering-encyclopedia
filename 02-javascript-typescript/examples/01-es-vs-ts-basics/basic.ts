// TypeScript
function add(a: number, b: number): number {
    return a + b;
}

// Type inference
const x = 42;        // x: number (inferred)
const arr = [1, 2];  // arr: number[]

const result: number = add(1, 2);
console.log('result:', result);