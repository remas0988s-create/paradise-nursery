import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "./CartSlice.jsx";
import { money } from "./format.js";

// A row only dispatches actions; the Redux slice remains the single source of truth.
function CartRow({ item }) {
  const dispatch = useDispatch();
  const handleIncrement = () =>
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  const handleDecrement = () =>
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  const handleRemove = () => dispatch(removeItem(item.id));
  return (
    <article className="cart-item" aria-label={`${item.name} cart item`}>
      <img src={item.image} alt={item.name} width="140" height="140" />
      <div className="cart-item-info">
        <h2>{item.name}</h2>
        <p>{money(item.price)} each</p>
        <div className="quantity" aria-label={`Quantity for ${item.name}`}>
          <button
            aria-label={`Decrease ${item.name} quantity`}
            onClick={handleDecrement}
          >
            −
          </button>
          <output aria-label={`${item.name} quantity`}>{item.quantity}</output>
          <button
            aria-label={`Increase ${item.name} quantity`}
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item-end">
        <strong aria-label={`${item.name} subtotal`}>
          {money(item.price * item.quantity)}
        </strong>
        <button
          className="text-button remove"
          onClick={handleRemove}
          aria-label={`Remove ${item.name}`}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

/** Complete shopping-cart view: all rows, total cost, checkout and navigation. */
export default function CartItem({ onContinueShopping }) {
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartCount);
  const totalCost = useSelector(selectCartTotal);
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const handleContinueShopping = () => onContinueShopping();
  const handleCheckout = () => setCheckoutMessage(true);

  return (
    <main id="main-content" className="cart-page page-wrap">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR GROWING COLLECTION</p>
          <h1>Your cart.</h1>
        </div>
        <p aria-live="polite">
          {totalQuantity} {totalQuantity === 1 ? "plant" : "plants"} ready for a
          new home
        </p>
      </div>
      {items.length === 0 ? (
        <section className="empty-cart">
          <span aria-hidden="true">❧</span>
          <h2>A little room for green.</h2>
          <p>Your cart is empty. Let’s find your first plant.</p>
          <button className="primary-button" onClick={handleContinueShopping}>
            Continue Shopping <span aria-hidden="true">↗</span>
          </button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Cart products">
            {items.map((item) => (
              <CartRow key={item.id} item={item} />
            ))}
            <button
              className="text-button continue"
              onClick={handleContinueShopping}
            >
              ← Continue Shopping
            </button>
          </section>
          <aside className="order-summary">
            <p className="eyebrow">A LITTLE GREEN GOES A LONG WAY</p>
            <h2>Order summary</h2>
            <div>
              <span>Total plants</span>
              <span data-testid="cart-total-count">{totalQuantity}</span>
            </div>
            <div>
              <span>Subtotal</span>
              <span>{money(totalCost)}</span>
            </div>
            <p className="shipping-note">
              Demo store · no shipping or taxes applied.
            </p>
            <div className="summary-total">
              <strong>Total</strong>
              <strong data-testid="cart-total" aria-live="polite">
                {money(totalCost)}
              </strong>
            </div>
            <button
              className="primary-button checkout"
              onClick={handleCheckout}
            >
              Checkout <span aria-hidden="true">↗</span>
            </button>
            {checkoutMessage && (
              <p className="checkout-message" role="status">
                Coming soon! This is a learning project; no payment or order has
                been placed.
              </p>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
