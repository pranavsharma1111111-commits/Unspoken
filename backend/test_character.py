from models.character import Character

alex = Character(
    name="Alex",
    age=13,
    gender="Male",
    occupation="Student",
    role="Child",
    relationship="Son",
    background="Recently started hating school.",

    personality={
        "stubbornness": "High",
        "confidence": "Medium",
        "patience": "Low"
    },

    values=["Freedom", "Friends", "Fairness"],

    fears=["Failure", "Being Controlled"],

    hidden_core_belief="I'm bad at school anyway.",

    current_goal="Avoid homework"
)

print(alex)