# CodeMind AI

### AI-Powered Repository Intelligence Platform

CodeMind AI is a full-stack Retrieval-Augmented Generation (RAG) platform that enables developers to analyze, understand, and interact with GitHub repositories through natural language conversations.

The platform clones repositories, processes source code, generates vector embeddings using Hugging Face models, stores them in ChromaDB, and uses Groq-powered LLMs to answer repository-specific questions with source-aware responses.

---

## Features

### Repository Analysis

* Analyze any public GitHub repository
* Automatic repository cloning
* Source code ingestion and preprocessing
* Intelligent code chunking

### AI-Powered Repository Understanding

* Conversational codebase exploration
* Project architecture analysis
* Workflow explanation
* API route understanding
* Database interaction insights
* Important file identification

### Retrieval-Augmented Generation (RAG)

* Semantic code search
* Context-aware responses
* Repository-specific answers
* Source-aware retrieval

### Modern Chat Experience

* Chat history management
* Multiple chat sessions
* Delete individual chats
* Clear all chats
* Suggested questions

### Enhanced User Experience

* Markdown rendering
* Syntax-highlighted code blocks
* One-click code copy
* Source references
* Responsive UI
* Mobile-friendly design

---

## Architecture

```text
GitHub Repository
        |
        v
 Repository Cloner
        |
        v
 Source Code Loader
        |
        v
 Document Chunking
        |
        v
 Hugging Face Embeddings
        |
        v
      ChromaDB
        |
        v
    Retriever
        |
        v
   Groq LLM
        |
        v
  AI Response Engine
        |
        v
   Next.js Frontend
```

---

## Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Axios
* React Markdown
* React Syntax Highlighter
* Lucide React

### Backend

* Python
* Flask
* LangChain
* Groq API
* ChromaDB
* Hugging Face Embeddings
* GitPython

### AI & RAG

* Llama 3.1 8B Instant (Groq)
* all-MiniLM-L6-v2 Embeddings
* ChromaDB Vector Store
* LangChain RetrievalQA

---

## Project Structure

```text
CodeMind-AI
|
+-- backend
|   +-- app
|   |   +-- routes.py
|   |   +-- chatbot
|   |   +-- embeddings
|   |   +-- ingestion
|   |   +-- processing
|   |   +-- vectorstore
|   |   +-- utils
|   |
|   +-- run.py
|
+-- frontend
|   +-- app
|   +-- components
|   +-- services
|   +-- types
|   +-- utils
|
+-- README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd CodeMind-AI
```

---

## Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Create .env File

```env
GROQ_API_KEY=your_groq_api_key
```

### Run Backend

```bash
python run.py
```

Backend runs on:

```text
http://127.0.0.1:5000
```

---

## Frontend Setup

### Install Packages

```bash
npm install
```

### Create .env.local

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

### Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Usage

### Analyze Repository

Paste a GitHub repository URL:

```text
https://github.com/pallets/flask.git
```

Click:

```text
Analyze
```

---

### Ask Questions

Examples:

```text
Explain the project architecture
```

```text
How does authentication work?
```

```text
What are the main API routes?
```

```text
Which files are most important?
```

```text
Explain the project workflow
```

---

## Screenshots

### Repository Analysis

*Add screenshot here*

### AI Chat Interface

*Add screenshot here*

### Source References

*Add screenshot here*

### Mobile Responsive View

*Add screenshot here*

---

## Key Learnings

Through this project I gained hands-on experience with:

* Retrieval-Augmented Generation (RAG)
* Vector Databases
* ChromaDB
* LangChain
* Semantic Search
* Prompt Engineering
* Full Stack Development
* API Design
* AI Application Development
* Responsive UI Development

---

## Future Enhancements

* Repository comparison
* Repository summarization reports
* Multi-repository chat
* User authentication
* Cloud vector database support
* Repository visualization dashboard
* PDF export of analysis
* Team collaboration features

---

## Author

**Meenakshi Pramod**

B.Tech Computer Science & Engineering

Passionate about:

* Artificial Intelligence
* Generative AI
* Cybersecurity
* Full Stack Development
* Problem Solving

LinkedIn: *Add LinkedIn URL*

GitHub: *Add GitHub URL*

---

## License

This project is licensed under the MIT License.

---

If you found this project useful, consider giving it a star on GitHub.