def test_smoke():
    result = 2 + 2
    if result != 4:
        raise AssertionError("Smoke test failed")
