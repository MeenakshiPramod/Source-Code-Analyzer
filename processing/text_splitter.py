from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_documents(documents):
    """
    Split documents into smaller chunks
    """

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,      # size of each chunk
        chunk_overlap=200,    # overlap between chunks
        separators=["\n\n", "\n", " ", ""]
    )

    chunks = text_splitter.split_documents(documents)

    return chunks