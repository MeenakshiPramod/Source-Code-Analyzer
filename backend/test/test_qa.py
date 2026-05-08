from embeddings.embedder import get_embedding_model
from vectorstore.db import load_vector_store
from chatbot.qa_chain import create_qa_chain

# Step 1: Load embeddings
embedding_model = get_embedding_model()

# Step 2: Load vector DB
vector_store = load_vector_store(embedding_model)

# Step 3: Create retriever
retriever = vector_store.as_retriever(
    search_kwargs={"k": 3}
)

# Step 4: Create QA chain
qa_chain = create_qa_chain(retriever)

# Step 5: Ask question
query = "How does Flask create an application?"

response = qa_chain.invoke({"query": query})

print("\n===== AI RESPONSE =====\n")
print(response["result"])