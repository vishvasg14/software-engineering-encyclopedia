// Template literal types

type EventName<T extends string> = `on${Capitalize<T>}`;
type ButtonEvents = EventName<'click' | 'hover' | 'focus'>;
// 'onClick' | 'onHover' | 'onFocus'

function on(event: ButtonEvents, handler: () => void) {
    console.log('handler registered for:', event);
}

on('onClick', () => {}); // OK
// on('click', () => {}); // Error: not assignable to ButtonEvents

// Routing
type ApiRoute = `/api/${'users' | 'posts' | 'comments'}`;
const r1: ApiRoute = '/api/users';
console.log('route:', r1);

// Combining template literal types with mapped types
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
    name: string;
    age: number;
}

const p: Getters<Person> = {
    getName: () => 'Alice',
    getAge: () => 30,
};
console.log('getters:', p.getName(), p.getAge());