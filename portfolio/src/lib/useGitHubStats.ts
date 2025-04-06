import { useState, useEffect } from 'react';

export interface GitHubStats {
  username: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  contributions?: number;
  stars?: number;
  commits?: number;
  pullRequests?: number;
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
}

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats>({
    username,
    avatar_url: '',
    followers: 0,
    following: 0,
    public_repos: 0,
    contributions: 0,
    stars: 0,
    commits: 0,
    pullRequests: 0,
    lastUpdated: new Date(),
    isLoading: true,
    error: null
  });

  useEffect(() => {
    if (!username) return;

    const fetchGitHubStats = async () => {
      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }));

        // Fetch basic user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);

        if (!userResponse.ok) {
          throw new Error(`GitHub API error: ${userResponse.status}`);
        }

        const userData = await userResponse.json();

        // Fetch repositories for additional stats
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();

        // Calculate stars (sum of stargazers_count)
        const stars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

        // This is a simplified approach for commits and contributions
        // For real data, GitHub doesn't provide direct API for annual contributions
        // A web scraping approach or GitHub GraphQL API would be needed for accurate data

        // For the demo, we'll set some sample data to show the look and feel
        const contributions = Math.floor(Math.random() * 2000) + 500; // Sample value
        const commits = Math.floor(contributions * 0.7); // Sample value
        const pullRequests = Math.floor(contributions * 0.2); // Sample value

        setStats({
          username,
          avatar_url: userData.avatar_url,
          followers: userData.followers,
          following: userData.following,
          public_repos: userData.public_repos,
          contributions,
          stars,
          commits,
          pullRequests,
          lastUpdated: new Date(),
          isLoading: false,
          error: null
        });
      } catch (err) {
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Unknown error fetching GitHub stats'
        }));
      }
    };

    fetchGitHubStats();
  }, [username]);

  return stats;
}