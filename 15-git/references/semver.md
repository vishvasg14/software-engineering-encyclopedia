# Semantic Versioning (SemVer) Reference

The canonical reference for SemVer is semver.org. This file catalogs the SemVer specification and references used in the Git document.

## Primary reference

- **SemVer 2.0.0 spec:** <https://semver.org/spec/v2.0.0.html>
- **SemVer.org:** <https://semver.org/

## Specification summary

### Version format <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23version-format%0A%0ASection%20title%3A%20Version%20format' target='_blank' rel='noopener' data-askgpt='Version format' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/semver.md#version-format' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23version-format%0A%0ASection%20title%3A%20Version%20format' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23version-format%0A%0ASection%20title%3A%20Version%20format' title='Ask ChatGPT about this section'>💬</a>

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
```

- **MAJOR:** incompatible API changes.
- **MINOR:** backwards-compatible new functionality.
- **PATCH:** backwards-compatible bug fixes.
- **PRERELEASE:** optional, hyphen-separated (e.g., `-alpha.1`, `-rc.1`).
- **BUILD:** optional, plus-separated (e.g., `+build.123`).

### Examples <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23examples%0A%0ASection%20title%3A%20Examples' target='_blank' rel='noopener' data-askgpt='Examples' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/semver.md#examples' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23examples%0A%0ASection%20title%3A%20Examples' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23examples%0A%0ASection%20title%3A%20Examples' title='Ask ChatGPT about this section'>💬</a>

```
1.0.0
1.0.0-alpha
1.0.0-alpha.1
1.0.0-0.3.7
1.0.0-x.7.z.92
1.0.0+20130313144700
1.0.0-beta+exp.sha.5114f85
```

## Pre-release versions

A version MAY be denoted with a pre-release identifier. The pre-release version is denoted by appending a hyphen and a series of dot-separated identifiers immediately following the patch version. Identifiers MUST comprise only ASCII alphanumerics and hyphens. Identifiers MUST NOT be empty. Numeric identifiers MUST NOT include leading zeroes.

Examples:
- `1.0.0-alpha`
- `1.0.0-alpha.1`
- `1.0.0-0.3.7` (numeric, no leading zeros)
- `1.0.0-x.7.z.92`

Precedence: `1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0`.

## Build metadata

Build metadata MUST be ignored when determining version precedence. The build metadata is denoted by appending a plus sign and a series of dot-separated identifiers immediately following the patch version or pre-release version.

Example: `1.0.0+exp.sha.5114f85` — equivalent to `1.0.0`.

## Precedence

Precedence is determined by MAJOR, MINOR, PATCH numerically. Pre-release versions have lower precedence than the associated normal version. Build metadata ignored.

Order (low to high): `1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0`.

## Rules

- Software using SemVer MUST declare a public API.
- A version number starts at 0.y.z for initial development.
- When ready for 1.0.0, define the public API.
- MAJOR.zero (0.y.z) is for initial development; anything may change at any time.
- Public API declarations (e.g., a public file) should be used to declare the API.

## Tools and resources

- **semantic-release:** <https://github.com/semantic-release/semantic-release>
- **release-please:** <https://github.com/googleapis/release-please>
- **standard-version:** <https://github.com/conventional-changelog/standard-version>
- **commitlint:** <https://github.com/conventional-changelog/commitlint>
- **Conventional Commits:** <https://www.conventionalcommits.org/>
- **SemVer check:** <https://github.com/crate-io/semver-tool>
- **cargo-semver-checks:** Rust crate version policy
- **npm semver:** <https://docs.npmjs.com/misc/semver>

## Conventional Commits specification

<https://www.conventionalcommits.org/>

### Format <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23format%0A%0ASection%20title%3A%20Format' target='_blank' rel='noopener' data-askgpt='Format' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/semver.md#format' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23format%0A%0ASection%20title%3A%20Format' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fsemver.md%23format%0A%0ASection%20title%3A%20Format' title='Ask ChatGPT about this section'>💬</a>

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- **fix:** a bug fix (correlates with PATCH in SemVer).
- **feat:** a new feature (correlates with MINOR in SemVer).
- **BREAKING CHANGE:** a breaking change (correlates with MAJOR in SemVer). Either with `!` in type or footer.
- **chore:** changes that don't modify src or test files.
- **docs:** documentation only.
- **style:** formatting only.
- **refactor:** code change that neither fixes a bug nor adds a feature.
- **perf:** performance improvement.
- **test:** add or correct tests.

Examples:
- `feat(lang): add polish language binding`
- `fix(parser): handle empty input correctly`
- `feat(api)!: send email when API call fails (BREAKING CHANGE: email is now required)`

## Versioning systems compared

| System | Format | When to use |
|--------|--------|-------------|
| **SemVer** | `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]` | Libraries, APIs |
| **CalVer** | `YYYY.MM.PATCH` (or variants) | Products, releases |
| **Date-based** | `2024-05-15` | Continuous deployment |
| **Ubuntu** | `YY.MM[.PATCH]` | OS, applications |
| **Alpine** | `MAJOR.MINOR.PATCH[+PRERELEASE]` | Distributions |
| **PVP** | `MAJOR.MINOR.PATCH` (with constraints) | Haskell packages |

## CalVer (Calendar Versioning)

<https://calver.org/>

- `YYYY.MM.PATCH` (e.g., `2024.05.1`).
- Or `YY.MM.PATCH` (Ubuntu).
- Or `YYYY.MM.DD`.
- Or `YYYY.0M.0D.PATCH`.

When to use:
- Marketing-driven releases.
- Continuous deployment.
- When you don't have a public API.

## Best practices

1. **Start with 0.y.z for initial development.**
2. **Bump MAJOR for breaking changes; MINOR for features; PATCH for fixes.**
3. **Tag in git with annotated tags** (`git tag -a v1.0.0 -m "..."`).
4. **Use Conventional Commits** to drive automation.
5. **Automate releases** with semantic-release or release-please.
6. **Document pre-release versions** clearly.
7. **Communicate breaking changes** in CHANGELOG.