# REST API Guidelines Reference

This file catalogs the canonical REST API design guidelines referenced in the API document.

## Primary guidelines

- **Microsoft REST API Guidelines:** <https://github.com/microsoft/api-guidelines>
- **Google API Design Guide:** <https://cloud.google.com/apis/design>
- **JSON:API specification:** <https://jsonapi.org/>
- **PayPal API Style Guide:** <https://github.com/paypal/api-style-guide>
- **Zalando RESTful API Guidelines:** <https://opensource.zalando.com/restful-api-guidelines/>
- **Roy Fielding's REST dissertation (2000):** <https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm>

## Key recommendations

### Resource modeling

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23resource-modeling%0A%0ASection%20title%3A%20Resource%20modeling' target='_blank' rel='noopener' data-askgpt='Resource modeling' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#resource-modeling' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23resource-modeling%0A%0ASection%20title%3A%20Resource%20modeling' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23resource-modeling%0A%0ASection%20title%3A%20Resource%20modeling' title='Ask ChatGPT about this section'>💬</a>
- **Resources** — nouns, not verbs. `/users/123`, not `/getUser`.
- **Collections** — `/users`, `/orders`.
- **Sub-resources** — `/users/123/orders`.
- **Actions that don't fit CRUD** — `/users/123/activate` (verb on sub-resource).

### HTTP methods

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23http-methods%0A%0ASection%20title%3A%20HTTP%20methods' target='_blank' rel='noopener' data-askgpt='HTTP methods' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#http-methods' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23http-methods%0A%0ASection%20title%3A%20HTTP%20methods' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23http-methods%0A%0ASection%20title%3A%20HTTP%20methods' title='Ask ChatGPT about this section'>💬</a>
- `GET` — safe, idempotent.
- `POST` — create, non-idempotent.
- `PUT` — replace, idempotent.
- `PATCH` — partial update.
- `DELETE` — delete, idempotent.
- `OPTIONS` — describe capabilities.
- `HEAD` — same as GET but no body.

### URL design

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23url-design%0A%0ASection%20title%3A%20URL%20design' target='_blank' rel='noopener' data-askgpt='URL design' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#url-design' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23url-design%0A%0ASection%20title%3A%20URL%20design' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23url-design%0A%0ASection%20title%3A%20URL%20design' title='Ask ChatGPT about this section'>💬</a>
- Plural nouns: `/users`, not `/user`.
- Lowercase, kebab-case.
- No verbs in URLs.
- Hierarchical: `/users/123/orders/456`.

### Status codes

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23status-codes%0A%0ASection%20title%3A%20Status%20codes' target='_blank' rel='noopener' data-askgpt='Status codes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#status-codes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23status-codes%0A%0ASection%20title%3A%20Status%20codes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23status-codes%0A%0ASection%20title%3A%20Status%20codes' title='Ask ChatGPT about this section'>💬</a>
- Use the right code (`200`, `201`, `204`, `400`, `404`, `409`, `422`).
- `5xx` for server errors, `4xx` for client errors.
- Return Problem Details (RFC 7807) for error responses.

### Versioning

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23versioning%0A%0ASection%20title%3A%20Versioning' target='_blank' rel='noopener' data-askgpt='Versioning' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#versioning' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23versioning%0A%0ASection%20title%3A%20Versioning' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23versioning%0A%0ASection%20title%3A%20Versioning' title='Ask ChatGPT about this section'>💬</a>
- **URI version:** `/v1/users` (clear, visible).
- **Header version:** `Accept-Version: v1` (clean URLs).
- **Media type version:** `Accept: application/vnd.myapi.v1+json`.

### Pagination

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23pagination%0A%0ASection%20title%3A%20Pagination' target='_blank' rel='noopener' data-askgpt='Pagination' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#pagination' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23pagination%0A%0ASection%20title%3A%20Pagination' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23pagination%0A%0ASection%20title%3A%20Pagination' title='Ask ChatGPT about this section'>💬</a>
- **Offset-based:** `?offset=20&limit=10` (simple, slow for large offsets).
- **Cursor-based:** `?cursor=abc&limit=10` (efficient, opaque).
- **Keyset pagination:** `?after_id=100&limit=10`.

### Filtering and sorting

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23filtering-and-sorting%0A%0ASection%20title%3A%20Filtering%20and%20sorting' target='_blank' rel='noopener' data-askgpt='Filtering and sorting' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#filtering-and-sorting' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23filtering-and-sorting%0A%0ASection%20title%3A%20Filtering%20and%20sorting' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23filtering-and-sorting%0A%0ASection%20title%3A%20Filtering%20and%20sorting' title='Ask ChatGPT about this section'>💬</a>
- `?status=active&sort=-createdAt,name`.

### Idempotency

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23idempotency%0A%0ASection%20title%3A%20Idempotency' target='_blank' rel='noopener' data-askgpt='Idempotency' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#idempotency' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23idempotency%0A%0ASection%20title%3A%20Idempotency' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23idempotency%0A%0ASection%20title%3A%20Idempotency' title='Ask ChatGPT about this section'>💬</a>
- `Idempotency-Key` header for POST requests.
- Server stores the result for 24 hours.
- Same key returns same result.

