// TypeScript classes (target ES2022)

class Animal {
    constructor(public name: string) {}
    speak(): string {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    #breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.#breed = breed;
    }
    override speak(): string {
        return `${this.name} the ${this.#breed} barks`;
    }
}

const d = new Dog('Rex', 'labrador');
console.log(d.speak());