from models.character import Character
from models.case import Case
from models.conversation_state import ConversationState
from engine.conversation_engine import ConversationEngine
from loaders.character_loader import load_character
from loaders.case_loader import load_case

class GameManager:

    def __init__(self):

        self.engine = None

        self.character = None
        self.case = None
        self.state = None

    def set_api_key(self, api_key):

        self.engine = ConversationEngine(api_key)

    def start_game(self):

        if self.engine is None:

            return {

                "error": "API key not configured."

            }

        self.character = load_character("alex.json")

        self.case = load_case("case_001.json")

        self.state = ConversationState()

        return {

            "message": "Game Started",

            "character": self.character.name,

            "case": self.case.title

        }

    def send_message(self, message):

        return self.engine.process_message(
            self.character,
            self.case,
            self.state,
            message
        )