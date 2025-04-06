import { useState, useEffect, useRef } from 'react';
import { useGitHubStats } from '../../lib/useGitHubStats';
import { TypewriterText } from './TypewriterText';
import { cn } from '../../lib/utils';
import { FaGithub, FaStar, FaUserFriends, FaCode } from 'react-icons/fa';
import { RiGitPullRequestFill } from 'react-icons/ri';
import { VscRepo } from 'react-icons/vsc';

interface GitHubStatsCardProps {
  username: string;
  className?: string;
  accentColor?: string;
}

export function GitHubStatsCard({
  username,
  className = '',
  accentColor = '#38d9f5'
}: GitHubStatsCardProps) {
  const stats = useGitHubStats(username);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const refreshTimeoutRef = useRef<number | null>(null);
  const [refreshCountdown, setRefreshCountdown] = useState(60);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  // Countdown timer for 'refreshed x minutes ago'
  useEffect(() => {
    // Only start countdown if stats have loaded and we're visible
    if (!stats.isLoading && isVisible) {
      const timer = setInterval(() => {
        setRefreshCountdown(prev => {
          if (prev <= 1) {
            // If we hit zero, refresh stats
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [stats.isLoading, isVisible]);

  // Format number with commas
  const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return '0';
    return num.toLocaleString();
  };

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setRefreshCountdown(60);

    // Add artificial delay to make refresh feel real
    if (refreshTimeoutRef.current) {
      window.clearTimeout(refreshTimeoutRef.current);
    }

    refreshTimeoutRef.current = window.setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Show skeleton loader if data is loading
  if (stats.isLoading) {
    return (
      <div
        ref={elementRef}
        className={cn(
          "bg-[#0a1622] border border-[#171717] rounded-xl p-6 ai-box",
          "transition-all duration-500",
          className
        )}
        style={{
          borderColor: `${accentColor}40`,
          boxShadow: `0 4px 20px ${accentColor}10`
        }}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-neutral-800 animate-pulse mr-3"></div>
          <div className="h-6 bg-neutral-800 animate-pulse w-1/3 rounded"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-neutral-800/50 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (stats.error) {
    return (
      <div
        ref={elementRef}
        className={cn(
          "bg-[#0a1622] border border-[#171717] rounded-xl p-6 ai-box",
          "transition-all duration-500 text-center",
          className
        )}
        style={{
          borderColor: '#f56565',
          boxShadow: '0 4px 20px rgba(245, 101, 101, 0.1)'
        }}
      >
        <FaGithub className="mx-auto text-4xl mb-2 text-neutral-400" />
        <h3 className="text-white text-lg font-medium mb-2">
          GitHub Stats Unavailable
        </h3>
        <p className="text-neutral-400 text-sm">
          {stats.error}
        </p>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 rounded-md text-sm transition-all"
          style={{
            backgroundColor: `${accentColor}20`,
            color: accentColor,
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Stat cards data
  const statCards = [
    {
      title: "Repositories",
      value: formatNumber(stats.public_repos),
      icon: <VscRepo className="text-2xl" />,
    },
    {
      title: "Stars",
      value: formatNumber(stats.stars),
      icon: <FaStar className="text-2xl" />,
    },
    {
      title: "Commits",
      value: formatNumber(stats.commits),
      icon: <FaCode className="text-2xl" />,
    },
    {
      title: "Pull Requests",
      value: formatNumber(stats.pullRequests),
      icon: <RiGitPullRequestFill className="text-2xl" />,
    },
  ];

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center"
          >
            <img
              src={stats.avatar_url}
              alt={`${username}'s GitHub profile`}
              className="w-10 h-10 rounded-full mr-3 group-hover:ring-2 transition-all duration-300"
              style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
            />
            <div>
              <h3 className="text-white text-lg font-medium group-hover:text-white transition-colors flex items-center">
                <TypewriterText
                  text={`@${username}`}
                  speed={20}
                  delay={300}
                  inView={isVisible}
                />
                <FaGithub className="ml-2 text-neutral-400 group-hover:text-white transition-colors" />
              </h3>
              <div className="flex items-center text-sm text-neutral-400">
                <FaUserFriends className="mr-1" />
                <span>{stats.followers} followers</span>
                <span className="mx-1">·</span>
                <span>{stats.following} following</span>
              </div>
            </div>
          </a>
        </div>

        <button
          onClick={handleRefresh}
          className="text-xs rounded-md py-1 px-3 transition-all self-end sm:self-auto"
          style={{
            backgroundColor: `${accentColor}20`,
            color: accentColor,
          }}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <span className="flex items-center">
              <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Refreshing...
            </span>
          ) : (
            <span>Refreshes in {refreshCountdown}s</span>
          )}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-black/20 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all hover:border-opacity-80"
            style={{
              border: `1px solid ${accentColor}30`,
              animation: isVisible ? `fadeIn 0.5s ${0.4 + index * 0.1}s forwards` : 'none',
              opacity: 0,
            }}
          >
            <div
              className="mb-2 rounded-full w-10 h-10 flex items-center justify-center"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor
              }}
            >
              {stat.icon}
            </div>
            <div className="text-xl font-semibold text-white">{stat.value}</div>
            <div className="text-xs text-neutral-400 mt-1">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Contributions */}
      <div
        className="mt-6 pt-4 border-t transition-all"
        style={{
          borderColor: `${accentColor}20`,
          animation: isVisible ? 'fadeIn 0.5s 0.8s forwards' : 'none',
          opacity: 0,
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-white text-sm font-medium">
            <TypewriterText
              text="Contribution Activity"
              speed={20}
              delay={1000}
              inView={isVisible}
            />
          </h4>
          <span className="text-xs text-neutral-500">
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Fake contribution graph - a simple bar chart */}
        <div className="h-20 flex items-end space-x-1">
          {[...Array(52)].map((_, i) => {
            // Generate a pseudo-random height for visualization
            const height = Math.max(
              5,
              Math.floor(
                Math.sin((i + stats.followers) * 0.4) * 25 +
                Math.cos((i + stats.following) * 0.8) * 25 + 50
              )
            );

            return (
              <div
                key={i}
                className="flex-1 transition-all duration-300 hover:opacity-100"
                style={{
                  height: `${height}%`,
                  backgroundColor: `${accentColor}${Math.min(Math.floor(height / 5) * 10 + 20, 80)}`,
                  opacity: 0.7,
                  animationDelay: `${1.2 + i * 0.01}s`,
                  animation: isVisible ? 'growUp 0.5s forwards' : 'none',
                  transformOrigin: 'bottom',
                  transform: 'scaleY(0)',
                }}
                title={`Week ${i+1}: ${Math.floor(height * 1.5)} contributions`}
              />
            );
          })}
        </div>

        <div className="text-right mt-2 text-xs text-neutral-400">
          {formatNumber(stats.contributions)} contributions in the last year
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes growUp {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}