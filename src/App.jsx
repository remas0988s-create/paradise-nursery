import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList, { money } from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import { selectCartCount, selectCartItems, selectCartTotal } from './CartSlice.jsx';
import hero from './assets/hero.svg';
import './App.css';

function BagIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>;
}
export default function App() {
  const [page, setPage] = useState('home');
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  useEffect(() => { window.scrollTo?.(0, 0); }, [page]);
  const navigate = next => { setCheckoutMessage(false); setPage(next); };
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="announcement">A little green. A lot of joy. <span>Find your perfect plant.</span></div>
    <header className="site-header"><button className="brand" onClick={() => navigate('home')} aria-label="Paradise Nursery home"><span className="brand-leaf" aria-hidden="true">❧</span><span>Paradise<small>NURSERY</small></span></button>
      <nav aria-label="Main navigation"><button aria-current={page === 'home' ? 'page' : undefined} onClick={() => navigate('home')}>Home</button><button aria-current={page === 'plants' ? 'page' : undefined} onClick={() => navigate('plants')}>Our plants</button></nav>
      <button className="cart-link" onClick={() => navigate('cart')} aria-label={`View cart, ${count} items`} aria-current={page === 'cart' ? 'page' : undefined}><BagIcon/><span className="cart-label">Your cart</span><span className="cart-count" aria-live="polite">{count}</span></button>
    </header>
    {page === 'home' && <main id="main-content">
      <section className="hero"><div className="hero-copy"><p className="eyebrow">GOOD THINGS ARE GROWING</p><h1>Your own<br />little <em>paradise.</em></h1><p>Make room for something green.<br />Beautiful plants, for every corner of your home.</p><button className="primary-button" onClick={() => navigate('plants')}>Get Started <span aria-hidden="true">↗</span></button><div className="hero-note"><span aria-hidden="true">✳</span> A happier home starts with a single leaf.</div></div><div className="hero-art"><img src={hero} alt="A sunlit collection of leafy plants in terracotta pots"/><span className="hero-stamp">GROW A LITTLE<br /><b>happiness</b><br />EVERY DAY</span></div></section>
      <div className="benefits"><span>Thoughtfully selected</span><span>18 plants to fall for</span><span>From first leaf to full jungle</span></div><AboutUs />
    </main>}
    {page === 'plants' && <ProductList />}
    {page === 'cart' && <main id="main-content" className="cart-page page-wrap"><div className="page-heading"><div><p className="eyebrow">YOUR GROWING COLLECTION</p><h1>Your cart.</h1></div><p aria-live="polite">{count} {count === 1 ? 'plant' : 'plants'} ready for a new home</p></div>
      {items.length === 0 ? <section className="empty-cart"><span aria-hidden="true">❧</span><h2>A little room for green.</h2><p>Your cart is empty. Let’s find your first plant.</p><button className="primary-button" onClick={() => navigate('plants')}>Continue Shopping <span aria-hidden="true">↗</span></button></section> : <div className="cart-layout"><section className="cart-items" aria-label="Cart products">{items.map(item => <CartItem key={item.id} item={item} />)}<button className="text-button continue" onClick={() => navigate('plants')}>← Continue Shopping</button></section><aside className="order-summary"><p className="eyebrow">A LITTLE GREEN GOES A LONG WAY</p><h2>Order summary</h2><div><span>Total plants</span><span data-testid="cart-total-count">{count}</span></div><div><span>Subtotal</span><span>{money(total)}</span></div><p className="shipping-note">Demo store · no shipping or taxes applied.</p><div className="summary-total"><strong>Total</strong><strong data-testid="cart-total" aria-live="polite">{money(total)}</strong></div><button className="primary-button checkout" onClick={() => setCheckoutMessage(true)}>Checkout <span aria-hidden="true">↗</span></button>{checkoutMessage && <p className="checkout-message" role="status">Coming soon! This is a learning project; no payment or order has been placed.</p>}</aside></div>}
    </main>}
    <footer><span className="footer-name">Paradise Nursery</span><span>Bringing nature home, one plant at a time.</span><small>© {new Date().getFullYear()} Paradise Nursery · Learning project by Remas Alqarni</small></footer>
  </>;
}
