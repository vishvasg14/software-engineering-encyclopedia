// CommonJS consumer
const { PI, add, Calculator } = require('./math.cjs');

console.log('PI:', PI);
console.log('add(2, 3):', add(2, 3));
const c = new Calculator();
console.log('Calculator.add(2, 3):', c.add(2, 3));