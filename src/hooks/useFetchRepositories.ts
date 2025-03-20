import { useState, useEffect } from "react";
import axios from "axios";
import { GitHubRepo } from "../types/types";

const useFetchRepositories = (username: string) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchRepositories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<GitHubRepo[]>(
          `https://api.github.com/users/${username}/repos`
        );
        setRepos(response.data);
      } catch (err) {
        setError("Failed to fetch repositories");
        console.error("Error fetching repositories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  return { repos, loading, error };
};

export default useFetchRepositories;