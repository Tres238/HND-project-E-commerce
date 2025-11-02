import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

export default function Home() {
  const navigate = useNavigate();

  function handleAdd(product, qty) {
    const cart = getCart();
    const existing = cart.find((c) => c.id === product.id);
    if (existing) existing.quantity += Number(qty);
    else cart.push({ id: product.id, name: product.name, price: product.price, quantity: Number(qty) });
    localStorage.setItem("cart", JSON.stringify(cart));
    // simple visual toast:
    alert(`${product.name} added to cart`);
    // notify router / header via storage event
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className="container">
      <h2>Featured Products</h2>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
      <div className="cta-row">
        <button onClick={() => navigate("/checkout")} className="btn-primary">Go to Checkout</button>
      </div>
    </div>
  );
}
