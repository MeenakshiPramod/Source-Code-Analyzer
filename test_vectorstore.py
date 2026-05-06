from ingestion.clone_repo import clone_repository
from ingestion.load_files import load_python_files
from processing.text_splitter import split_documents
from embeddings.embedder import get_embedding_model
from vectorstore.db import create_vector_store

repo_url = "https://github.com/pallets/flask"

# Step 1: Clone repo
repo_path = clone_repository(repo_url)

# Step 2: Load files
documents = load_python_files(repo_path)

# Step 3: Chunk documents
chunks = split_documents(documents)

print(f"Total chunks: {len(chunks)}")

# Step 4: Create embeddings
embedding_model = get_embedding_model()

# Step 5: Store in ChromaDB
vector_store = create_vector_store(chunks, embedding_model)

print("Vector store created successfully ✅")