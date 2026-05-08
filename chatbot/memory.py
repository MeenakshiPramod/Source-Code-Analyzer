from langchain_classic.memory import ConversationBufferMemory

def get_memory():
    """
    Create conversational memory
    """

    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )

    return memory