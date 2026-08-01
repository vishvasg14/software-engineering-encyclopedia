# Spring Security Documentation Reference

The authoritative source for Spring Security is the official documentation. This file catalogs the Spring Security documentation pages referenced in the Spring Ecosystem document.

## Primary documentation

- **Spring Security 6.3.x:** <https://docs.spring.io/spring-security/reference/6.3/index.html>
- **Spring Security current:** <https://docs.spring.io/spring-security/reference/index.html>
- **Spring Security API:** <https://docs.spring.io/spring-security/site/docs/current/api/>
- **Spring Security source:** <https://github.com/spring-projects/spring-security>

## Documentation structure

| Section | What it covers |
|---------|---------------|
| **Servlet** | Authentication, Authorization, OAuth2, SAML, CSRF, Session Management |
| **Reactive** | Reactive variants of authentication and authorization |
| **Reactive Applications** | WebFlux security |
| **Architecture** | Components, filters, users |
| **Configuration** | Java config, namespace, password storage |
| **Authentication** | Form login, basic auth, OAuth2, JWT, LDAP, OpenID |
| **Authorization** | URL-based, method-based, ACL |

## Key sections referenced in this document

| Topic | URL |
|-------|-----|
| Architecture | <https://docs.spring.io/spring-security/reference/architecture.html> |
| Servlet authentication | <https://docs.spring.io/spring-security/reference/servlet/authentication/index.html> |
| Form login | <https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html> |
| OAuth2 Login | <https://docs.spring.io/spring-security/reference/servlet/oauth2/login.html> |
| OAuth2 Client | <https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html> |
| OAuth2 Resource Server (JWT) | <https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html> |
| Method Security | <https://docs.spring.io/spring-security/reference/authorization/method-security.html> |
| URL-based authorization | <https://docs.spring.io/spring-security/reference/authorization/authorize-http-requests.html> |
| CSRF Protection | <https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html> |
| CORS | <https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html> |
| Session Management | <https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html> |
| Password Storage | <https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html> |
| Reactive Security | <https://docs.spring.io/spring-security/reference/reactive/index.html> |
| Testing | <https://docs.spring.io/spring-security/reference/test.html> |

## Spring Security versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| 1.0 | 2004 | Initial release |
| 2.0 | 2008 | Namespace config |
| 3.0 | 2009 | Java config |
| 3.2 | 2013 | CSRF tokens, security headers |
| 4.0 | 2015 | Spring Security 4.x,OAuth2 support |
| 4.2 | 2016 | WebFlux support |
| 5.0 | 2017 | OAuth2 + OIDC |
| 5.2 | 2019 | OAuth2 resource server |
| 5.4 | 2020 | Lambda DSL |
| 5.6 | 2021 | WebFlux reactive security |
| 5.7 | 2022 | Deprecation: WebSecurityConfigurerAdapter |
| 6.0 | 2022 | Java 17+, Lambda DSL required |
| 6.1 | 2023 | Spring Security 6.1 |
| 6.2 | 2023 | Spring Security 6.2 |
| 6.3 | 2024 | Spring Security 6.3 |

## Filter chain

Spring Security's default filter chain:

1. `ChannelProcessingFilter`
2. `WebAsyncManagerIntegrationFilter`
3. `SecurityContextPersistenceFilter`
4. `HeaderWriterFilter`
5. `CorsFilter`
6. `CsrfFilter`
7. `LogoutFilter`
8. `OAuth2AuthorizationRequestRedirectFilter`
9. `Saml2AuthenticationRequestFilter`
10. `X509AuthenticationFilter`
11. `BasicAuthenticationFilter`
12. `RequestCacheAwareFilter`
13. `SecurityContextHolderAwareRequestFilter`
14. `JaasApiIntegrationFilter`
15. `RememberMeAuthenticationFilter`
16. `AnonymousAuthenticationFilter`
17. `OAuth2AuthorizationCodeGrantFilter`
18. `SessionManagementFilter`
19. `ExceptionTranslationFilter`
20. `AuthorizationFilter`

## Authentication providers

- `DaoAuthenticationProvider` (default; uses UserDetailsService).
- `LdapAuthenticationProvider`.
- `OAuth2LoginAuthenticationProvider`.
- `JwtAuthenticationProvider` (for resource server).
- `RememberMeAuthenticationProvider`.

## Authorization options

- URL-based: `authorizeHttpRequests()`.
- Method-based: `@PreAuthorize`, `@PostAuthorize`, `@Secured`, `@RolesAllowed`.
- ACL (object-level): Domain Object Security.

## Books

- *Spring Security in Action* — Laurentiu Spilca (Manning).
- *Spring Security 6 Recipes* — Maken Nosrati, Massimo Nardone (Apress).
- *Pro Spring Security* — Carlo Scarioni (Apress).
- *OAuth 2 in Action* — Justin Richer, Antonio Sanso (Manning).