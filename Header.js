import React from "react";
import { Link } from "react-router-dom";

function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.reduce((s, i) => s + (i.quantity || 0), 0);
  } catch {
    return 0;
  }
}

export default function Header() {
  const [count, setCount] = React.useState(getCartCount());

  React.useEffect(() => {
    function onStorage() {
      setCount(getCartCount());
    }
    window.addEventListener("storage", onStorage);
    const timer = setInterval(onStorage, 500);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">Audiophile</Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/checkout" className="cart-link">Checkout ({count})</Link>
        </nav>
      </div>
    </header>
  );
}
