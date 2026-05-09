# #from langchain_community.vectorstores import Chroma
# from langchain_chroma import Chroma

# PERSIST_DIRECTORY = "chroma_db" # Directory to persist the ChromaDB index

# def create_vector_store(chunks, embedding_model):
#     """
#     Create a ChromaDB vector store from the given document chunks and embedding model.
#     """
#     vector_store = Chroma.from_documents(
#         documents=chunks,
#         embedding=embedding_model,
#         persist_directory = PERSIST_DIRECTORY #to ensure that index survives a container restart
#     )

#     return vector_store

# def load_vector_store(embedding_model):
#     """
#     Load the ChromaDB vector store from the persistent directory.
#     """
#     vector_store = Chroma(
#         embedding_function=embedding_model,
#         persist_directory = PERSIST_DIRECTORY
#     )

#     return vector_store

from langchain_chroma import Chroma
import os

BASE_DB_DIR = "chroma_db"

def create_vector_store(
    chunks,
    embedding_model,
    repo_name
):

    persist_directory = os.path.join(
        BASE_DB_DIR,
        repo_name
    )

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=persist_directory
    )

    return vector_store


def load_vector_store(
    embedding_model,
    repo_name
):

    persist_directory = os.path.join(
        BASE_DB_DIR,
        repo_name
    )

    vector_store = Chroma(
        persist_directory=persist_directory,
        embedding_function=embedding_model
    )

    return vector_store