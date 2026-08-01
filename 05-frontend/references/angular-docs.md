# Angular Documentation Reference

The authoritative source for Angular is the official documentation. This file catalogs the Angular documentation pages referenced in the Frontend document.

## Primary documentation

- **Angular Documentation:** <https://angular.dev/>
- **Angular API Reference:** <https://angular.dev/api>
- **Angular GitHub:** <https://github.com/angular/angular>
- **Angular CLI:** <https://angular.dev/tools/cli>
- **Angular University (community):** <https://angular-university.io>
- **Angular Blog:** <https://blog.angular.dev/>

## Documentation structure

| Section | What it covers |
|---------|---------------|
| **Getting Started** | Installation, first app, Tour of Heroes tutorial |
| **Understanding Angular** | Architecture concepts, modules, components |
| **Developer Guides** | Templates, forms, routing, HTTP, DI, signals |
| **API Reference** | All Angular APIs |
| **Best Practices** | Style guide, security, performance |
| **Tools and CLI** | Schematics, builders, deployment |

## Key sections referenced in this document

### Core

| Topic | URL |
|-------|-----|
| Architecture overview | <https://angular.dev/guide/architecture> |
| Components | <https://angular.dev/guide/components> |
| Templates | <https://angular.dev/guide/templates> |
| Dependency injection | <https://angular.dev/guide/di> |
| Hierarchical injectors | <https://angular.dev/guide/di/hierarchical-dependency-injection> |
| Providers | <https://angular.dev/guide/di/providers> |
| Lifecycle hooks | <https://angular.dev/guide/components/lifecycle> |
| Change detection | <https://angular.dev/guide/change-detection> |
| Zone.js | <https://angular.dev/guide/zone> |

### Components

| Topic | URL |
|-------|-----|
| Component interaction | <https://angular.dev/guide/component-interaction> |
| Component styles | <https://angular.dev/guide/component-styles> |
| Dynamic components | <https://angular.dev/guide/dynamic-component-loader> |
| Content projection (ng-content) | <https://angular.dev/guide/content-projection> |
| View encapsulation | <https://angular.dev/guide/view-encapsulation> |
| Standalone components | <https://angular.dev/guide/components/importing> |
| Signals | <https://angular.dev/guide/signals> |
| Inputs | <https://angular.dev/guide/components/inputs> |
| Outputs | <https://angular.dev/guide/components/outputs> |
| Deferrable views | <https://angular.dev/guide/defer> |

### Templates

| Topic | URL |
|-------|-----|
| Interpolation | <https://angular.dev/guide/interpolation> |
| Property binding | <https://angular.dev/guide/property-binding> |
| Event binding | <https://angular.dev/guide/event-binding> |
| Two-way binding | <https://angular.dev/guide/two-way-binding> |
| Built-in directives | <https://angular.dev/guide/built-in-directives> |
| Built-in control flow (@if/@for) | <https://angular.dev/guide/templates/control-flow> |
| Pipes | <https://angular.dev/guide/pipes> |

### Forms

| Topic | URL |
|-------|-----|
| Forms overview | <https://angular.dev/guide/forms> |
| Reactive forms | <https://angular.dev/guide/forms/reactive-forms> |
| Template-driven forms | <https://angular.dev/guide/forms/template-driven-forms> |
| Form validation | <https://angular.dev/guide/forms/form-validation> |
| Dynamic forms | <https://angular.dev/guide/forms/dynamic-forms> |

### RxJS and Signals

| Topic | URL |
|-------|-----|
| RxJS interop | <https://angular.dev/guide/rxjs-interop> |
| toSignal | <https://angular.dev/guide/rxjs-interop#to-signal> |
| toObservable | <https://angular.dev/guide/rxjs-interop#to-observable> |
| Signals overview | <https://angular.dev/guide/signals> |
| Computed signals | <https://angular.dev/guide/signals#computed-signals> |
| Effects | <https://angular.dev/guide/signals#effects> |

### HTTP

| Topic | URL |
|-------|-----|
| HttpClient | <https://angular.dev/guide/http> |
| HTTP interceptors | <https://angular.dev/guide/http/interceptors> |
| Testing HTTP | <https://angular.dev/guide/http/testing> |

### Routing

