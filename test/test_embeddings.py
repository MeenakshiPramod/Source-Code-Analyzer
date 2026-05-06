from ingestion.clone_repo import clone_repository
from ingestion.load_files import load_python_files
from processing.text_splitter import split_documents
from embeddings.embedder import get_embedding_model

repo_url = "https://github.com/pallets/flask"

# Step 1: Clone
repo_path = clone_repository(repo_url)

# Step 2: Load
documents = load_python_files(repo_path)

# Step 3: Chunk
chunks = split_documents(documents)

# Step 4: Embeddings
embedding_model = get_embedding_model()

# Test embedding
vector = embedding_model.embed_query(chunks[0].page_content)

print("Embedding created successfully ✅")
print(f"Vector length: {len(vector)}")
print("\nFirst 10 values:")
print(vector[:10])