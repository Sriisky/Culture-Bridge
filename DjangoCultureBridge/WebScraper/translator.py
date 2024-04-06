# File to perform translations using the Google Cloud Translation API

import os
from google.cloud import translate_v2 as translate

# Load and set the Google Cloud credentials environment variable from the json file.
def load_credentials():
    # Path to the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    credentials_path = os.path.join(script_dir, '..', 'google-credentials.json')

    if not credentials_path:
        raise ValueError("The GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.")
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path

# Function to translate the text
def translate_text(text, target_language="en"):
    load_credentials()
    # Initialize the Google Cloud Translation client
    translate_client = translate.Client()

    # Perform the translation
    result = translate_client.translate(text, target_language=target_language)

    return result["translatedText"]
