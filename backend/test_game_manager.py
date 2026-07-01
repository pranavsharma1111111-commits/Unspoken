from game.game_manager import GameManager

game = GameManager()

print(game.start_game())

reply = game.send_message(
    "Hey Alex, I understand how you feel."
)

print(reply["reply"])