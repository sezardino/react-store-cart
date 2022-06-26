import { StoreCard } from "../components";
import { useCartContext } from "../context";
import { useStoreContext } from "../context/store";

export const Store = () => {
  const { addToCard, deleteFromCart, removeFromCart, getItemQuantity } =
    useCartContext();
  const { error, items, loading } = useStoreContext();

  return (
    <div className="container py-10">
      <h1 className="text-4xl">Store</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <StoreCard
              addHandler={addToCard}
              deleteHandler={deleteFromCart}
              removeHandler={removeFromCart}
              quantity={getItemQuantity(item.id)}
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};
