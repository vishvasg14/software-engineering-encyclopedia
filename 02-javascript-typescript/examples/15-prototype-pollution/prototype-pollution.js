// Prototype pollution demo

// Vulnerable merge
function unsafeMerge(target, source) {
    for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            target[key] = unsafeMerge(target[key] || {}, source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

// Attacker payload
const malicious = JSON.parse('{"__proto__":{"polluted":true}}');
unsafeMerge({}, malicious);

// Verify pollution
const probe = {};
console.log('polluted:', probe.polluted); // true — vulnerable!

// Safe merge
function safeMerge(target, source) {
    const FORBIDDEN = new Set(['__proto__', 'constructor', 'prototype']);
    for (const key of Object.keys(source)) {
        if (FORBIDDEN.has(key)) continue;
        const v = source[key];
        if (v && typeof v === 'object' && !Array.isArray(v)) {
            target[key] = safeMerge(target[key] || {}, v);
        } else {
            target[key] = v;
        }
    }
    return target;
}

// Reset prototype (only for demo)
delete Object.prototype.polluted;

// Try the same attack with safeMerge
safeMerge({}, malicious);
const probe2 = {};
console.log('polluted (safe):', probe2.polluted); // undefined

// Alternative: use Object.create(null) for user-controlled keys
const dict = Object.create(null);
dict['__proto__'] = 'attempted'; // doesn't affect Object.prototype
console.log('dict proto:', Object.getPrototypeOf(dict)); // null