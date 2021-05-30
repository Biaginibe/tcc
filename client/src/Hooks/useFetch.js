import { useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = (url, options) => {
    setLoading(true);

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao salvar dados");

        return res.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (url) {
      setLoading(true);

      fetch(url, options)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar dados");

          return res.json();
        })
        .then((data) => {
          setResults(data);

          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return { results, error, loading, postData };
};

export { useFetch };
