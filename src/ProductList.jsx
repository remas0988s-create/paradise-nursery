import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItems, selectCartCount } from "./CartSlice.jsx";
import { money } from "./format.js";
import plant1 from "./assets/plant-1.svg";
import plant2 from "./assets/plant-2.svg";
import plant3 from "./assets/plant-3.svg";
import plant4 from "./assets/plant-4.svg";
import plant5 from "./assets/plant-5.svg";
import plant6 from "./assets/plant-6.svg";
import plant7 from "./assets/plant-7.svg";
import plant8 from "./assets/plant-8.svg";
import plant9 from "./assets/plant-9.svg";
import plant10 from "./assets/plant-10.svg";
import plant11 from "./assets/plant-11.svg";
import plant12 from "./assets/plant-12.svg";
import plant13 from "./assets/plant-13.svg";
import plant14 from "./assets/plant-14.svg";
import plant15 from "./assets/plant-15.svg";
import plant16 from "./assets/plant-16.svg";
import plant17 from "./assets/plant-17.svg";
import plant18 from "./assets/plant-18.svg";

// Single source of catalog data: three categories, six complete plant records each.
export const categories = [
  {
    id: "leafy",
    name: "Leafy Houseplants",
    kicker: "A FRESH PERSPECTIVE",
    description: "Lush leaves and beautiful shapes for your indoor jungle.",
    plants: [
      {
        id: "monstera",
        name: "Monstera",
        price: 25,
        care: "Bright, indirect light",
        description: "Bold split leaves for a beautiful statement.",
        image: plant1,
      },
      {
        id: "snake",
        name: "Snake Plant",
        price: 18,
        care: "Easy care",
        description: "Upright sculptural leaves for a quiet green corner.",
        image: plant2,
      },
      {
        id: "pothos",
        name: "Golden Pothos",
        price: 15,
        care: "Easy care",
        description: "Golden-green trailing leaves with a playful spirit.",
        image: plant3,
      },
      {
        id: "peace",
        name: "Peace Lily",
        price: 22,
        care: "Indirect light",
        description: "Glossy foliage and elegant creamy-white flowers.",
        image: plant4,
      },
      {
        id: "rubber",
        name: "Rubber Plant",
        price: 28,
        care: "Bright, indirect light",
        description: "Deep green leaves with a striking glossy finish.",
        image: plant5,
      },
      {
        id: "fern",
        name: "Boston Fern",
        price: 20,
        care: "Loves humidity",
        description: "Soft arching fronds for a lush, leafy feeling.",
        image: plant6,
      },
    ],
  },
  {
    id: "aromatic",
    name: "Aromatic Plants",
    kicker: "FOLLOW YOUR SENSES",
    description: "Fragrant favorites to brighten your windowsill.",
    plants: [
      {
        id: "lavender",
        name: "Lavender",
        price: 16,
        care: "Sunny spot",
        description: "Purple flower spikes with a familiar floral scent.",
        image: plant7,
      },
      {
        id: "rosemary",
        name: "Rosemary",
        price: 14,
        care: "Sunny spot",
        description: "Needle-like foliage with a warm herbal fragrance.",
        image: plant8,
      },
      {
        id: "mint",
        name: "Mint",
        price: 10,
        care: "Regular watering",
        description: "Fresh scented leaves for a cheerful kitchen garden.",
        image: plant9,
      },
      {
        id: "basil",
        name: "Sweet Basil",
        price: 12,
        care: "Sunny spot",
        description: "Tender green leaves with a sweet herbal aroma.",
        image: plant10,
      },
      {
        id: "jasmine",
        name: "Jasmine",
        price: 24,
        care: "Bright light",
        description: "A flowering climber with delicate white blossoms.",
        image: plant11,
      },
      {
        id: "lemon",
        name: "Lemon Balm",
        price: 13,
        care: "Part sun",
        description: "Textured leaves with a gentle lemony fragrance.",
        image: plant12,
      },
    ],
  },
  {
    id: "succulents",
    name: "Succulents & Cacti",
    kicker: "SMALL BUT FULL OF CHARACTER",
    description: "Sculptural little companions with an easy-going spirit.",
    plants: [
      {
        id: "aloe",
        name: "Aloe Vera",
        price: 17,
        care: "Water sparingly",
        description: "A rosette of fleshy leaves with a graphic silhouette.",
        image: plant13,
      },
      {
        id: "echeveria",
        name: "Echeveria",
        price: 11,
        care: "Sunny spot",
        description: "A compact blue-green rosette in perfect symmetry.",
        image: plant14,
      },
      {
        id: "jade",
        name: "Jade Plant",
        price: 19,
        care: "Easy care",
        description: "Plump oval leaves on a miniature tree-like plant.",
        image: plant15,
      },
      {
        id: "zebra",
        name: "Zebra Haworthia",
        price: 12,
        care: "Indirect light",
        description: "Striped pointed leaves with plenty of personality.",
        image: plant16,
      },
      {
        id: "barrel",
        name: "Golden Barrel Cactus",
        price: 21,
        care: "Sunny spot",
        description: "A round ribbed cactus with a halo of golden spines.",
        image: plant17,
      },
      {
        id: "burro",
        name: "Burro\u2019s Tail",
        price: 15,
        care: "Bright light",
        description: "Cascading stems packed with blue-green leaves.",
        image: plant18,
      },
    ],
  },
];
export const plants = categories.flatMap((category) =>
  category.plants.map((plant) => ({ ...plant, category: category.id })),
);

