import { cn } from "../../lib/utils";

interface AboutProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  skills?: string[];
  accentColor?: string;
}

export function About({
  className = "",
  title = "About Me",
  subtitle = "Get to know me better",
  description = (
    <>
      <p className="mb-4">
        Hi there! I'm a passionate software engineer with a love for building elegant solutions to complex problems. My journey in tech began when I first discovered the magic of turning code into functional applications.
      </p>
      <p>
        I specialize in full-stack development with a focus on modern technologies. When I'm not coding, you'll find me exploring new tech, contributing to open-source projects, or learning something new.
      </p>
    </>
  ),
  skills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python",
    "HTML/CSS", "SQL", "Git", "AWS", "Docker"
  ],
  accentColor = "#38d9f5",
}: AboutProps) {
  return (
    <section
      id="about"
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

          {/* About description */}
          <div className="text-neutral-300 mb-12">
            {description}
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    border: `1px solid ${accentColor}50`,
                    color: accentColor
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}