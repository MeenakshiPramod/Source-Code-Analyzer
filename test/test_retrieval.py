from embeddings.embedder import get_embedding_model
from vectorstore.db import load_vector_store

# Step 1: Load embedding model
embedding_model = get_embedding_model()

# Step 2: Load vector DB
vector_store = load_vector_store(embedding_model)

# Step 3: Create retriever
retriever = vector_store.as_retriever(
    search_kwargs={"k": 3}
)

# Step 4: Ask question
query = "How does Flask create an application?"

results = retriever.invoke(query)

print(f"Retrieved {len(results)} documents\n")

for i, doc in enumerate(results):
    print(f"\n===== Result {i+1} =====")
    print(doc.page_content[:500])
    print("\nSource:", doc.metadata.get("source"))