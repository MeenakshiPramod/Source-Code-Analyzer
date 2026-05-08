from embeddings.embedder import get_embedding_model
from vectorstore.db import load_vector_store
from chatbot.qa_chain import create_qa_chain

# Load embedding model
embedding_model = get_embedding_model()

# Load vector DB
vector_store = load_vector_store(embedding_model)

# Create retriever
retriever = vector_store.as_retriever(
    search_kwargs={"k": 3}
)

# Create conversational QA chain
qa_chain = create_qa_chain(retriever)

print("===== AI Code Assistant =====")
print("Type 'exit' to quit\n")

while True:

    query = input("You: ")

    if query.lower() == "exit":
        break

    response = qa_chain.invoke({"query": query})

    print("\nAI:", response["result"])
    print("\n")