import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

/**
 * useData hook
 * Tries to fetch from API, falls back to provided mock data if API fails or is unavailable.
 */
export default function useData(endpoint, mockFallback = null) {
  const [data, setData] = useState(mockFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiClient.get(endpoint)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn(`API call to ${endpoint} failed, using mock data.`, err);
        if (isMounted) {
          // If no mockFallback provided, keep error state
          if (mockFallback === null) {
            setError(err);
          } else {
            setData(mockFallback);
          }
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading, error, setData };
}
