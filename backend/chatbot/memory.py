# from langchain_classic.memory import ConversationBufferMemory

# def get_memory():
#     """
#     Create conversational memory
#     """

#     memory = ConversationBufferMemory(
#         memory_key="chat_history",
#         return_messages=True
#     )

#     return memory

from langchain_classic.memory import ConversationBufferMemory

def get_memory():

    memory = ConversationBufferMemory(

        memory_key="chat_history",

        return_messages=True,

        output_key="answer"
    )

    return memory