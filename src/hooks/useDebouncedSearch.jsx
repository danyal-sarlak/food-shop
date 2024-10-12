
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const useDebouncedSearch = (query, delay = 1000) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setIsTyping(true);
    const handler = setTimeout(() => {
      if (query) {
        setDebouncedQuery(query);
        setLoading(true);
      } else {
        setDebouncedQuery("");
      }
      setIsTyping(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay]);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (debouncedQuery) {
        const response = await fetch(`/api/FastFood/search?term=${encodeURIComponent(debouncedQuery)}`);
        const data = await response.json();
        return data;
      }
      return [];
    },
    enabled: !!debouncedQuery,
  });

  useEffect(() => {
    if (data) {
      setResults(data);
    }
    setLoading(isLoading);
  }, [data, isLoading]);

  return { results, loading, isTyping };
};

export default useDebouncedSearch;
