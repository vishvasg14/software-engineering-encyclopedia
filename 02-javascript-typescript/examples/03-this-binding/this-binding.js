'use strict';

// Method call: `this` is the receiver
const obj = {
    name: 'Alice',
    greet() {
        console.log('method call:', this.name);
    },
};
obj.greet();

// Plain function call: `this` is undefined in strict mode
function standalone() {
    console.log('plain call:', this);
}
standalone();

// call / apply / bind
function say(greeting) {
    console.log(`${greeting}, ${this.name}`);
}
const person = { name: 'Bob' };
say.call(person, 'Hello');
say.apply(person, ['Hi']);
const bound = say.bind(person);
bound('Hey');

// Arrow function: captures outer `this`
const arrowObj = {
    name: 'Carol',
    regular: function () {
        const inner = () => console.log('arrow:', this.name);
        inner();
    },
    arrow: () => console.log('arrow-method:', this.name), // outer `this` (module/global)
};
arrowObj.regular();
arrowObj.arrow();