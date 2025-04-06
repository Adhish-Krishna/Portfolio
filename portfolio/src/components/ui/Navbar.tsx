import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface NavbarProps {
  className?: string;
  links?: { name: string; href: string }[];
  accentColor?: string;
  logoText?: string;
}

export function Navbar({
  className = "",
  links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
  ],
  accentColor = "#38d9f5",
  logoText = "AK",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle mounting animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Find current active section based on scroll position
      const sections = links.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4"
      ref={navRef}
      style={{
        transform: isMounted ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isMounted ? 1 : 0,
        transition: 'transform 0.8s ease-out, opacity 0.6s ease-out',
      }}
    >
      <div
        className={cn(
          "rounded-full transition-all duration-300 backdrop-blur-md flex items-center",
          isScrolled ? "bg-black/80" : "bg-black/60",
          isExpanded ? "w-auto px-6" : "w-auto px-6",
          mobileMenuOpen ? "rounded-b-none" : "",
          className
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        style={{
          maxWidth: "85%",
        }}
      >
        <div className="py-2 flex items-center justify-between w-full">
          {/* Logo */}
          <div
            className="text-xl font-bold bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent"
            style={{
              animation: isMounted ? "fadeInUp 0.6s ease forwards" : "none",
            }}
          >
            {logoText}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 ml-10">
            {links.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-2 py-1 text-sm font-medium transition-colors duration-300",
                  activeSection === link.href.substring(1)
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                )}
                style={{
                  animation: isMounted ? `fadeInUp 0.6s ${0.1 * index}s ease forwards` : "none",
                  opacity: 0,
                  transform: "translateY(10px)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setActiveSection(link.href.substring(1));
                }}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                    style={{
                      backgroundColor: accentColor,
                      animation: "growWidth 0.3s ease forwards"
                    }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              animation: isMounted ? "fadeInUp 0.6s 0.4s ease forwards" : "none",
              opacity: 0,
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Now as a dropdown with glassmorphism */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed left-1/2 transform -translate-x-1/2 w-[85%] max-w-[85%] rounded-b-2xl py-4 px-4 shadow-lg"
          style={{
            animation: "fadeIn 0.2s ease forwards",
            zIndex: 50,
            top: navRef.current ? `${navRef.current.getBoundingClientRect().bottom}px` : "60px",
            opacity: 0,
            backgroundColor: 'rgba(10, 10, 15, 0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
          }}
        >
          <div className="flex flex-col space-y-2">
            {links.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                  activeSection === link.href.substring(1)
                    ? "text-white"
                    : "text-neutral-300 hover:text-white"
                )}
                style={{
                  animation: `fadeInUp 0.2s ${0.05 * index}s ease forwards`,
                  opacity: 0,
                  transform: "translateY(5px)",
                  borderLeft: activeSection === link.href.substring(1)
                    ? `2px solid ${accentColor}`
                    : "2px solid transparent",
                  background: activeSection === link.href.substring(1)
                    ? `rgba(255, 255, 255, 0.07)`
                    : 'transparent',
                  backdropFilter: activeSection === link.href.substring(1) ? 'blur(5px)' : 'none',
                  WebkitBackdropFilter: activeSection === link.href.substring(1) ? 'blur(5px)' : 'none',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setActiveSection(link.href.substring(1));
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes growWidth {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        /* Add touchstart handler to ensure smooth scrolling on mobile */
        @media (max-width: 768px) {
          html, body {
            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}