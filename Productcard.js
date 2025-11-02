import React from "react";

export default function ProductCard({ product, onAdd }) {
  const [qty, setQty] = React.useState(1);
  return (
    <div className="product-card">
      <div className="product-media">
        {/* placeholder */}
        <div className="product-image">IMG</div>
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <div className="product-bottom">
          <strong>${product.price}</strong>
          <div className="qty-add">
            <input
              aria-label={`Quantity for ${product.name}`}
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            />
            <button onClick={() => onAdd(product, qty)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
