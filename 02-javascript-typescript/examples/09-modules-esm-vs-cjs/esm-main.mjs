// ESM consumer
import Calculator, { PI, add } from './math.mjs';

console.log('PI:', PI);
console.log('add(2, 3):', add(2, 3));
const c = new Calculator();
console.log('Calculator.add(2, 3):', c.add(2, 3));