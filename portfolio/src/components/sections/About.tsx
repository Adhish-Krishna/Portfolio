import { useState, useEffect, useRef, JSX } from "react";
import { cn } from "../../lib/utils";
import { aboutData as defaultAboutData } from "../../data/about";
import { TypewriterText } from "../ui/TypewriterText";
import { GitHubStatsCard } from "../ui/GitHubStatsCard";
// Add SVG icons import for skills
import { FaReact, FaPython, FaJava, FaGit, FaGithub, FaFigma } from "react-icons/fa";
import { SiJavascript, SiC, SiExpress, SiFastapi, SiPostgresql, SiSqlite, SiCanva, SiLangchain, SiTypescript } from "react-icons/si";
import { GrGraphQl } from "react-icons/gr";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";

// Skill icons mapping
const skillIcons: Record<string, JSX.Element> = {
  "C": <SiC className="text-2xl" />,
  "Python": <FaPython className="text-2xl" />,
  "JavaScript": <SiJavascript className="text-2xl" />,
  "TypeScript":<SiTypescript className="text-2xl"/>,
  "Java": <FaJava className="text-2xl" />,
  "React.js": <FaReact className="text-2xl" />,
  "Express.js": <SiExpress className="text-2xl" />,
  "Fast API": <SiFastapi className="text-2xl" />,
  "PostgreSQL": <SiPostgresql className="text-2xl" />,
  "SQLite": <SiSqlite className="text-2xl" />,
  "Git": <FaGit className="text-2xl" />,
  "GitHub": <FaGithub className="text-2xl" />,
  "Figma": <FaFigma className="text-2xl" />,
  "Canva": <SiCanva className="text-2xl" />,
  "Event Management": <BsPersonFill className="text-2xl" />,
  "Leadership": <MdOutlineLeaderboard className="text-2xl" />,
  "Langchain": <SiLangchain className="text-2xl" />,
  "Langgraph": <GrGraphQl className="text-2xl" />
};

interface AboutProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  skills?: string[];
  accentColor?: string;
  githubUsername?: string;
}

export function About({
  className = "",
  title = defaultAboutData.title || "About Me",
  subtitle = defaultAboutData.subtitle || "Get to know me better",
  description = defaultAboutData.description,
  skills = defaultAboutData.skills,
  accentColor = "#38d9f5",
  githubUsername = "Adhish-Krishna",
}: AboutProps) {
  const [secretVisible, setSecretVisible] = useState(false);
  const [konami, setKonami] = useState("");
  const [keySequence, setKeySequence] = useState("");
  const secretRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  // Set up konami code easter egg to reveal the C language secret
  useEffect(() => {
    const konamiCode = "KeyCKeyC";  // Press 'c' twice to reveal secret

    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = keySequence + e.code;
      setKeySequence(prev => prev + e.code);

      if (konamiCode.startsWith(newSequence)) {
        if (newSequence === konamiCode) {
          setSecretVisible(true);
          // Encode "I <3 C" in binary (our secret message)
          const cLoveBinary = "01001001 00100000 00111100 00110011 00100000 01000011";
          setKonami(cLoveBinary);
          setTimeout(() => {
            if (secretRef.current) {
              secretRef.current.style.display = "block";
              setTimeout(() => {
                secretRef.current!.style.opacity = "1";
              }, 100);
            }
          }, 200);
          setKeySequence("");
        }
      } else {
        setKeySequence("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keySequence]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-transparent antialiased py-20",
        className
      )}
    >
      <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center py-20">
        <div className="max-w-3xl mx-auto">
          {/* Section title */}
          <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl md:text-5xl font-bold text-transparent mb-2">
            {title}
          </h2>

          <p className="text-center text-neutral-400 mb-8">{subtitle}</p>

          {/* About description with typewriter effect */}
          <div className="text-neutral-300 mb-12 ai-box p-6">
            <TypewriterText
              text={description}
              speed={5}
              delay={300}
              inView={isInView}
              onComplete={() => setSkillsVisible(true)}
            />
          </div>

          {/* GitHub Stats - New Addition */}
          <div className="mb-12">
            <h3 className="text-xl text-white mb-4">
              <TypewriterText
                text="GitHub Activity"
                speed={50}
                delay={600}
                inView={isInView}
              />
            </h3>
            <GitHubStatsCard username={githubUsername} accentColor={accentColor} />
          </div>

          {/* Skills */}
          <div className={`transition-opacity duration-1000 ${skillsVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-xl text-white mb-4">
              <TypewriterText
                text="Skills"
                speed={50}
                delay={100}
                inView={skillsVisible}
              />
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  title={skill}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    border: `1px solid ${accentColor}50`,
                    color: accentColor,
                    opacity: skillsVisible ? 1 : 0,
                    transform: skillsVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {skillIcons[skill]}
                </span>
              ))}
            </div>
          </div>

          {/* The C language secret container (hidden by default) */}
          <div
            ref={secretRef}
            className="mt-12 p-6 border border-dashed rounded-lg transition-all duration-1000 opacity-0 hidden"
            style={{
              borderColor: accentColor,
              backgroundColor: `${accentColor}10`,
            }}
          >
            <div className="text-sm font-mono flex items-center space-x-2">
              <span className="text-neutral-400">// Secret skill unlocked:</span>
              <span style={{ color: accentColor }}>
                {/* This will show binary for "I <3 C" when revealed */}
                {konami ? konami : ""}
              </span>
            </div>
            <div className="mt-2 text-xs font-mono text-neutral-500">
              <span>/* The C language is my ultimate favorite */</span>
            </div>
            {secretVisible && (
              <div className="mt-4 text-sm font-mono opacity-80" style={{ color: accentColor }}>
                <pre className="bg-[#091018] p-4 rounded-lg overflow-x-auto">{`
#include <stdio.h>

int main() {
    /* This is where true power lies */
    printf("I ❤️ C more than any other language");
    return 0;
}
                `}</pre>
                <div className="mt-4 text-neutral-300 italic">
                  <TypewriterText
                    text="C is the foundation of modern computing - elegant, powerful, and timeless."
                    speed={30}
                    delay={200}
                    inView={secretVisible}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}