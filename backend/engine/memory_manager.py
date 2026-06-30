from models.conversation_state import ConversationState


class MemoryManager:

    def add_message(self, state: ConversationState, speaker: str, message: str):
        state.conversation_history.append({
            "speaker": speaker,
            "message": message
        })

    def add_discovered_fact(self, state: ConversationState, fact: str):
        state.discovered_facts.append(fact)

    def add_promise(self, state: ConversationState, promise: str):
        state.promises.append(promise)

    def add_lie(self, state: ConversationState, lie: str):
        state.lies.append(lie)

    def get_history(self, state: ConversationState):
        return state.conversation_history