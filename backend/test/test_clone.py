from ingestion.clone_repo import clone_repository

repo_url = "https://github.com/pallets/flask"

path = clone_repository(repo_url)

print("Cloned to:", path)