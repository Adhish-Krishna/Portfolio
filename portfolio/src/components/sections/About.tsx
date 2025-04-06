import { useState, useEffect, useRef } from "react";
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
  const [secretVisible, setSecretVisible] = useState(false);
  const [konami, setKonami] = useState("");
  const [keySequence, setKeySequence] = useState("");
  const secretRef = useRef<HTMLDivElement>(null);

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
                  <p>C is the foundation of modern computing - elegant, powerful, and timeless.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}