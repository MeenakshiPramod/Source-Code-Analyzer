import os
from git import Repo

def clone_repository(repo_url, clone_dir="repos"):
    """
    Clones a Git repository to a specified directory.
    """

    # Ensure the clone directory exists
    if not os.path.exists(clone_dir):
        os.makedirs(clone_dir)

    # Extract repository name from URL
    repo_name = repo_url.split("/")[-1].replace(".git", "")
    repo_path = os.path.join(clone_dir, repo_name)

    if os.path.exists(repo_path):
        print(f"Repository '{repo_name}' already exists at '{repo_path}'. Skipping clone.")
        return repo_path

    print(f"Cloning repository from {repo_url} to {repo_path}...")
    Repo.clone_from(repo_url, repo_path)
    
    print(f"Repository cloned at {repo_path}")
    return repo_path