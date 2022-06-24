import { useEffect, useState } from "react";
import { StoreCard } from "../components";
import { StoreItem } from "../types";

export const Store = () => {
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
    <div className="container py-10">
      <h1 className="text-4xl">Store</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <StoreCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
