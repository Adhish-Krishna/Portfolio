export interface AboutData {
  title?: string;
  subtitle?: string;
  description: string;
  skills: string[];
}

export const aboutData: AboutData = {
  title: "About Me",
  subtitle: "Get to know me better",
  description: "Aspiring Software Engineer passionate about developing AI-driven ascalable solutions. Strong foundation in Computer Science with expertise in front- and back-end development, database management, and software architecture. Proven ability to work in teams, contribute to open source projects, and solve complex problems through innovative solutions.",
  skills: [
    "C", "Python", "JavaScript", "Java","TypeScript",
    "React.js", "Express.js", "Fast API",
    "PostgreSQL", "SQLite",
    "Git", "GitHub",
    "Figma", "Canva",
    "Langchain"
  ]
};