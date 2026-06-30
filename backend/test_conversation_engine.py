import os
from dotenv import load_dotenv

from models.character import Character
from models.case import Case
from models.conversation_state import ConversationState
from engine.conversation_engine import ConversationEngine

load_dotenv("../.env")

api_key = os.getenv("GEMINI_API_KEY")

alex = Character(
    name="Alex",
    age=13,
    gender="Male",
    occupation="Student",
    role="Child",
    relationship="Son",
    background="Recently started hating school.",
    hidden_core_belief="I'm bad at school anyway.",
    current_goal="Avoid homework"
)

case = Case(
    case_id="CASE_001",
    title="The Homework Rebel",
    difficulty="Easy",
    category="Family",
    mission_briefing="Convince Alex to do homework.",
    scenario_context="",
    player_role="Parent",
    character_role="Alex",
    player_objective="Convince Alex",
    character_objective="Avoid homework"
)

state = ConversationState()

engine = ConversationEngine(api_key)

reply = engine.process_message(
    alex,
    case,
    state,
    "Hey Alex, can we talk about your homework?"
)

print(reply)