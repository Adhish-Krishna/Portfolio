import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { Project, projects as defaultProjects } from "../../data/projects";
import { TypewriterText } from "../ui/TypewriterText";

interface ProjectsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  projects?: Project[];
  accentColor?: string;
}

export function Projects({
  className = "",
  title = "Projects",
  subtitle = "Some of my recent work",
  projects = defaultProjects,
  accentColor = "#38d9f5",
}: ProjectsProps) {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1 && !visibleProjects.includes(index)) {
              setVisibleProjects((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) projectObserver.observe(ref);
    });

    return () => {
      projectObserver.disconnect();
    };
  }, [isInView]);

  // Function to simulate AI-generated content
  const isProjectVisible = (index: number) => {
    return visibleProjects.includes(index);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-transparent antialiased py-20",
        className
      )}
    >
      <div className="container mx-auto px-4 relative z-10 py-20">
        {/* Section title */}
        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl md:text-5xl font-bold text-transparent mb-2">
          {title}
        </h2>

        <p className="text-center text-neutral-400 mb-12">{subtitle}</p>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => { projectRefs.current[index] = el; }}
              className={`group relative overflow-hidden rounded-xl bg-[#0a1622] p-6 border border-[#171717] transition-all duration-700 ai-box ${
                isProjectVisible(index) ? "opacity-100" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
                borderColor: isProjectVisible(index) ? `${accentColor}80` : "#171717",
              }}
            >
              {/* Project content */}
              <div className="h-full flex flex-col">
                <h3 className="text-xl font-medium text-white mb-2">
                  <TypewriterText
                    text={project.title}
                    speed={25}
                    delay={index * 300}
                    inView={isProjectVisible(index)}
                    tag="span"
                  />
                </h3>
                <p className="text-neutral-400 text-sm flex-grow mb-4">
                  {isProjectVisible(index) ? (
                    <TypewriterText
                      text={project.description}
                      speed={5}
                      delay={300 + index * 300}
                      inView={isProjectVisible(index)}
                      tag="span"
                      parentTag="p"
                    />
                  ) : (
                    ""
                  )}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                        opacity: isProjectVisible(index) ? 1 : 0,
                        transform: isProjectVisible(index) ? "scale(1)" : "scale(0.8)",
                        transitionDelay: `${500 + tagIndex * 100 + index * 100}ms`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto transition-opacity duration-500"
                     style={{ opacity: isProjectVisible(index) ? 1 : 0,
                             transitionDelay: `${1000 + index * 200}ms` }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Hover effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${accentColor}10 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
