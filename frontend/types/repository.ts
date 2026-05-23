export interface RepositoryStats {

  repoName: string;

  totalChunks: number;

  totalFiles: number;

  primaryLanguage: string;

  framework: string;

  detectedTechnologies: string[];

}