import json
from pathlib import Path

from models.case import Case


def load_case(filename):

    path = (
        Path(__file__).parent.parent
        / "data"
        / "cases"
        / filename
    )

    with open(path, "r", encoding="utf-8") as file:
        data = json.load(file)

    return Case(**data)