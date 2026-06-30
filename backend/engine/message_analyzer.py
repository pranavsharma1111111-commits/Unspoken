class MessageAnalyzer:

    def analyze(self, message: str):

        message = message.lower()

        if "sorry" in message:
            return "apology"

        elif "promise" in message:
            return "promise"

        elif "please" in message:
            return "request"

        elif "?" in message:
            return "question"

        elif "understand" in message:
            return "empathy"

        elif "stupid" in message or "idiot" in message:
            return "insult"

        elif "or else" in message:
            return "threat"

        else:
            return "other"