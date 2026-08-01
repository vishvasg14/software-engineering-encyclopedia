// 03 — SQL injection prevention (Node.js / TypeScript with pg)

import { Pool } from 'pg';

const pool = new Pool();

// VULNERABLE: string concatenation
async function BAD_getUserByName(name: string) {
  // Attacker input: ' OR '1'='1
  // Result: SELECT * FROM users WHERE name = '' OR '1'='1'
  // Returns all users!
  const result = await pool.query(`SELECT * FROM users WHERE name = '${name}'`);
  return result.rows;
}

// SECURE: parameterized query
async function GOOD_getUserByName(name: string) {
  // The name is bound as a parameter, not concatenated
  const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
  return result.rows;
}

// VULNERABLE: dynamic ORDER BY
async function BAD_getUsersSorted(sortBy: string) {
  // sortBy = 'name; DROP TABLE users; --'  → SQL injection!
  const result = await pool.query(`SELECT * FROM users ORDER BY ${sortBy}`);
  return result.rows;
}

// SECURE: validate column name against allowlist
const ALLOWED_SORT_COLUMNS = ['id', 'name', 'email', 'created_at'];

async function GOOD_getUsersSorted(sortBy: string) {
  if (!ALLOWED_SORT_COLUMNS.includes(sortBy)) {
    throw new Error('Invalid sort column');
  }
  const result = await pool.query(`SELECT * FROM users ORDER BY ${sortBy}`);
  return result.rows;
}

// VULNERABLE: in LIKE clause
async function BAD_searchUsers(query: string) {
  // query = '%'  → returns all users
  const result = await pool.query(`SELECT * FROM users WHERE name LIKE '%${query}%'`);
  return result.rows;
}

// SECURE: escape LIKE wildcards
async function GOOD_searchUsers(query: string) {
  const escaped = query.replace(/[\\%_]/g, '\\$&');
  const result = await pool.query(
    'SELECT * FROM users WHERE name LIKE $1',
    [`%${escaped}%`]
  );
  return result.rows;
}

// VULNERABLE: dynamic IN clause
async function BAD_getUsersByIds(ids: string[]) {
  // ids = ["1', '2', (SELECT password FROM users) --"]
  const result = await pool.query(`SELECT * FROM users WHERE id IN (${ids.join(',')})`);
  return result.rows;
}

// SECURE: use ANY with array parameter
async function GOOD_getUsersByIds(ids: number[]) {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = ANY($1::int[])',
    [ids]
  );
  return result.rows;
}

// Use ORM (TypeORM, Prisma, Drizzle) for automatic safety
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function findUserByEmail(email: string) {
  // Prisma uses parameterized queries automatically
  return prisma.user.findUnique({ where: { email } });
}