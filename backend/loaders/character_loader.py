import json
from pathlib import Path

from models.character import Character


def load_character(filename):

    path = (
        Path(__file__).parent.parent
        / "data"
        / "characters"
        / filename
    )

    with open(path, "r", encoding="utf-8") as file:
        data = json.load(file)

    return Character(**data)