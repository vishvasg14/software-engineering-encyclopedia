// Closures and scope

function makeCounter() {
    let n = 0; // closed over by inner functions
    return {
        increment: () => ++n,
        decrement: () => --n,
        get: () => n,
    };
}

const c = makeCounter();
c.increment(); // 1
c.increment(); // 2
c.decrement(); // 1
console.log('counter:', c.get());

// Block scope with let
if (true) {
    let blockScoped = 'inside';
    var functionScoped = 'inside too';
}
// console.log(blockScoped); // ReferenceError
console.log('functionScoped (leaked):', functionScoped);

// TDZ
try {
    console.log(tdzVar);
    let tdzVar = 1;
} catch (e) {
    console.log('TDZ error:', e.message);
}