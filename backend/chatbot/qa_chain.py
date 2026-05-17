# from langchain_classic.chains import RetrievalQA
# from langchain_groq import ChatGroq
# from utils.config import GROQ_API_KEY
# from chatbot.memory import get_memory

# def create_qa_chain(retriever):

#     #Create LLM
#     llm = ChatGroq(
#         groq_api_key = GROQ_API_KEY,
#         model_name = "llama-3.1-8b-instant",
#     )

#     # Create memory
#     memory = get_memory()

#     # Create Retrieval QA Chain
#     qa_chain = RetrievalQA.from_chain_type(
#         llm=llm,
#         retriever=retriever,
#         memory=memory,
#         return_source_documents=True
#     )
#     return qa_chain


from langchain_classic.chains import ConversationalRetrievalChain

from langchain_groq import ChatGroq

from utils.config import GROQ_API_KEY

from chatbot.memory import get_memory


def create_qa_chain(retriever):

    # Create LLM
    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name="llama-3.1-8b-instant",
    )

    # Create memory
    memory = get_memory()

    # Create conversational retrieval chain
    qa_chain = ConversationalRetrievalChain.from_llm(

        llm=llm,

        retriever=retriever,

        memory=memory,

        return_source_documents=True,

        output_key="answer"
    )

    return qa_chain