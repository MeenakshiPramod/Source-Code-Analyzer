import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get API key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Optional check
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in .env file")