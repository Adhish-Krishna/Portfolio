import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface GitHubReadmeStatsProps {
  username: string;
  className?: string;
  accentColor?: string;
}

export function GitHubReadmeStats({
  username,
  className = '',
  accentColor = '#38d9f5'
}: GitHubReadmeStatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn(
        "bg-[#0a1622] border border-[#171717] rounded-xl p-6 ai-box",
        "transition-all duration-500 opacity-0 translate-y-4",
        isVisible ? "opacity-100 translate-y-0" : "",
        className
      )}
      style={{
        borderColor: `${accentColor}40`,
        boxShadow: `0 4px 20px ${accentColor}10`,
        transitionDelay: "200ms"
      }}
    >
      <h3 className="text-white text-xl font-medium mb-6">GitHub Stats</h3>

      {/* Grid layout for GitHub stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Language Stats */}
        <div className="stats-card bg-black/30 rounded-lg p-3 border border-[#171717] hover:border-opacity-50 transition-all duration-300">
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact&theme=dark`}
            alt={`${username}'s most used languages`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* GitHub Stats */}
        <div className="stats-card bg-black/30 rounded-lg p-3 border border-[#171717] hover:border-opacity-50 transition-all duration-300">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en&theme=dark`}
            alt={`${username}'s GitHub stats`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Streak Stats */}
        <div className="stats-card bg-black/30 rounded-lg p-3 border border-[#171717] hover:border-opacity-50 transition-all duration-300">
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark`}
            alt={`${username}'s GitHub streak stats`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="mt-4 text-xs text-neutral-400 text-center">
        Data provided by github-readme-stats and github-readme-streak-stats
      </div>
    </div>
  );
}