import re
from dataclasses import dataclass


@dataclass(frozen=True)
class LanguageResult:
    code: str
    name: str
    response_instruction: str
    is_mixed: bool = False


class LanguageDetector:
    SUPPORTED_LANGUAGES = {
        "en": "English",
        "hi": "Hindi",
        "ta": "Tamil",
        "te": "Telugu",
        "kn": "Kannada",
    }

    _SCRIPT_RANGES = {
        "hi": re.compile(r"[\u0900-\u097F]"),
        "ta": re.compile(r"[\u0B80-\u0BFF]"),
        "te": re.compile(r"[\u0C00-\u0C7F]"),
        "kn": re.compile(r"[\u0C80-\u0CFF]"),
    }

    _ROMAN_HINTS = {
        "hi": {
            "hai",
            "hain",
            "mera",
            "meri",
            "kya",
            "kaise",
            "ke liye",
            "chahiye",
            "banao",
            "vyapar",
            "bazaar",
            "vidyarthi",
            "shiksha",
            "naukri",
        },
        "ta": {
            "enna",
            "epdi",
            "eppadi",
            "venum",
            "illa",
            "irukku",
            "pannunga",
            "maanavar",
            "velai",
            "tamil",
            "tanglish",
            "startup ku",
            "students ku",
        },
        "te": {
            "naku",
            "naaku",
            "meeru",
            "ela",
            "kosam",
            "undi",
            "ledu",
            "cheyyali",
            "vidyarthi",
            "udyogam",
            "santosham",
            "telugu",
        },
        "kn": {
            "nanu",
            "nanage",
            "hege",
            "beku",
            "illa",
            "ide",
            "madi",
            "kannada",
            "vidyarthi",
            "udyoga",
            "sahaya",
        },
    }

    _INSTRUCTIONS = {
        "en": "Respond in natural, conversational English.",
        "hi": "Respond in natural conversational Hindi using Devanagari script.",
        "ta": "Respond in natural conversational Tamil using Tamil script.",
        "te": "Respond in natural conversational Telugu using Telugu script.",
        "kn": "Respond in natural conversational Kannada using Kannada script.",
    }

    def detect(self, text: str) -> LanguageResult:
        cleaned = (text or "").strip()
        if not cleaned:
            return self._result("en", False)

        script_counts = {
            code: len(pattern.findall(cleaned))
            for code, pattern in self._SCRIPT_RANGES.items()
        }
        dominant_code = max(script_counts, key=lambda x: script_counts[x])
        if script_counts[dominant_code] > 0:
            ascii_letters = len(re.findall(r"[A-Za-z]", cleaned))
            is_mixed = ascii_letters > 0 and script_counts[dominant_code] > 0
            return self._result(dominant_code, is_mixed)

        lowered = f" {cleaned.lower()} "
        hint_scores = {
            code: sum(1 for hint in hints if f" {hint} " in lowered)
            for code, hints in self._ROMAN_HINTS.items()
        }
        hinted_code = max(hint_scores, key=lambda x: hint_scores[x])
        if hint_scores[hinted_code] > 0:
            return self._result(hinted_code, True)

        return self._result("en", False)

    def _result(self, code: str, is_mixed: bool) -> LanguageResult:
        return LanguageResult(
            code=code,
            name=self.SUPPORTED_LANGUAGES[code],
            response_instruction=self._INSTRUCTIONS[code],
            is_mixed=is_mixed,
        )
