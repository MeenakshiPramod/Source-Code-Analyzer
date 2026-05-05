from ingestion.clone_repo import clone_repository
from ingestion.load_files import load_python_files

repo_url = "https://github.com/pallets/flask"

repo_path = clone_repository(repo_url)

documents = load_python_files(repo_path)

print(f"Total documents loaded: {len(documents)}")

# Print sample
print("\nSample Document:")
print(documents[0].page_content[:300])
print("\nMetadata:", documents[0].metadata)