import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [typeof value, typeof setValue];
};