| Topic | URL |
|-------|-----|
| Router overview | <https://angular.dev/guide/routing-overview> |
| Common routing tasks | <https://angular.dev/guide/common-router-tasks> |
| Route guards | <https://angular.dev/guide/route-guards> |
| Lazy loading | <https://angular.dev/guide/standalone-components#lazy-loading> |
| RouterLink | <https://angular.dev/api/router/RouterLink> |

### Standalone APIs

| Topic | URL |
|-------|-----|
| Standalone components | <https://angular.dev/guide/components/importing> |
| Migration to standalone | <https://angular.dev/guide/standalone-migration> |
| Bootstrapping standalone apps | <https://angular.dev/guide/standalone-components#bootstrapping-an-application> |

### Testing

| Topic | URL |
|-------|-----|
| Testing overview | <https://angular.dev/guide/testing> |
| Testing components | <https://angular.dev/guide/testing/components-basics> |
| Testing services | <https://angular.dev/guide/testing/services> |
| Testing HTTP | <https://angular.dev/guide/http/testing> |
| Code coverage | <https://angular.dev/guide/testing/code-coverage> |

### Performance

| Topic | URL |
|-------|-----|
| Performance overview | <https://angular.dev/guide/performance> |
| Deferrable views | <https://angular.dev/guide/defer> |
| Change detection optimization | <https://angular.dev/guide/change-detection#optimizing-change-detection> |
| Bundle budgets | <https://angular.dev/guide/build#configuring-size-budgets> |

### Deployment

| Topic | URL |
|-------|-----|
| Deployment | <https://angular.dev/guide/deployment> |
| Server-side rendering | <https://angular.dev/guide/ssr> |
| Hydration | <https://angular.dev/guide/hydration> |

## Angular major versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| AngularJS (1.x) | 2010-2017 | First version, jQuery-era syntax |
| Angular 2.0 | 2016 | Rewrite in TypeScript, component-based |
| Angular 4.0 | 2017 | Reduced bundles, animation package split |
| Angular 5.0 | 2017 | Build optimizer, AOT compiler |
| Angular 6.0 | 2018 | ng add/update, RxJS 6, tree-shaking |
| Angular 7.0 | 2018 | Drag-drop, virtual scrolling |
| Angular 8.0 | 2019 | Ivy preview, differential loading |
| Angular 9.0 | 2020 | Ivy default, Bazel opt-in |
| Angular 10.0 | 2020 | Strict mode, optional ngcc removal |
| Angular 11.0 | 2020 | Hot module replacement |
| Angular 12.0 | 2021 | Webpack 5, Tailwind, strict null checks |
| Angular 13.0 | 2021 | No IE11, factory-based DI |
| Angular 14.0 | 2022 | Standalone APIs, typed reactive forms |
| Angular 15.0 | 2022 | Standalone APIs stable, functional route guards |
| Angular 16.0 | 2023 | Signals (developer preview), esbuild builder |
| Angular 17.0 | 2023 | Signals stable, control flow syntax, deferrable views |
| Angular 18.0 | 2024 | Zoneless preview, material 3, deferred blocks |
| Angular 19.0 | 2025 | (development) |

## Tools

- **Angular CLI:** <https://angular.dev/tools/cli>
- **Angular DevTools (browser extension):** <https://angular.dev/tools/devtools>
- **Angular Language Service** (for VS Code, WebStorm).
- **Nx:** <https://nx.dev/> — Angular monorepo tooling.
- **Angular Universal (SSR):** Built-in since v17.
- **ng-packagr:** Library packaging.
- **Storybook:** <https://storybook.js.org/> — Component development.

## Conferences and community

- **AngularConnect:** Annual conference.
- **ng-conf:** Annual US conference.
- **Angular Air:** Podcast.
- **Angular Devs:** Community Slack.
- **GitHub Discussions:** <https://github.com/angular/angular/discussions>

## Books

- *ng-book — The Complete Book on Angular* — Nate Murray, Felipe Coury, Ari Lerner, Carlos Taborda (Fullstack.io).
- *Angular in Action* — Jeremy Wilken (Manning).
- *Pro Angular 16* — Adam Freeman (Apress).
- *Angular — The Complete Guide* — Maximilian Schwarzmüller (Udemy).
- *Effective Angular* — Roberto Heckers (Leanpub).
- *Learning Angular* — Brad Dayley, Brendan Dayley, Alex Dayley (O'Reilly).