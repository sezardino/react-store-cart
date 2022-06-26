import clsx from "clsx";
import { useState } from "react";
import { StoreItem } from "../types";
import { formatCurrency } from "../utils";
import { Button } from "./Button";

interface Props extends React.HTMLProps<HTMLDivElement> {
  item: StoreItem;
  quantity: number;
  addHandler: (id: string) => void;
  removeHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
}

export const StoreCard: React.FC<Props> = (props) => {
  const {
    item,
    quantity,
    className,
    addHandler,
    deleteHandler,
    removeHandler,
    ...rest
  } = props;

  return (
    <article
      {...rest}
      className={clsx("flex flex-col gap-2 p-4 border rounded-xl", className)}
    >
      <div>
        <h2 className="flex items-end justify-between">
          <span className="text-3xl">{item.name}</span>
          <small className="text-lg">{formatCurrency(item.price)}</small>
        </h2>
        <div className="mt-4">
          {quantity > 0 ? (
            <div className="flex flex-col gap-5 items-center">
              <div className="flex gap-3 justify-center items-center">
                <Button onClick={() => addHandler(item.id)}>+</Button>
                <small className="text-lg">{quantity} in cart</small>
                <Button onClick={() => removeHandler(item.id)}>-</Button>
              </div>
              <Button
                accent="danger"
                size="small"
                onClick={() => deleteHandler(item.id)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => addHandler(item.id)}>
              Add To Cart
            </Button>
          )}
        </div>
      </div>
      <img
        src={item.imgUrl}
        alt={item.name}
        className="object-cover w-full h-20 -order-1"
      />
    </article>
  );
};
