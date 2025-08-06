// Experience data types and values
export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string | React.ReactNode;
  skills?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    title: "Backend Development (Internship)",
    company: "AIBILL Project, Inria Grenoble & PSG College of Technology",
    period: "Feb 2025 - Mar 2025",
    description: "Contributed to back-end REST API development and PostgreSQL database integration for a mobile app prototype.Played a key role in the early-stage success of the AIBILL prototype in a research-industry setting.",
    skills: ["Back-end", "Fast-API", "PostgreSQL", "REST-API"]
  },
  {
    title: "Member-Tech Team",
    company: "CSEA - PSG Tech, Coimbatore, India",
    period: "Aug 2024 - Present",
    description: "Collaborated with the back-end team to develop the event registration platform for Code Rush. Engineered back-end functionalities to enhance efficiency in Infinitum's event portal operations.",
    skills: ["Web Development", "Back-end", "JavaScript", "Node.js", "Express","TypeScript", "React.js"]
  },
  {
    title: "Member",
    company: "GitHub Campus Club - PSG Tech, Coimbatore, India",
    period: "Dec 2023 - Present",
    description: "Engineered registration website for GitTogether event hosted by GitHub Campus Club - PSG Tech. Organized and managed GitTogether event, successfully engaging nearly 99 student attendees. Contributed to the creation of the front-end section for Codopoly's online platform, organized by GitHub Campus Club during Kriya 2025. Facilitated training session focused on GitHub and API creation techniques.",
    skills: ["GitHub", "Web Development", "Front-end", "API Development", "Event Management", "React.js"]
  },
];