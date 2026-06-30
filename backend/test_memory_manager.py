from models.conversation_state import ConversationState
from engine.memory_manager import MemoryManager

state = ConversationState()
memory = MemoryManager()

memory.add_message(state, "Player", "I understand how you feel.")
memory.add_message(state, "Alex", "You really do?")
memory.add_promise(state, "I won't force you.")
memory.add_discovered_fact(state, "Alex is afraid of failure.")

print(state)