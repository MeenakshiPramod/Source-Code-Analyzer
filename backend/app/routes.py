from flask import Blueprint, request, jsonify

from ingestion.clone_repo import clone_repository
from ingestion.load_files import load_python_files

from processing.text_splitter import split_documents

from embeddings.embedder import get_embedding_model

from vectorstore.db import (
    create_vector_store,
    load_vector_store
)

from chatbot.qa_chain import create_qa_chain

main = Blueprint('main', __name__)

# Global QA chain
qa_chain = None


@main.route('/')
def home():

    return jsonify({
        "message": "Realtime Source Code Analyzer API Running 🚀"
    })


@main.route('/analyze', methods=['POST'])
def analyze():

    global qa_chain

    try:

        data = request.get_json()

        repo_url = data.get("repo_url")

        if not repo_url:
            return jsonify({
                "error": "Repository URL is required"
            }), 400

        print(f"Analyzing: {repo_url}")

        # STEP 1 — Clone repo
        repo_path = clone_repository(repo_url)
        repo_name = repo_url.split("/")[-1].replace(".git", "")

        # STEP 2 — Load files
        documents = load_python_files(repo_path)

        # STEP 3 — Split documents
        chunks = split_documents(documents)

        print(f"Total chunks: {len(chunks)}")

        # STEP 4 — Create embeddings
        embedding_model = get_embedding_model()

        # STEP 5 — Create vector DB
        create_vector_store(
            chunks,
            embedding_model,
            repo_name
        )   

        # STEP 6 — Load vector store
        vector_store = load_vector_store(
            embedding_model,
            repo_name
        )

        # STEP 7 — Create retriever
        retriever = vector_store.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 5}
        )

        # STEP 8 — Create QA chain
        qa_chain = create_qa_chain(retriever)

        return jsonify({
            "message": "Repository analyzed successfully ✅",
            "total_chunks": len(chunks)
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@main.route('/chat', methods=['POST'])
def chat():

    global qa_chain

    try:

        if qa_chain is None:
            return jsonify({
                "error": "Analyze repository first"
            }), 400

        data = request.get_json()

        question = data.get("question")

        if not question:
            return jsonify({
                "error": "Question is required"
            }), 400

        print(f"Question: {question}")

        # Ask AI
        response = qa_chain.invoke({
        "question": question
        })

        # IMPORTANT FIX
        answer = response["answer"]

        source_documents = response.get(
            "source_documents", []
        )

        sources = []

        for doc in source_documents:

            source = doc.metadata.get(
                "source",
                "Unknown"
            )

            source_name = source.split("\\")[-1]

            source_data = {
                "file": source_name,
                "content": doc.page_content
            }

            if source_data not in sources:
                sources.append(source_data)
            

        return jsonify({
            "question": question,
            "answer": answer,
            "sources": sources
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500