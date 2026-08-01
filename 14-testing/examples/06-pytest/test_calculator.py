"""06 — pytest basics (Python)"""
import pytest

# === Simple test (assertion-based) ===
def test_add():
    assert 1 + 1 == 2

def test_string_methods():
    assert "hello".upper() == "HELLO"

# === AAA pattern ===
def test_withdraw_money():
    # Arrange
    account = {"balance": 100}

    # Act
    account["balance"] -= 30

    # Assert
    assert account["balance"] == 70

# === Fixtures ===
@pytest.fixture
def sample_user():
    return {"id": 1, "name": "Alice", "email": "alice@example.com"}

@pytest.fixture
def database():
    """Simulated database with setup/teardown."""
    db = {"users": {}}
    yield db
    db.clear()  # teardown

def test_create_user(database, sample_user):
    database["users"][sample_user["id"]] = sample_user
    assert database["users"][1]["name"] == "Alice"

# === Parametrize ===
@pytest.mark.parametrize("input,expected", [
    (0, 0),
    (1, 1),
    (2, 4),
    (3, 9),
    (-1, 1),
])
def test_square(input, expected):
    assert input ** 2 == expected

# === Markers ===
@pytest.mark.slow
def test_expensive_computation():
    # Long-running test
    assert sum(range(10000)) > 0

# Run only fast tests:
# $ pytest -m "not slow"

# === Exception testing ===
def test_division_by_zero():
    with pytest.raises(ZeroDivisionError):
        1 / 0

# === Parametrized fixtures ===
@pytest.fixture(params=["chrome", "firefox", "safari"])
def browser(request):
    return request.param

def test_browser(browser):
    assert browser in ["chrome", "firefox", "safari"]

# === Mocking (pytest-mock) ===
def test_user_lookup(mocker):
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.json.return_value = {"name": "Alice"}

    # Pretend this calls requests.get
    import requests
    response = requests.get("https://api.example.com/users/1")

    assert response.json()["name"] == "Alice"
    mock_get.assert_called_once()

# === Asyncio testing ===
# @pytest.mark.asyncio
# async def test_async_function():
#     import asyncio
#     result = await asyncio.sleep(0.1, result="hello")
#     assert result == "hello"

# === Coverage report ===
# $ pytest --cov=myapp --cov-report=term-missing
# Name           Stmts   Miss  Cover
# ----------------------------------
# myapp/__init__      2      0   100%
# myapp/calculator   10      1    90%
# ----------------------------------
# TOTAL               12      1    92%

# === Markers configuration (pyproject.toml) ===
# [tool.pytest.ini_options]
# markers = [
#     "slow: marks tests as slow",
#     "integration: integration tests",
# ]