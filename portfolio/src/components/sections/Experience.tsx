import { cn } from "../../lib/utils";
import { useEffect, useState, useRef } from "react";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string | React.ReactNode;
  skills?: string[];
}

interface ExperienceProps {
  className?: string;
  title?: string;
  subtitle?: string;
  experiences?: ExperienceItem[];
  accentColor?: string;
}

export function Experience({
  className = "",
  title = "Experience",
  subtitle = "My professional journey",
  experiences = [
    {
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      period: "Jan 2023 - Present",
      description: "Led the development of a client portal system that improved customer engagement by 40%. Implemented CI/CD pipelines that reduced deployment time by 60%.",
      skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
      title: "Frontend Developer",
      company: "Digital Innovations",
      period: "Mar 2021 - Dec 2022",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement UI/UX improvements resulting in 25% increase in user retention.",
      skills: ["React", "JavaScript", "CSS", "UI/UX"]
    },
    {
      title: "Web Development Intern",
      company: "StartUp Labs",
      period: "Jun 2020 - Feb 2021",
      description: "Assisted in building and maintaining client websites. Learned fundamentals of web development and agile methodology.",
      skills: ["HTML", "CSS", "JavaScript"]
    }
  ],
  accentColor = "#38d9f5",
}: ExperienceProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && !visibleItems.includes(index)) {
            setVisibleItems(prev => [...prev, index]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [itemRefs.current.length]);

  return (
    <section
      id="experience"
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-transparent antialiased py-20",
        className
      )}
    >
      <div className="container mx-auto px-4 relative z-10 py-20">
        {/* Section title */}
        <h2
          className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl md:text-5xl font-bold text-transparent mb-2"
          style={{
            animation: "fadeInUp 0.8s ease forwards"
          }}
        >
          {title}
        </h2>

        <p
          className="text-center text-neutral-400 mb-16"
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.2s"
          }}
        >
          {subtitle}
        </p>

        {/* Experience Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative mb-12"
              ref={el => {
                itemRefs.current[index] = el;
              }}
              style={{
                opacity: visibleItems.includes(index) ? 1 : 0,
                transform: visibleItems.includes(index) ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.5s ease, transform 0.6s ${index * 0.1}s ease`
              }}
            >
              {/* Timeline connector */}
              {index !== experiences.length - 1 && (
                <div
                  className="absolute left-8 top-8 w-px h-full -z-10"
                  style={{
                    background: `linear-gradient(to bottom, ${accentColor}80, ${accentColor}10)`,
                    animation: visibleItems.includes(index) ? 'growDown 1s ease forwards' : 'none',
                    transformOrigin: 'top',
                    transform: 'scaleY(0)'
                  }}
                />
              )}

              <div className="flex flex-col md:flex-row gap-4">
                {/* Timeline dot */}
                <div className="flex flex-shrink-0 items-center justify-center">
                  <div
                    className="w-4 h-4 rounded-full z-10"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 0 10px ${accentColor}80`,
                      animation: visibleItems.includes(index) ? 'pulse 2s infinite' : 'none'
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className="bg-[#0a1622] border border-[#171717] rounded-xl p-6 md:ml-4 flex-1 hover:border-opacity-50 transition-all duration-300"
                  style={{
                    borderColor: visibleItems.includes(index) ? accentColor + '40' : '#171717',
                    boxShadow: visibleItems.includes(index) ? `0 4px 20px ${accentColor}10` : 'none'
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-medium text-white">{exp.title}</h3>
                    <span className="text-sm text-neutral-400">{exp.period}</span>
                  </div>

                  <div
                    className="text-neutral-300 font-medium mb-4"
                    style={{ color: accentColor }}
                  >
                    {exp.company}
                  </div>

                  <div className="text-neutral-400 mb-4 leading-relaxed">
                    {exp.description}
                  </div>

                  {exp.skills && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 text-xs rounded-full transition-transform duration-300 hover:scale-105"
                          style={{
                            backgroundColor: `${accentColor}20`,
                            color: accentColor,
                            animation: visibleItems.includes(index) ? `fadeIn 0.3s ${0.5 + skillIndex * 0.1}s forwards` : 'none',
                            opacity: 0
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes growDown {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}