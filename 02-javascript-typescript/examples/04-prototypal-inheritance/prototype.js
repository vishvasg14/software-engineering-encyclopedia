// Prototype chain

const animal = {
    isAlive: true,
    speak() {
        return `${this.name} makes a sound`;
    },
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak = function () {
    return `${this.name} barks`;
};

console.log(dog.speak());
console.log('isAlive (inherited):', dog.isAlive);
console.log('proto:', Object.getPrototypeOf(dog) === animal);

// Property lookup walks the chain
console.log('hasOwnProperty:', Object.prototype.hasOwnProperty.call(dog, 'name'));      // true
console.log('hasOwnProperty (inherited):', Object.prototype.hasOwnProperty.call(dog, 'speak')); // true (own)
console.log('hasOwnProperty (inherited isAlive):', Object.prototype.hasOwnProperty.call(dog, 'isAlive')); // false (inherited)