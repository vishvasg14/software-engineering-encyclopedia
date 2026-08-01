# OpenAPI Documentation Reference

The authoritative source for OpenAPI is the OpenAPI Initiative (part of the Linux Foundation). This file catalogs the OpenAPI documentation pages referenced in the API document.

## Primary documentation

- **OpenAPI Initiative:** <https://www.openapis.org/>
- **OpenAPI Specification (GitHub):** <https://github.com/OAI/OpenAPI-Specification>
- **OpenAPI Guide:** <https://swagger.io/docs/specification/about/>
- **Swagger Editor (online):** <https://editor.swagger.io/>
- **OpenAPI Specification v3.1.0:** <https://spec.openapis.org/oas/v3.1.0>

## OpenAPI versions

| Version | Year | Notable |
|---------|------|---------|
| Swagger 1.0 | 2011 | Initial |
| Swagger 2.0 / OpenAPI 2.0 | 2014 | Standardized |
| OpenAPI 3.0.0 | 2017 | AsyncAPI split off |
| OpenAPI 3.0.3 | 2020 | Latest 3.0.x |
| OpenAPI 3.1.0 | 2021 | JSON Schema 2020-12 alignment |
| OpenAPI 3.1.1 | 2024 | Latest |

## Key sections of an OpenAPI document

- `openapi` — version (3.1.0).
- `info` — title, version, description, contact, license.
- `servers` — list of server URLs.
- `paths` — endpoint definitions.
- `components` — reusable schemas, parameters, responses, security schemes.
- `security` — global security.
- `tags` — grouping.
- `externalDocs` — links to docs.

## A complete example

```yaml
openapi: 3.1.0
info:
  title: User API
  version: 1.0.0
  description: API for managing users.
  contact:
    name: API Support
    email: support@example.com
servers:
  - url: https://api.example.com/v1
    description: Production
  - url: https://staging-api.example.com/v1
    description: Staging

paths:
  /users:
    get:
      summary: List users
      tags:
        - users
      parameters:
        - $ref: '#/components/parameters/Limit'
        - $ref: '#/components/parameters/Offset'
        - name: status
          in: query
          schema:
            type: string
            enum: [active, inactive]
      responses:
        '200':
          description: List of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      summary: Create user
      tags:
        - users
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: Created
          headers:
            Location:
              schema:
                type: string
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

  /users/{id}:
    get:
      summary: Get user
      tags:
        - users
      parameters:
        - $ref: '#/components/parameters/Id'
      responses:
        '200':
          description: User
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          $ref: '#/components/responses/NotFound'

    delete:
      summary: Delete user
      tags:
        - users
      parameters:
        - $ref: '#/components/parameters/Id'
      responses:
        '204':
          description: Deleted

components:
  parameters:
    Id:
      name: id
      in: path
      required: true
      schema:
        type: string
    Limit:
      name: limit
      in: query
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 20
    Offset:
      name: offset
      in: query
      schema:
        type: integer
        minimum: 0
        default: 0
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        email:
          type: string
          format: email
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - name
        - email
    CreateUserRequest:
      type: object
      properties:
        name:
          type: string
          minLength: 1
        email:
          type: string
          format: email
      required:
        - name
        - email
    Problem:
      type: object
      description: RFC 7807 Problem Details
      properties:
        type:
          type: string
          format: uri
        title:
          type: string
        status:
          type: integer
        detail:
          type: string
        instance:
          type: string
  responses:
    NotFound:
      description: Resource not found
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Problem'
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - BearerAuth: []
```

## Tools

- **Swagger Editor:** Live editor at <https://editor.swagger.io/>
- **Swagger UI:** Generate documentation UI from spec.
- **Swagger Codegen:** Generate clients and servers.
- **OpenAPI Generator:** <https://openapi-generator.tech/>
- **Redoc:** Beautiful API documentation.
- **Stoplight Elements:** <https://stoplight.io/open-source/elements>
- **Spectral:** Linter for OpenAPI specs.
- **Optic:** API documentation tooling.

## Reference implementations

- **swagger-codegen:** Java client/server codegen.
- **OpenAPI Generator (openapi-generator.tech):** Multi-language codegen.
- **NSwag:** .NET toolchain.
- **Redoc:** Documentation generator.

## Best practices

- Use semantic versioning in `info.version`.
- Document all response codes (including errors).
- Use Problem Details (RFC 7807) for error responses.
- Reuse components via `$ref`.
- Use operation tags for grouping.
- Document security schemes.

## Tools and books

- *Designing Web APIs* — Brenda Jin, Sahand Khoshgoftar, Antonio Bruno (O'Reilly).
- *OpenAPI Cookbook* — documentation site.