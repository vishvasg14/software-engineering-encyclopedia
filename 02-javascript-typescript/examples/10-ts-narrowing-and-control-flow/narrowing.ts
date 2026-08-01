// Type narrowing

function fmt(value: string | number) {
    if (typeof value === 'string') {
        return value.toUpperCase(); // narrowed to string
    }
    return value.toFixed(2); // narrowed to number
}

console.log(fmt('hello'));
console.log(fmt(3.14159));

// Discriminated union
type Shape =
    | { kind: 'circle'; r: number }
    | { kind: 'rect'; w: number; h: number };

function area(s: Shape): number {
    switch (s.kind) {
        case 'circle': return Math.PI * s.r ** 2;
        case 'rect':   return s.w * s.h;
    }
}

console.log('circle:', area({ kind: 'circle', r: 1 }));
console.log('rect:', area({ kind: 'rect', w: 2, h: 3 }));

// Type predicate (user-defined guard)
function isString(x: unknown): x is string {
    return typeof x === 'string';
}

const items: unknown[] = [1, 'two', false, 'four'];
const strings = items.filter(isString);
console.log('strings:', strings);