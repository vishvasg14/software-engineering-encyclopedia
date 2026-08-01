// 11 — k6 load testing (JavaScript)

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// Custom metrics
const loginDuration = new Trend('login_duration');
const loginErrors = new Rate('login_errors');
const logins = new Counter('logins_total');

// Options: load profile
export const options = {
  stages: [
    { duration: '30s', target: 10 },   // ramp up
    { duration: '2m', target: 100 },   // ramp to 100 users
    { duration: '3m', target: 100 },   // sustain
    { duration: '30s', target: 500 },  // spike
    { duration: '3m', target: 500 },   // sustain spike
    { duration: '1m', target: 0 },     // ramp down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],         // < 1% errors
    http_req_duration: ['p(95)<500'],       // 95th < 500ms
    'http_req_duration{endpoint:login}': ['p(99)<1000'],
  },
};

export default function () {
  // Login flow
  const loginRes = http.post('https://api.example.com/login', JSON.stringify({
    email: `user${__VU}@example.com`,
    password: 'password',
  }), { headers: { 'Content-Type': 'application/json' } });

  loginDuration.add(loginRes.timings.duration);
  logins.add(1);
  loginErrors.add(loginRes.status !== 200);

  check(loginRes, {
    'login succeeded': (r) => r.status === 200,
    'has token': (r) => r.json('token') !== undefined,
  });

  sleep(1);

  // Get user
  const userRes = http.get('https://api.example.com/users/me', {
    headers: { 'Authorization': `Bearer ${loginRes.json('token')}` },
  });
  check(userRes, {
    'user fetched': (r) => r.status === 200,
    'has name': (r) => r.json('name') !== undefined,
  });

  sleep(2);
}

// === Thresholds ===
// thresholds: {
//   // Latency
//   http_req_duration: ['p(95)<500', 'p(99)<1000'],
//   // Errors
//   http_req_failed: ['rate<0.01'],
//   // Throughput
//   http_reqs: ['rate>100'],  // 100 RPS
//   // Custom
//   login_duration: ['p(95)<1000'],
// }

// === Options: load profiles ===

// Smoke test
// export const options = {
//   vus: 1,
//   duration: '30s',
// };

// Stress test
// export const options = {
//   vus: 1000,
//   duration: '10m',
//   thresholds: {
//     http_req_duration: ['p(99)<2000'],
//   },
// };

// Soak test
// export const options = {
//   vus: 100,
//   duration: '24h',
// };

// === k6 cloud / Grafana ===
// $ k6 login cloud
// $ k6 cloud run load-test.js

// === Thresholds for cloud ===
// thresholds: {
//   http_req_duration: ['p(95)<500'],
//   http_req_failed: ['rate<0.05'],
// }