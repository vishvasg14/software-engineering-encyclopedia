// 01 — Test pyramid example (TypeScript / Vitest)

// === UNIT TEST (fast, isolated) ===
import { describe, it, expect } from 'vitest';

function add(a: number, b: number): number {
  return a + b;
}

describe('add (unit test)', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('adds negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

// === INTEGRATION TEST (real dependencies) ===
// In a real app, this would use Testcontainers or similar:
// import { PostgreSQLContainer } from '@testcontainers/postgresql';
// import { PrismaClient } from '@prisma/client';
//
// const container = new PostgreSQLContainer('postgres:16-alpine');
// const prisma = new PrismaClient({ datasourceUrl: container.getConnectionUrl() });
//
// describe('User repository (integration)', () => {
//   beforeAll(async () => { await container.start(); });
//   afterAll(async () => { await container.stop(); });
//
//   it('creates a user', async () => {
//     const user = await prisma.user.create({ data: { email: 'a@b.com' } });
//     expect(user.id).toBeDefined();
//   });
// });

// === END-TO-END TEST (full system) ===
// In a real app, this would use Playwright or Cypress:
// import { test, expect } from '@playwright/test';
//
// test('user can login', async ({ page }) => {
//   await page.goto('https://app.example.com/login');
//   await page.fill('input[name=email]', 'alice@example.com');
//   await page.fill('input[name=password]', 'password');
//   await page.click('button[type=submit]');
//   await expect(page).toHaveURL('https://app.example.com/dashboard');
// });

// === Test pyramid proportion (70/20/10) ===
const testPyramid = {
  unit: 70,         // unit tests: fast, isolated, many
  integration: 20, // integration: real deps, slower
  e2e: 10,         // e2e: full system, slow, brittle
};

// === Test pyramid vs testing trophy ===
// Test pyramid (Mike Cohn): emphasize unit tests at the base
// Testing trophy (Kent C. Dodds): emphasize integration tests in the middle
//
// Trophy:
//         /E2E\
//        /CONTRACT\
//       /INTEGRATION\
//        /    UNIT    \
//       /STATIC ANALYSIS\

// === Anti-pattern: ice-cream cone ===
const iceCreamCone = {
  unit: 5,        // too few
  integration: 20,
  e2e: 75,         // too many - slow, brittle
};

// Slow test suite: hours of CI, brittle, hard to maintain

// === Use case: small, fast tests ===
// User service: unit tests for each method (~100 tests, 1s total)
// Integration: 5 Testcontainers tests (Postgres, Redis, etc.)
// E2E: 3 critical user flows (login, checkout, search)