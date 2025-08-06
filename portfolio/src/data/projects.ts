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
    title: "Event Management System (EMS)",
    description: "An event management portal for college clubs to manage their events efficiently and for the participants to register for the events with in one click.",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Prisma"],
    github: "https://github.com/Adhish-Krishna/CSEA-EMS"
  },
  {
    title: "EMS Admmin Portal Frontend",
    description: "Frontend for the admin portal of the Event Management System.",
    tags: ["React.js", "TypeScript", "TailwindCSS", "Figma"],
    github: "https://github.com/Adhish-Krishna/EMSFrontend"
  },
  {
    title: "PSG - AI CONSORTIUM",
    description: "This project is a fully frontend focused project. Its a website for PSG - AI CONSORTIUM.",
    tags: ["React.js", "TypeScript", "Node.js"],
    link: "https://aiconsortium.psgtech.ac.in",
    github: "https://github.com/Adhish-Krishna/AIConsortium",
  }
];