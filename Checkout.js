import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

function calcTotals(cart) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const taxes = Math.round(subtotal * 0.075);
  const total = subtotal + shipping + taxes;
  return { subtotal, shipping, taxes, total };
}

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState(readCart());
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: ""
  });
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    setCart(readCart());
  }, []);

  const totals = calcTotals(cart);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.postal.trim()) e.postal = "Postal code required";
    if (cart.length === 0) e.cart = "Cart is empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // create order object
    const id = uuidv4().slice(0, 8).toUpperCase();
    const order = {
      id,
      customer: { ...form },
      items: cart,
      totals,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // MVP: save order to localStorage (replace with Convex API later)
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // clear cart
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));

    // Navigate to order confirmation
    setTimeout(() => {
      setSubmitting(false);
      navigate(`/order/${order.id}`);
    }, 600);
  }

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full name
            <input name="name" value={form.name} onChange={handleChange} aria-describedby="err-name" />
            {errors.name && <small id="err-name" className="error">{errors.name}</small>}
          </label>

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} aria-describedby="err-email" />
            {errors.email && <small id="err-email" className="error">{errors.email}</small>}
          </label>

          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>

          <label>
            Address
            <input name="address" value={form.address} onChange={handleChange} aria-describedby="err-address" />
            {errors.address && <small id="err-address" className="error">{errors.address}</small>}
          </label>

          <label>
            City
            <input name="city" value={form.city} onChange={handleChange} aria-describedby="err-city" />
            {errors.city && <small id="err-city" className="error">{errors.city}</small>}
          </label>

          <label>
            Postal code
            <input name="postal" value={form.postal} onChange={handleChange} aria-describedby="err-postal" />
            {errors.postal && <small id="err-postal" className="error">{errors.postal}</small>}
          </label>

          {errors.cart && <p className="error">{errors.cart}</p>}

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Processing..." : `Pay $${totals.total}`}
          </button>
        </form>

        <aside className="order-summary">
          <h3>Order summary</h3>
          <div>
            {cart.length === 0 && <p>Your cart is empty.</p>}
            {cart.map((it) => (
              <div key={it.id} className="summary-item">
                <div>{it.name} × {it.quantity}</div>
                <div>${it.price * it.quantity}</div>
              </div>
            ))}
          </div>

          <hr />
          <div className="summary-row"><span>Subtotal</span><span>${totals.subtotal}</span></div>
          <div className="summary-row"><span>Shipping</span><span>${totals.shipping}</span></div>
          <div className="summary-row"><span>Taxes</span><span>${totals.taxes}</span></div>
          <div className="summary-row total"><strong>Total</strong><strong>${totals.total}</strong></div>
        </aside>
      </div>
    </div>
  );
}
