from dataclasses import dataclass, field


@dataclass
class Character:
    # Basic Identity
    name: str
    age: int
    gender: str
    occupation: str
    role: str
    relationship: str
    background: str

    # Personality
    personality: dict = field(default_factory=dict)

    # Values
    values: list = field(default_factory=list)

    # Fears
    fears: list = field(default_factory=list)

    # Hidden Information
    hidden_core_belief: str = ""
    secret: str = ""

    # Current Goal
    current_goal: str = ""

    # Mission Resistance
    resistance_points: list = field(default_factory=list)

    # Conversation Style
    conversation_style: dict = field(default_factory=dict)

    # Conversation Boundaries
    conversation_boundaries: list = field(default_factory=list)

    # Dynamic Emotional State
    emotional_state: dict = field(default_factory=dict)

    # Conversation Memory
    conversation_memory: dict = field(default_factory=dict)

    # Decision Rules
    decision_rules: list = field(default_factory=list)

    # Growth Rules
    growth_rules: list = field(default_factory=list)