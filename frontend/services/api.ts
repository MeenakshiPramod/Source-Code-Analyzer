import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

// =========================
// ANALYZE REPOSITORY
// =========================

export const analyzeRepository =
  async (repoUrl: string) => {

    const response =
      await API.post("/analyze", {
        repo_url: repoUrl,
      });

    return response.data;
  };

// =========================
// ASK QUESTION
// =========================

export const askQuestion =
  async (question: string) => {

    const response =
      await API.post("/chat", {
        question,
      });

    return response.data;
  };

export default API;