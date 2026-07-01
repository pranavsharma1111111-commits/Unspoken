from prompts.prompt_builder import PromptBuilder
from llm.llm_wrapper import LLMWrapper
from engine.memory_manager import MemoryManager
from engine.message_analyzer import MessageAnalyzer
from engine.response_evaluator import ResponseEvaluator
from engine.state_manager import StateManager


class ConversationEngine:

    def __init__(self, api_key):
        self.prompt_builder = PromptBuilder()
        self.llm = LLMWrapper(api_key)
        self.memory = MemoryManager()
        self.analyzer = MessageAnalyzer()
        self.evaluator = ResponseEvaluator()
        self.state_manager = StateManager()

    def process_message(self, character, case, state, player_message):

        # Analyze player message
        analysis = self.analyzer.analyze(player_message)

        # Save player's message
        self.memory.add_message(state, "Player", player_message)

        # Simple state updates based on intent
        if analysis["intent"] == "apology":
            self.state_manager.increase_trust(state, 5)

        elif analysis["intent"] == "empathy":
            self.state_manager.increase_trust(state, 10)
            self.state_manager.decrease_frustration(state, 5)

        elif analysis["intent"] == "insult":
            self.state_manager.decrease_trust(state, 10)
            self.state_manager.increase_frustration(state, 10)

        elif analysis["intent"] == "threat":
            self.state_manager.decrease_trust(state, 15)
            self.state_manager.increase_frustration(state, 15)

        self.state_manager.next_turn(state)

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

        # Evaluate response
        result = self.evaluator.evaluate(reply)

        if result["mission_complete"]:
            self.state_manager.complete_mission(state)

        if result["conversation_end"]:
            self.state_manager.end_conversation(state)

        return {
            "reply": reply,
            "analysis": analysis,
            "evaluation": result,
            "state": state
        }