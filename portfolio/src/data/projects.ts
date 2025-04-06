// Project data types and values
export interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "AiDA - CLI: AI Document Assistant",
    description:
      "AiDA is an AI-powered document assistant that enables users to interact with various document formats (Word, PDF, PPTX, etc.) through a conversational command-line interface. It integrates Retrieval-Augmented Generation (RAG) to extract relevant information, provides web search, and website scraping capabilities for accurate insights.",
    tags: ["Python", "Langchain", "Langgraph", "Ollama", "SQLite"],
    github: "https://github.com/Adhish-Krishna/AiDA-CLI",
  },
  {
    title: "BookGPT",
    description:
      "BookGPT allows users to chat with preindexed botany books or upload custom PDFs for interactive conversations. Integrate Retrieval-Augmented Generation (RAG) to extract and summarize content, answer user queries, and enhance learning experiences through an intuitive AI chatbot interface.",
    tags: ["Python", "Flask", "JavaScript", "EJS", "PostgreSQL", "Ollama"],
    github: "https://github.com/Adhish-Krishna/RAG-2",
  },
  {
    title: "The Real Eye: A Multi-Modal Deepfake Detection System",
    description:
      "The Real Eye is a multi-modal deepfake detection system capable of analyzing videos, images, audio, and text for synthetic manipulations. It leverages CNN-based models to detect deepfakes in videos and images, while Wave2Vec and Librosa are used for audio analysis. For text-based deepfake detection, it employs BART (Bidirectional and Auto-Regressive Transformers) to identify manipulated content.",
    tags: [
      "Python",
      "TensorFlow",
      "CNN",
      "Wave2Vec",
      "Librosa",
      "BART",
      "React",
      "Flask",
    ],
    github: "https://github.com/Adhish-Krishna/RealEyes",
  },
];