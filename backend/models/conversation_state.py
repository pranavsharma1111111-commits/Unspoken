from dataclasses import dataclass, field


@dataclass
class ConversationState:
    # Emotional State
    trust: int = 50
    respect: int = 50
    frustration: int = 0
    hope: int = 50
    stress: int = 50
    curiosity: int = 50
    openness: int = 50
    defensiveness: int = 50

    # Conversation Progress
    current_turn: int = 0
    message_limit: int = 25
    mission_complete: bool = False
    conversation_ended: bool = False

    # Runtime Data
    conversation_history: list = field(default_factory=list)
    discovered_facts: list = field(default_factory=list)
    promises: list = field(default_factory=list)
    lies: list = field(default_factory=list)