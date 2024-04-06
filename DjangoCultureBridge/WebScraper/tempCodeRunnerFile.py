import os
from google.cloud import translate_v2 as translate
from dotenv import load_dotenv

def load_credentials():
    """Load and set the Google Cloud credentials environment variable from the .env file."""
    dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'keys.env')
    load_dotenv(dotenv_path)
    credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    print("Credentials path set to:", os.environ["GOOGLE_APPLICATION_CREDENTIALS"])

    if not credentials_path:
        raise ValueError("The GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.")
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path

def translate_text(text, target_language="en"):
    """Translate text into the target language using Google Cloud Translation API."""
    # Load credentials from the .env file
    load_credentials()

    # Initialize the Google Cloud Translation client
    translate_client = translate.Client()

    # Perform the translation
    result = translate_client.translate(text, target_language=target_language)

    return result["translatedText"]

if __name__ == "__main__":
    # Example usage
    text_to_translate = "Bonjour le monde"
    translated_text = translate_text(text_to_translate, "en")
    print(f"Original text: {text_to_translate}")
    print(f"Translated text: {translated_text}")
