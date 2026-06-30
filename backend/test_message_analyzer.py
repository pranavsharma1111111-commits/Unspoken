from engine.message_analyzer import MessageAnalyzer

analyzer = MessageAnalyzer()

messages = [
    "I'm sorry.",
    "Please do your homework.",
    "I understand how you feel.",
    "You are stupid.",
    "Do you hate school?",
    "I promise I won't force you."
]

for message in messages:
    print(message)
    print(analyzer.analyze(message))
    print()