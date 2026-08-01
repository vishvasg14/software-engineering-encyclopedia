// CommonJS module

const PI = 3.14159;

function add(a, b) {
    return a + b;
}

class Calculator {
    add(a, b) { return a + b; }
}

module.exports = { PI, add, Calculator };