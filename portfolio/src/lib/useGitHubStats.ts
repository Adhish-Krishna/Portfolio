import { useState, useEffect } from 'react';

export interface GitHubStats {
  username: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  stars?: number;
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
    stars: 0,
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

        setStats({
          username,
          avatar_url: userData.avatar_url,
          followers: userData.followers,
          following: userData.following,
          public_repos: userData.public_repos,
          stars,
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