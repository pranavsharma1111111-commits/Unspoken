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
class ApiKeyRequest(BaseModel):

        api_key: str


@app.get("/")
def home():

    return {

        "message": "Welcome to Unspoken"

    }

@app.post("/set-api-key")
def set_api_key(request: ApiKeyRequest):

    game.set_api_key(request.api_key)

    return {

        "message": "API key saved successfully."

    }
@app.post("/start-game")
def start_game():

    return game.start_game()


@app.post("/send-message")
def send_message(request: MessageRequest):

    try:

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

    except Exception as error:

        return {

            "error": str(error)

        }