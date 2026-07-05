from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from game.game_manager import GameManager


app = FastAPI()



app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

game = GameManager()


class MessageRequest(BaseModel):

    message: str


@app.get("/")
def home():

    return {

        "message": "Welcome to Unspoken"

    }


@app.post("/start-game")
def start_game():

    return game.start_game()


@app.post("/send-message")
def send_message(request: MessageRequest):

    result = game.send_message(request.message)

    return {

        "reply": result["reply"],

        "mission_complete": result["evaluation"]["mission_complete"],

        "conversation_ended": result["evaluation"]["conversation_end"],

        "state":{

            "trust":result["state"].trust,

            "frustration":result["state"].frustration,

            "current_turn":result["state"].current_turn

        }

    }