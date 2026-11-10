import { useEffect, useState } from "react";
import AboutUs from "./AboutUs.jsx";
import ProductList, { NurseryHeader } from "./ProductList.jsx";
import CartItem from "./CartItem.jsx";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => {
    window.scrollTo?.(0, 0);
  }, [page]);
  const navigate = (next) => setPage(next);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement">
        A little green. A lot of joy. <span>Find your perfect plant.</span>
      </div>
      <NurseryHeader page={page} onNavigate={navigate} />
      {page === "home" && (
        <main id="main-content">
          <section className="hero">
            <div className="hero-copy">
              <p className="welcome-title">Welcome to Paradise Nursery</p>
              <p className="eyebrow">GOOD THINGS ARE GROWING</p>
              <h1>
                Your own
                <br />
                little <em>paradise.</em>
              </h1>
              <p>
                Make room for something green.
                <br />
                Beautiful plants, for every corner of your home.
              </p>
              <button
                className="primary-button"
                onClick={() => navigate("plants")}
              >
                Get Started <span aria-hidden="true">↗</span>
              </button>
              <div className="hero-note">
                <span aria-hidden="true">✳</span> A happier home starts with a
                single leaf.
              </div>
            </div>
            <div
              className="hero-art"
              role="img"
              aria-label="A sunlit collection of leafy plants in terracotta pots"
            >
              <span className="hero-stamp">
                GROW A LITTLE
                <br />
                <b>happiness</b>
                <br />
                EVERY DAY
              </span>
            </div>
          </section>
          <div className="benefits">
            <span>Thoughtfully selected</span>
            <span>18 plants to fall for</span>
            <span>From first leaf to full jungle</span>
          </div>
          <AboutUs />
        </main>
      )}
      {page === "plants" && <ProductList />}
      {page === "cart" && (
        <CartItem onContinueShopping={() => navigate("plants")} />
      )}
      <footer>
        <span className="footer-name">Paradise Nursery</span>
        <span>Bringing nature home, one plant at a time.</span>
        <small>
          © {new Date().getFullYear()} Paradise Nursery · Learning project by
          Remas Alqarni
        </small>
      </footer>
    </>
  );
}
