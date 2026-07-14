import google.generativeai as genai


class LLMWrapper:

    def __init__(self, api_key):

        genai.configure(api_key=api_key)

        self.model = genai.GenerativeModel("gemini-2.5-flash")


    def generate(self, prompt):

        try:

            response = self.model.generate_content(prompt)

            return response.text

        except Exception as error:

            message = str(error)

            if "API_KEY" in message.upper():

                raise Exception(

                    "Invalid Gemini API key. Please check your Settings."

                )

            raise Exception(

                "Unable to contact Gemini. Please try again."

            )