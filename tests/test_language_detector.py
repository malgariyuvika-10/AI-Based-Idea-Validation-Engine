from backend.app.utils.language_detector import LanguageDetector

def test_detect_english():
    detector = LanguageDetector()
    result = detector.detect("This is a startup idea.")
    assert result.code == "en"
    assert not result.is_mixed

def test_detect_hindi_script():
    detector = LanguageDetector()
    result = detector.detect("यह एक स्टार्टअप विचार है।")
    assert result.code == "hi"
    assert not result.is_mixed

def test_detect_hindi_mixed():
    detector = LanguageDetector()
    result = detector.detect("मेरा startup idea बहुत अच्छा है।")
    assert result.code == "hi"
    assert result.is_mixed

def test_detect_hindi_roman():
    detector = LanguageDetector()
    result = detector.detect("Mera business plan students ke liye hai.")
    assert result.code == "hi"
    assert result.is_mixed

def test_detect_tamil_script():
    detector = LanguageDetector()
    result = detector.detect("இது ஒரு ஸ்டார்ட்அப் யோசனை.")
    assert result.code == "ta"
    assert not result.is_mixed

def test_detect_tamil_roman():
    detector = LanguageDetector()
    result = detector.detect("Enna epdi irukku indha idea?")
    assert result.code == "ta"
    assert result.is_mixed

def test_detect_telugu_script():
    detector = LanguageDetector()
    result = detector.detect("ఇది ఒక స్టార్టప్ ఆలోచన.")
    assert result.code == "te"
    assert not result.is_mixed

def test_detect_telugu_roman():
    detector = LanguageDetector()
    result = detector.detect("Naku oka idea undi.")
    assert result.code == "te"
    assert result.is_mixed

def test_detect_kannada_script():
    detector = LanguageDetector()
    result = detector.detect("ಇದು ಒಂದು ಸ್ಟಾರ್ಟ್ಅಪ್ ಕಲ್ಪನೆ.")
    assert result.code == "kn"
    assert not result.is_mixed

def test_detect_kannada_roman():
    detector = LanguageDetector()
    result = detector.detect("Nanu hege help madi?")
    assert result.code == "kn"
    assert result.is_mixed

def test_detect_empty():
    detector = LanguageDetector()
    result = detector.detect("")
    assert result.code == "en"

def test_detect_none():
    detector = LanguageDetector()
    result = detector.detect(None)
    assert result.code == "en"
