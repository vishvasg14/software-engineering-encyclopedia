// Sample code that benefits from strict flags

interface User {
    id: string;
    name: string;
    email?: string;
}

function getUserName(users: User[], id: string): string {
    // noUncheckedIndexedAccess: arr[i] is User | undefined
    const user = users.find(u => u.id === id);
    if (!user) {
        throw new Error(`user ${id} not found`);
    }
    // user is now User; user.name is string
    return user.name;
}

const users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob' },
];

console.log(getUserName(users, '1'));
console.log(getUserName(users, '2'));

// exactOptionalPropertyTypes: email? can't be set to undefined explicitly
// const u: User = { id: '3', name: 'Carol', email: undefined }; // Error