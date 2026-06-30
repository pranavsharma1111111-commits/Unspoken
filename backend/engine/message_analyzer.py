class MessageAnalyzer:

    def analyze(self, message: str):

        message = message.lower()

        if "sorry" in message:
            return {
                "intent": "apology",
                "confidence": 1.0,
                "reason": "Detected keyword 'sorry'."
            }

        elif "promise" in message:
            return {
                "intent": "promise",
                "confidence": 1.0,
                "reason": "Detected keyword 'promise'."
            }

        elif "please" in message:
            return {
                "intent": "request",
                "confidence": 0.9,
                "reason": "Detected keyword 'please'."
            }

        elif "?" in message:
            return {
                "intent": "question",
                "confidence": 0.9,
                "reason": "Detected keyword '?'."
            }

        elif "understand" in message:
            return {
                "intent": "empathy",
                "confidence": 0.9,
                "reason": "Detected keyword 'understand'."
            }

        elif "stupid" in message or "idiot" in message:
            return {
                "intent": "insult",
                "confidence": 0.9,
                "reason": "Detected keyword 'stupid' or 'idiot'."
            }

        elif "or else" in message:
            return {
                "intent": "threat",
                "confidence": 0.9,
                "reason": "Detected keyword 'or else'."
            }

        else:
            return {
                "intent": "other",
                "confidence": 0.5,
                "reason": "No matching rule."
            }