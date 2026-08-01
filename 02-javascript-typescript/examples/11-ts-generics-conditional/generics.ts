// Generics

function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

console.log(first([1, 2, 3]));
console.log(first([]));

// Generic class
class Box<T> {
    constructor(private value: T) {}
    get(): T { return this.value; }
    map<U>(fn: (v: T) => U): Box<U> {
        return new Box(fn(this.value));
    }
}

const b = new Box(5).map(v => v * 2);
console.log('box:', b.get());

// Conditional types
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number

const x: A = 'hello';
const y: B = 42;
console.log('awaited:', x, y);

// Distributive conditional types
type ToArray<T> = T extends unknown ? T[] : never;
type StrOrNum = ToArray<string | number>; // string[] | number[]
const arr: StrOrNum = ['a', 'b'];
console.log('arr:', arr);