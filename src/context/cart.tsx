import { createContext, useContext, useMemo, useState } from "react";
import { CartItem as CartItemComponent, Offcanvas } from "../components";
import { useLocalStorage } from "../hooks";
import { CartItem } from "../types";
import { formatCurrency } from "../utils";
import { useStoreContext } from "./store";

interface CartContext {
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addToCard: (id: string) => void;
  removeFromCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  getItemQuantity: (id: string) => number;
  getTotalCount: () => number;
}

const CartContext = createContext<CartContext>({} as CartContext);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContext");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { items: storeItems } = useStoreContext();
  const [items, setItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [open, setOpen] = useState(false);
  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  const addToCard = (id: string) => {
    const itemInCart = items.find((i) => i.id === id);

    if (!itemInCart) {
      setItems((items) => [...items, { id, quantity: 1 }]);
      return;
    }

    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          item.quantity++;
        }

        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    const itemInCart = items.find((i) => i.id === id);

    if (!itemInCart) {
      return;
    }

    if (itemInCart.quantity === 1) {
      deleteFromCart(id);
      return;
    }

    setItems((items) =>
      items.map(() => {
        if (itemInCart.id === id) {
          itemInCart.quantity--;
        }

        return itemInCart;
      })
    );
  };

  const getItemQuantity = (id: string) =>
    items.find((i) => i.id === id)?.quantity || 0;

  const getTotalCount = () => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  };

  const deleteFromCart = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const getTotalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = storeItems.find((i) => i.id === item.id)?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  }, [items, storeItems]);

  const value = {
    items,
    openCart,
    closeCart,
    addToCard,
    getTotalCount,
    removeFromCart,
    deleteFromCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <Offcanvas
        closeHandler={closeCart}
        isOpen={open}
        name="cart"
        label="Shopping Cart"
      >
        <div className="grid gap-2">
          {items.map((item) => {
            const data = storeItems.find((i) => i.id === item.id);

            if (!data) {
              return null;
            }

            return (
              <CartItemComponent
                key={item.id}
                item={data}
                quantity={item.quantity}
              />
            );
          })}
        </div>
        <p className="mt-5 text-2xl">
          Total price: {formatCurrency(getTotalPrice)}
        </p>
      </Offcanvas>
    </CartContext.Provider>
  );
};
