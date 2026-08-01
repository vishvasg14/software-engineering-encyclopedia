// 02 — Resource design examples
// Shows good URLs for resources and sub-resources

// GOOD: nouns, hierarchical, no verbs
const urlExamples = {
  // Resources
  listUsers:    'GET    /users',
  getUser:      'GET    /users/{id}',
  createUser:   'POST   /users',

  // Sub-resources
  userOrders:   'GET    /users/{id}/orders',
  userOrder:    'GET    /users/{id}/orders/{orderId}',
  createOrder:  'POST   /users/{id}/orders',

  // Actions that don't fit CRUD: post on sub-resource
  activateUser: 'POST   /users/{id}/activate',
  deactivate:   'POST   /users/{id}/deactivate',
  archive:      'POST   /users/{id}/archive',

  // Collections
  listOrders:   'GET    /orders',
  getOrder:     'GET    /orders/{id}',
  updateOrder:  'PUT    /orders/{id}',
  patchOrder:   'PATCH  /orders/{id}',
  deleteOrder:  'DELETE /orders/{id}',

  // Multi-resource
  transferFunds: 'POST /accounts/{id}/transfers',
};

console.log('REST resource design examples:');
for (const [key, value] of Object.entries(urlExamples)) {
  console.log(`  ${key}: ${value}`);
}

// BAD examples to avoid
const badExamples = {
  // Verbs in URLs
  getUserVerb:    'GET  /api/getUser/123',
  deleteUserVerb: 'GET  /api/deleteUser/123',

  // Pluralization inconsistency
  singular: 'GET  /api/user',
  plural:   'GET  /api/users',

  // RPC-style endpoints (POST with method in URL)
  rpcGetBalance:  'GET  /api/getAccountBalance',
  rpcProcessOrder: 'POST /api/processOrder',

  // Verbs to mutate resources (use PUT/PATCH/DELETE)
  getToMutate: 'GET  /api/users/123/delete',
};

console.log('\nBad examples:');
for (const [key, value] of Object.entries(badExamples)) {
  console.log(`  ${key}: ${value}`);
}