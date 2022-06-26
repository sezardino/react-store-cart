import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import { CartButton } from "./CartButton";
import { useRef } from "react";
import { useCartContext } from "../context";

export const Navbar = () => {
  const { openCart, items, getTotalCount } = useCartContext();
  const location = useLocation();
  const links = useRef([
    {
      name: "Home",
      to: "/",
    },
    {
      name: "About",
      to: "/about",
    },
    {
      name: "Store",
      to: "/store",
    },
  ]);

  return (
    <header className="py-5 shadow-lg">
      <div className="container">
        <nav className="flex gap-3 items-center">
          {links.current.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={clsx("p-2 text-lg font-medium text-gray-400", {
                "text-gray-900": link.to === location.pathname,
              })}
            >
              {link.name}
            </Link>
          ))}
          {getTotalCount() > 0 ? (
            <CartButton
              count={getTotalCount()}
              className="ml-auto"
              onClick={openCart}
            />
          ) : null}
        </nav>
      </div>
    </header>
  );
};
