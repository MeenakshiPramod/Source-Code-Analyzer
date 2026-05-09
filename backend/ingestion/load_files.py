import os
from langchain_community.document_loaders import TextLoader

SUPPORTED_EXTENSIONS = (
    ".py",
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".java",
    ".kt",
    ".go",
    ".cpp",
    ".c",
    ".cs",
    ".php",
    ".rb",
    ".rs"
)

def load_python_files(repo_path):

    documents = []

    for root, _, files in os.walk(repo_path):

        for file in files:

            if file.endswith(SUPPORTED_EXTENSIONS):

                file_path = os.path.join(root, file)

                try:

                    loader = TextLoader(
                        file_path,
                        encoding="utf-8"
                    )

                    docs = loader.load()

                    for doc in docs:
                        doc.metadata["source"] = file_path

                    documents.extend(docs)

                except Exception as e:

                    print(
                        f"Error loading {file_path}: {e}"
                    )

    return documents