### Caching

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23caching%0A%0ASection%20title%3A%20Caching' target='_blank' rel='noopener' data-askgpt='Caching' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#caching' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23caching%0A%0ASection%20title%3A%20Caching' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23caching%0A%0ASection%20title%3A%20Caching' title='Ask ChatGPT about this section'>💬</a>
- `Cache-Control: public, max-age=300` — cacheable.
- `ETag` — client can revalidate.

### Security

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23security%0A%0ASection%20title%3A%20Security' target='_blank' rel='noopener' data-askgpt='Security' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#security' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23security%0A%0ASection%20title%3A%20Security' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23security%0A%0ASection%20title%3A%20Security' title='Ask ChatGPT about this section'>💬</a>
- TLS everywhere.
- Authentication: Bearer token / OAuth2.
- Authorization: role-based, scope-based.
- Input validation.
- Output encoding.
- CORS for browser APIs.
- CSP headers.

### Hypermedia (HATEOAS)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23hypermedia-hateoas%0A%0ASection%20title%3A%20Hypermedia%20(HATEOAS)' target='_blank' rel='noopener' data-askgpt='Hypermedia (HATEOAS)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#hypermedia-hateoas' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23hypermedia-hateoas%0A%0ASection%20title%3A%20Hypermedia%20(HATEOAS)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23hypermedia-hateoas%0A%0ASection%20title%3A%20Hypermedia%20(HATEOAS)' title='Ask ChatGPT about this section'>💬</a>
- Resources include links to related resources.
- `links: [{ "rel": "self", "href": "/users/123" }]`.

### Asynchronous operations

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23asynchronous-operations%0A%0ASection%20title%3A%20Asynchronous%20operations' target='_blank' rel='noopener' data-askgpt='Asynchronous operations' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#asynchronous-operations' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23asynchronous-operations%0A%0ASection%20title%3A%20Asynchronous%20operations' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23asynchronous-operations%0A%0ASection%20title%3A%20Asynchronous%20operations' title='Ask ChatGPT about this section'>💬</a>
- Accept POST, return 202.
- Return a status URL: `Location: /jobs/456`.
- Client polls `GET /jobs/456` for status.
- Or use WebHook for callback.

## Problem Details (RFC 7807)

```json
{
    "type": "https://example.com/problems/out-of-credit",
    "title": "You do not have enough credit.",
    "status": 403,
    "detail": "Your current balance is 30, but that costs 50.",
    "instance": "/account/12345/msgs/abc",
    "balance": 30,
    "accounts": ["/account/12345", "/account/67890"]
}
```

## Pagination examples

### Offset-based

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23offset-based%0A%0ASection%20title%3A%20Offset-based' target='_blank' rel='noopener' data-askgpt='Offset-based' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#offset-based' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23offset-based%0A%0ASection%20title%3A%20Offset-based' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23offset-based%0A%0ASection%20title%3A%20Offset-based' title='Ask ChatGPT about this section'>💬</a>
```
GET /users?offset=20&limit=10

{
    "data": [...],
    "pagination": {
        "offset": 20,
        "limit": 10,
        "total": 1000
    }
}
```

### Cursor-based

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23cursor-based%0A%0ASection%20title%3A%20Cursor-based' target='_blank' rel='noopener' data-askgpt='Cursor-based' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/07-apis/references/rest-guidelines.md#cursor-based' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23cursor-based%0A%0ASection%20title%3A%20Cursor-based' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F07-apis%2Freferences%2Frest-guidelines.md%23cursor-based%0A%0ASection%20title%3A%20Cursor-based' title='Ask ChatGPT about this section'>💬</a>
```
GET /users?cursor=eyJpZCI6MTAwfQ==&limit=10

{
    "data": [...],
    "nextCursor": "eyJpZCI6MTEwfQ=="
}
```

## Filtering

```
GET /users?status=active&role=admin&createdAt=2024-01-01..2024-12-31
```

## Sort

```
GET /users?sort=-lastName,firstName
GET /users?sort=-createdAt:desc,lastName:asc
```

## Sparse fieldsets

```
GET /users?fields=id,name,email
```

## Standard error codes (RFC 7807 extension)

- `https://example.com/problems/validation`
- `https://example.com/problems/authentication`
- `https://example.com/problems/authorization`
- `https://example.com/problems/not-found`
- `https://example.com/problems/rate-limit`
- `https://example.com/problems/internal`

## Tools

- **OpenAPI Generator:** Generate clients from spec.
- **Postman:** API testing, documentation.
- **Insomnia:** REST and GraphQL client.
- **HTTPie:** Command-line HTTP client.

## Books

- *RESTful Web APIs* — Richardson, Amundsen, Ruby (O'Reilly).
- *REST in Practice* — Webber, Parastatidis, Robinson (O'Reilly).
- *API Design Patterns* — JJ Geewax (Manning).