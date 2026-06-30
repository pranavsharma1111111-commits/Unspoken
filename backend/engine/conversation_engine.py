from prompts.prompt_builder import PromptBuilder
from llm.llm_wrapper import LLMWrapper
from engine.memory_manager import MemoryManager


class ConversationEngine:

    def __init__(self, api_key):
        self.prompt_builder = PromptBuilder()
        self.llm = LLMWrapper(api_key)
        self.memory = MemoryManager()

    def process_message(self, character, case, state, player_message):

        # Save player's message
        self.memory.add_message(state, "Player", player_message)

        # Build prompt
        prompt = self.prompt_builder.build_prompt(
            character,
            case,
            state,
            player_message
        )

        # Get AI response
        reply = self.llm.generate(prompt)

        # Save AI reply
        self.memory.add_message(state, character.name, reply)

        return reply