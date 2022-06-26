import { createContext, useContext, useEffect, useState } from "react";
import { StoreItem } from "../types";

interface StoreContext {
  items: StoreItem[];
  loading: boolean;
  error: string | null;
}

const StoreContext = createContext({} as StoreContext);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreContext");
  }

  return context;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const items = await fetch("/items.json");
        const data = await items.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <StoreContext.Provider value={{ items, loading, error }}>
      {children}
    </StoreContext.Provider>
  );
};
