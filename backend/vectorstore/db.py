#from langchain_community.vectorstores import Chroma
from langchain_chroma import Chroma

PERSIST_DIRECTORY = "chroma_db" # Directory to persist the ChromaDB index

def create_vector_store(chunks, embedding_model):
    """
    Create a ChromaDB vector store from the given document chunks and embedding model.
    """
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory = PERSIST_DIRECTORY #to ensure that index survives a container restart
    )

    return vector_store

def load_vector_store(embedding_model):
    """
    Load the ChromaDB vector store from the persistent directory.
    """
    vector_store = Chroma(
        embedding_function=embedding_model,
        persist_directory = PERSIST_DIRECTORY
    )

    return vector_store