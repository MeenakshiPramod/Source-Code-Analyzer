from langchain_community.vectorstores import Chroma

def create_vector_store(chunks, embedding_model):
    """
    Create a ChromaDB vector store from the given document chunks and embedding model.
    """
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory = "chroma_db" #to ensure that index survives a container restart
    )

    return vector_store