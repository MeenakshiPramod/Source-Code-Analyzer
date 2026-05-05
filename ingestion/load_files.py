import os
from langchain_community.document_loaders import TextLoader

def load_python_files(repo_path):
    """
    Load all Python (.py) files from a repository
    """

    documents = []

    for root, _, files in os.walk(repo_path):
        for file in files:
            if file.endswith(".py"):
                file_path = os.path.join(root, file)

                try:
                    loader = TextLoader(file_path, encoding="utf-8")
                    docs = loader.load()

                    # Add metadata (important later)
                    for doc in docs:
                        doc.metadata["source"] = file_path

                    documents.extend(docs)

                except Exception as e:
                    print(f"Error loading {file_path}: {e}")

    return documents