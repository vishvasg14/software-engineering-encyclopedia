# pytest Documentation Reference

The authoritative source for pytest is the official documentation. This file catalogs the pytest documentation pages referenced in the Testing document.

## Primary documentation

- **pytest:** <https://docs.pytest.org/
- **pytest GitHub:** <https://github.com/pytest-dev/pytest>
- **pytest plugins:** <https://docs.pytest.org/en/latest/reference/plugin_list.html>
- **tox:** <https://tox.wiki/>

## Key features

| Feature | Description |
|---------|-------------|
| **Assertions** | Plain `assert` (rich introspection) |
| **Fixtures** | Dependency injection for tests |
| **Markers** | `@pytest.mark.slow`, `@pytest.mark.skip` |
| **Parametrize** | `@pytest.mark.parametrize` |
| **Plugins** | `pytest-cov`, `pytest-mock`, `pytest-asyncio` |
| **Configuration** | `pytest.ini`, `pyproject.toml` |
| **Test discovery** | `test_*.py`, `*_test.py` |

## Plain assert with introspection

```python
def test_list():
    items = [1, 2, 3]
    assert items == [1, 2, 3]
    assert 1 in items
    assert len(items) == 3
```

pytest shows **intelligent diff output** on failure.

## Fixtures

```python
import pytest

@pytest.fixture
def db():
    """Database fixture with cleanup."""
    conn = create_connection()
    yield conn
    conn.close()  # teardown

@pytest.fixture
def user(db):
    """Depends on db fixture."""
    user = db.create_user("alice", "alice@example.com")
    yield user
    db.delete_user(user.id)

def test_user_email(user):
    assert user.email == "alice@example.com"
```

## Fixture scopes

```python
@pytest.fixture(scope="function")  # default
@pytest.fixture(scope="class")
@pytest.fixture(scope="module")
@pytest.fixture(scope="session")   # once per test session
```

## Parametrize

```python
@pytest.mark.parametrize("input,expected", [
    (1, 1),
    (2, 4),
    (3, 9),
    (4, 16),
])
def test_square(input, expected):
    assert input ** 2 == expected
```

## Markers

```python
@pytest.mark.skip(reason="not yet implemented")
@pytest.mark.skipif(sys.version_info < (3, 10), reason="requires 3.10+")
@pytest.mark.xfail(reason="known bug")
@pytest.mark.slow
@pytest.mark.integration
def test_something():
    ...

# Run only fast tests
# $ pytest -m "not slow"
```

## Fixtures in conftest.py

```python
# tests/conftest.py
import pytest

@pytest.fixture(scope="session")
def docker_compose_file(pytestconfig):
    return pytestconfig.rootdir / "docker-compose.yml"

@pytest.fixture(scope="session")
def postgres_service(docker_compose_file, docker_services):
    """Start Postgres via docker-compose."""
    ...
```

## conftest.py hierarchy

```python
# tests/conftest.py
# tests/unit/conftest.py
# tests/integration/conftest.py
```

## Markers config

```ini
# pyproject.toml
[tool.pytest.ini_options]
markers = [
    "slow: marks tests as slow",
    "integration: integration tests",
    "e2e: end-to-end tests",
]
testpaths = ["tests"]
addopts = "-ra -q"
```

## Common plugins

| Plugin | Purpose |
|--------|---------|
| `pytest-cov` | Code coverage |
| `pytest-mock` | Mocking (mocker fixture) |
| `pytest-asyncio` | Async test support |
| `pytest-xdist` | Parallel test execution |
| `pytest-cov` | Coverage reports |
| `pytest-bdd` | BDD (Given/When/Then) |
| `pytest-postgresql` | PostgreSQL fixtures |

## Async testing

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
    result = await some_async_call()
    assert result == "expected"
```

## Mark.parametrize with ids

```python
@pytest.mark.parametrize("value,expected", [
    ("input1", "output1"),
    ("input2", "output2"),
], ids=["case 1", "case 2"])
def test_function(value, expected):
    assert process(value) == expected
```

## Test discovery

```bash
# By default, pytest looks for:
# test_*.py or *_test.py
# functions/methods starting with test_

# Run all tests
pytest

# Run specific file
pytest tests/test_user.py

# Run specific test
pytest tests/test_user.py::test_create_user

# Run by marker
pytest -m "not slow"
```

## Fixture finalization

```python
@pytest.fixture
def resource():
    res = acquire()
    yield res
    release(res)  # finalizer (always runs)
```

## Monkeypatching

```python
def test_api_call(monkeypatch):
    def fake_get(*args, **kwargs):
        return MockResponse(200, '{"data": "fake"}')
    monkeypatch.setattr("requests.get", fake_get)
    # test code
```

## Parametrizing fixtures

```python
@pytest.fixture(params=["chrome", "firefox", "safari"])
def browser(request):
    return request.param

def test_foo(browser):
    # runs once per browser
    ...
```

## Mocking with pytest-mock

```python
def test_user(mocker):
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.json.return_value = {"name": "Alice"}
    
    response = fetch_user()
    assert response["name"] == "Alice"
    mock_get.assert_called_once()
```

## Configuration files

```ini
# pytest.ini
[pytest]
testpaths = tests
addopts = -ra -q
markers = slow: slow tests
```

```toml
# pyproject.toml
[tool.pytest.ini_options]
testpaths = ["tests"]
```

## Coverage

```bash
# Terminal report
pytest --cov=myapp

# HTML report
pytest --cov=myapp --cov-report=html

# Fail if coverage below threshold
pytest --cov=myapp --cov-fail-under=90
```

## Tools

- **pytest:** <https://docs.pytest.org/>
- **coverage.py:** <https://coverage.readthedocs.io/>
- **tox:** <https://tox.wiki/>
- **nox:** <https://nox.thea.codes/>
- **pytest-xdist:** parallel test execution.