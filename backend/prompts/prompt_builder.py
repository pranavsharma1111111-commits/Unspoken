from pathlib import Path

from models.character import Character
from models.case import Case
from models.conversation_state import ConversationState


class PromptBuilder:

    def build_prompt(
        self,
        character: Character,
        case: Case,
        state: ConversationState,
        player_message: str
    ):

        system_prompt = (
        Path(__file__).parent / "templates" / "character_system_prompt.txt"
        ).read_text(encoding="utf-8")

        prompt = f"""
=========================
SYSTEM RULES
=========================

{system_prompt}

=========================
CHARACTER PROFILE
=========================

Name: {character.name}
Age: {character.age}
Gender: {character.gender}
Occupation: {character.occupation}
Role: {character.role}
Relationship: {character.relationship}

Background:
{character.background}

Personality:
{character.personality}

Values:
{character.values}

Fears:
{character.fears}

Hidden Core Belief:
{character.hidden_core_belief}

Current Goal:
{character.current_goal}

Resistance Points:
{character.resistance_points}

=========================
CASE
=========================

Title:
{case.title}

Difficulty:
{case.difficulty}

Category:
{case.category}

Mission Briefing:
{case.mission_briefing}

Scenario:
{case.scenario_context}

Player Role:
{case.player_role}

Character Role:
{case.character_role}

Player Objective:
{case.player_objective}

Character Objective:
{case.character_objective}

Constraints:
{case.constraints}

=========================
CURRENT CONVERSATION STATE
=========================

Trust: {state.trust}
Respect: {state.respect}
Frustration: {state.frustration}
Hope: {state.hope}
Stress: {state.stress}
Curiosity: {state.curiosity}
Openness: {state.openness}
Defensiveness: {state.defensiveness}

Current Turn:
{state.current_turn}

=========================
MEMORY
=========================

Conversation History:
{state.conversation_history}

Discovered Facts:
{state.discovered_facts}

Promises:
{state.promises}

Lies:
{state.lies}

=========================
PLAYER MESSAGE
=========================

{player_message}

=========================
YOUR TASK
=========================

Respond ONLY as the character.

Do not explain your reasoning.

Stay in character at all times.
"""

        return prompt