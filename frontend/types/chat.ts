export interface Source {
  file: string;
  content: string;
}

export interface Message {
  role: "user" | "ai";
  content: string;
  sources?: Source[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}