// Consumer of the declared module

import Client, { hello, version } from 'my-lib';

console.log('version:', version);
console.log('greeting:', hello('Alice'));

const c = new Client({ timeout: 5000 });
await c.send('hello');
c.close();