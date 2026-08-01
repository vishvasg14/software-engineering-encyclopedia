// Classes (ES2022+) — using class fields

class Animal {
    name; // public field
    constructor(name) {
        this.name = name;
    }
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    #breed; // private field (ES2022)
    constructor(name, breed) {
        super(name);
        this.#breed = breed;
    }
    speak() {
        return `${this.name} the ${this.#breed} barks`;
    }
}

const d = new Dog('Rex', 'labrador');
console.log(d.speak());
// console.log(d.#breed); // SyntaxError: private field