import { Spotlight } from "../ui/Spotlight";
import Particles from "../ui/Particles";
import { Navbar } from "../ui/Navbar";
import { Background } from "../ui/Background";
import { About } from "../sections/About";
import { Projects } from "../sections/Projects";
import { Experience } from "../sections/Experience";

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
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:text-7xl">
            Adhish Krishna S
          </h1>
          <p className="mx-auto mt-2 md:mt-4 max-w-lg text-center text-sm sm:text-base font-normal text-neutral-300">
            Aspiring Software Engineer
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
    </div>
  );
}
