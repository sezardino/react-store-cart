import clsx from "clsx";
import { StoreItem } from "../types";
import { formatCurrency } from "../utils";
import { Button } from "./Button";

interface Props extends React.HTMLProps<HTMLDivElement> {
  item: StoreItem;
  quantity: number;
}

export const CartItem: React.FC<Props> = (props) => {
  const { item, quantity, className, ...rest } = props;

  return (
    <div {...rest} className={clsx("flex items-center gap-2", className)}>
      <div className="flex gap-2 justify-between items-center">
        <div>
          <h2>{item.name}</h2>
          {quantity > 1 ? <p>{quantity}x</p> : null}
          <p>{formatCurrency(item.price)}</p>
        </div>
        <Button accent="danger" size="small">
          Remove
        </Button>
      </div>
      <img
        src={item.imgUrl}
        alt={item.name}
        className="-order-1 object-cover w-36 h-24"
      />
    </div>
  );
};
