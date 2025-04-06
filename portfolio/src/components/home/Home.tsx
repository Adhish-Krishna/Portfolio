import { Spotlight } from "../ui/Spotlight";
import Particles from "../ui/Particles";
import { Navbar } from "../ui/Navbar";
import { Background } from "../ui/Background";
import { About } from "../sections/About";
import { Education } from "../sections/Education";
import { Projects } from "../sections/Projects";
import { Experience } from "../sections/Experience";
import { Contact } from "../sections/Contact";
import { CodeReveal } from "../ui/CodeReveal"; // Using the new CodeReveal component

export function Home() {
  const accentColor = "#38d9f5";

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
          <p className="mx-auto mt-2 md:mt-4 max-w-lg text-center text-base sm:text-lg font-normal text-neutral-300">
            <CodeReveal
              text="Aspiring Software Engineer"
              delay={3000}
              typingSpeed={50}
              glitchProbability={0.1}
              colorAccent={accentColor}
            />
          </p>
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
    </div>
  );
}