/** Shared by all three pages: exactly one navigation bar is rendered by App. */
export function NurseryHeader({ page, onNavigate }) {
  const totalQuantity = useSelector(selectCartCount);
  return (
    <header className="site-header">
      <button
        className="brand"
        onClick={() => onNavigate("home")}
        aria-label="Paradise Nursery home"
      >
        <span className="brand-leaf" aria-hidden="true">
          ❧
        </span>
        <span>
          Paradise<small>NURSERY</small>
        </span>
      </button>
      <nav aria-label="Main navigation">
        <button
          aria-current={page === "home" ? "page" : undefined}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>
        <button
          aria-current={page === "plants" ? "page" : undefined}
          onClick={() => onNavigate("plants")}
        >
          Plants
        </button>
      </nav>
      <button
        className="cart-link"
        onClick={() => onNavigate("cart")}
        aria-label={`View cart, ${totalQuantity} items`}
        aria-current={page === "cart" ? "page" : undefined}
      >
        <svg
          aria-hidden="true"
          data-testid="cart-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 7h14l1 14H4L5 7Z" />
          <path d="M8 8V6a4 4 0 0 1 8 0v2" />
        </svg>
        <span className="cart-label">Cart</span>
        <span className="cart-count" aria-live="polite">
          {totalQuantity}
        </span>
      </button>
    </header>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  return (
    <main id="main-content" className="catalog page-wrap">
      <div className="page-heading">
        <div>
          <p className="eyebrow">FIND YOUR NEW LEAF</p>
          <h1>Plants for your everyday.</h1>
        </div>
        <p>
          18 little reasons to bring
          <br />
          the outside in.
        </p>
      </div>
      <nav className="category-nav" aria-label="Plant categories">
        {categories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>
            {category.name}
            <span>{String(category.plants.length).padStart(2, "0")}</span>
          </a>
        ))}
      </nav>
      {categories.map((category) => (
        <section
          id={category.id}
          className="plant-section"
          key={category.id}
          aria-labelledby={`${category.id}-title`}
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{category.kicker}</p>
              <h2 id={`${category.id}-title`}>{category.name}</h2>
            </div>
            <p>{category.description}</p>
          </div>
          <div className="plant-grid">
            {category.plants.map((plant) => {
              const added = items.some((item) => item.id === plant.id);
              return (
                <article
                  className="plant-card"
                  key={plant.id}
                  aria-label={plant.name}
                >
                  <div className="plant-image">
                    <span className="care-tag">{plant.care}</span>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      width="400"
                      height="360"
                      loading="lazy"
                    />
                  </div>
                  <div className="plant-details">
                    <div className="plant-title">
                      <h3>{plant.name}</h3>
                      <span>{money(plant.price)}</span>
                    </div>
                    <p>{plant.description}</p>
                    <button
                      className={`add-button ${added ? "added" : ""}`}
                      disabled={added}
                      onClick={() => dispatch(addItem(plant))}
                      aria-label={
                        added
                          ? `${plant.name} added to cart`
                          : `Add ${plant.name} to cart`
                      }
                    >
                      <span>{added ? "Added to Cart" : "Add to Cart"}</span>
                      <span aria-hidden="true">{added ? "✓" : "+"}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
