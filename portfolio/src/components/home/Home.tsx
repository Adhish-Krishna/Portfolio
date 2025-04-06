import { useState, useEffect } from "react";
import { Spotlight } from "../ui/Spotlight";
import Particles from "../ui/Particles";
import { Navbar } from "../ui/Navbar";
import { Background } from "../ui/Background";
import { About } from "../sections/About";
import { Education } from "../sections/Education";
import { Projects } from "../sections/Projects";
import { Experience } from "../sections/Experience";
import { Contact } from "../sections/Contact";
import { CodeReveal } from "../ui/CodeReveal";
import { Terminal } from "../ui/Terminal"; // Import Terminal component

export function Home() {
  const accentColor = "#38d9f5";
  const [isDevMode, setIsDevMode] = useState(false);

  // Toggle between normal and dev modes
  const toggleDevMode = () => {
    setIsDevMode(prev => !prev);
  };

  // Add keyboard shortcut for toggling dev mode
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Toggle dev mode when 't' key is pressed
      if (event.key === 't' && !isDevMode) {
        toggleDevMode();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isDevMode]);

  return (
    <div className="bg-[#000d19]">
      {/* Fixed global background */}
      <Background />

      {/* Global spotlight effects */}
      <Spotlight
        className="top-0 left-1/2 -translate-x-1/2 md:-top-20 md:left-60 md:translate-x-0"
        fill={accentColor}
      />

      <Navbar accentColor={accentColor} logoText="AK" />

      {isDevMode ? (
        // Dev Mode Terminal
        <section id="terminal" className="relative flex h-screen w-full overflow-hidden bg-transparent antialiased items-center justify-center p-4 pt-20">
          <Terminal accentColor={accentColor} onExit={toggleDevMode} className="w-full max-w-5xl" />
        </section>
      ) : (
        // Normal Mode Content
        <>
          {/* Hero Section */}
          <section
            id="home"
            className="relative flex h-screen w-full overflow-hidden bg-transparent antialiased md:items-center md:justify-center"
          >
            <Particles
              className="opacity-50"
              quantity={80}
              color={accentColor}
              ease={30}
            />

            <div className="flex flex-col justify-center items-center h-screen z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
              <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-7xl">
                <CodeReveal
                  text="Adhish Krishna S"
                  delay={800}
                  typingSpeed={100}
                  glitchProbability={0.15}
                  colorAccent={accentColor}
                  cursorColor={accentColor}
                  className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent"
                  onComplete={() => {}}
                />
              </h1>
              <div className="flex flex-col items-center">
                <p className="mx-auto mt-2 md:mt-4 max-w-lg text-center text-base sm:text-lg font-normal text-neutral-300">
                  <CodeReveal
                    text="Aspiring Software Engineer"
                    delay={3000}
                    typingSpeed={50}
                    glitchProbability={0.1}
                    colorAccent={accentColor}
                  />
                </p>
                {/* Mode toggle button */}
                <button
                  onClick={toggleDevMode}
                  className="mt-6 px-4 py-2 rounded-md text-sm transition-all flex items-center"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`,
                  }}
                >
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.5 6a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                    </svg>
                  </span>
                  Switch to Developer Mode
                </button>
              </div>
            </div>
          </section>

          {/* Section Separator */}
          <div className="relative py-8">
            <div
              className="w-[80%] max-w-5xl h-[1px] mx-auto"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
            />
          </div>

          {/* About Section */}
          <About accentColor={accentColor} />

          {/* Section Separator */}
          <div className="relative py-8">
            <div
              className="w-[80%] max-w-5xl h-[1px] mx-auto"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
            />
          </div>

          {/* Education Section */}
          <Education accentColor={accentColor} />

          {/* Section Separator */}
          <div className="relative py-8">
            <div
              className="w-[80%] max-w-5xl h-[1px] mx-auto"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
            />
          </div>

          {/* Projects Section */}
          <Projects accentColor={accentColor} />

          {/* Section Separator */}
          <div className="relative py-8">
            <div
              className="w-[80%] max-w-5xl h-[1px] mx-auto"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
            />
          </div>

          {/* Experience Section */}
          <Experience accentColor={accentColor} />

          {/* Footer (replacing Contact Section) */}
          <Contact
            accentColor={accentColor}
            email="adhishthesak@gmail.com"
          />
        </>
      )}
    </div>
  );
}
