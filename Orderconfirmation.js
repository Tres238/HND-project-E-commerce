import React from "react";
import { useParams, Link } from "react-router-dom";

function findOrder(id) {
  try {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    return orders.find((o) => o.id === id);
  } catch {
    return null;
  }
}

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = React.useState(null);

  React.useEffect(() => {
    setOrder(findOrder(orderId));
  }, [orderId]);

  if (!order) {
    return (
      <div className="container">
        <h2>Order not found</h2>
        <p>We could not find the order. Are you sure the ID is correct?</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Thank you — your order is confirmed</h2>
      <p>Order ID: <strong>{order.id}</strong></p>
      <p>Placed at: {new Date(order.createdAt).toLocaleString()}</p>

      <h3>Shipping</h3>
      <p>{order.customer.name}<br />
        {order.customer.address}<br />
        {order.customer.city} — {order.customer.postal}<br />
        Email: {order.customer.email}
      </p>

      <h3>Items</h3>
      <ul>
        {order.items.map((it) => (
          <li key={it.id}>{it.name} × {it.quantity} — ${it.price * it.quantity}</li>
        ))}
      </ul>

      <div className="summary-row total"><strong>Grand total</strong><strong>${order.totals.total}</strong></div>

      <p>
        A confirmation email would be sent (MVP saves locally). To integrate real email sending, add a server API that calls Resend or Nodemailer — see README.
      </p>

      <Link to="/" className="btn-primary">Back to shop</Link>
    </div>
  );
}
