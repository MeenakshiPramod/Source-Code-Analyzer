from langchain_classic.chains import RetrievalQA
from langchain_groq import ChatGroq
from utils.config import GROQ_API_KEY
from chatbot.memory import get_memory

def create_qa_chain(retriever):

    #Create LLM
    llm = ChatGroq(
        groq_api_key = GROQ_API_KEY,
        model_name = "llama-3.1-8b-instant",
    )

    # Create memory
    memory = get_memory()

    # Create Retrieval QA Chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        memory=memory
    )
    return qa_chain