import os
from dotenv import load_dotenv

# Load .env
load_dotenv()

# API Keys
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Validation
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set in .env")