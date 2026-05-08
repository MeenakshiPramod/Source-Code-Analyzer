from ingestion.clone_repo import clone_repository
from ingestion.load_files import load_python_files
from processing.text_splitter import split_documents

repo_url = "https://github.com/pallets/flask"

repo_path = clone_repository(repo_url)

documents = load_python_files(repo_path)

chunks = split_documents(documents)

print(f"Original documents: {len(documents)}")
print(f"Total chunks: {len(chunks)}")

# Show sample chunk
print("\nSample Chunk:\n")
print(chunks[0].page_content[:500])

print("\nMetadata:", chunks[0].metadata)