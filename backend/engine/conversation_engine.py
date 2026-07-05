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



    def process_message(

        self,

        character,

        case,

        state,

        player_message

    ):


        analysis = self.analyzer.analyze(

            player_message

        )


        self.memory.add_message(

            state,

            "Player",

            player_message

        )


        self.state_manager.apply_analysis(

            state,

            analysis

        )

        self.state_manager.next_turn(

            state

        )

        prompt = self.prompt_builder.build_prompt(

            character,

            case,

            state,

            player_message

        )


        reply = self.llm.generate(

            prompt

        )


        self.memory.add_message(

            state,

            character.name,

            reply

        )


        evaluation = self.evaluator.evaluate(

            reply

        )


        if evaluation["mission_complete"]:

            self.state_manager.complete_mission(

                state

            )

        if evaluation["conversation_end"]:

            self.state_manager.end_conversation(

                state

            )


        return {

            "reply": reply,

            "analysis": analysis,

            "evaluation": evaluation,

            "state": state

        }