import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice.jsx';
import { categories, plants } from './plants.js';
export const money = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  return <main id="main-content" className="catalog page-wrap">
    <div className="page-heading"><div><p className="eyebrow">FIND YOUR NEW LEAF</p><h1>Plants for your everyday.</h1></div><p>18 little reasons to bring<br />the outside in.</p></div>
    <nav className="category-nav" aria-label="Plant categories">{categories.map(category => <a key={category.id} href={`#${category.id}`}>{category.name}<span>06</span></a>)}</nav>
    {categories.map(category => <section id={category.id} className="plant-section" key={category.id} aria-labelledby={`${category.id}-title`}>
      <div className="section-heading"><div><p className="eyebrow">{category.kicker}</p><h2 id={`${category.id}-title`}>{category.name}</h2></div><p>{category.description}</p></div>
      <div className="plant-grid">{plants.filter(plant => plant.category === category.id).map(plant => {
        const added = items.some(item => item.id === plant.id);
        return <article className="plant-card" key={plant.id} aria-label={plant.name}>
          <div className="plant-image"><span className="care-tag">{plant.care}</span><img src={plant.image} alt={plant.name} width="400" height="360" loading="lazy" /></div>
          <div className="plant-details"><div className="plant-title"><h3>{plant.name}</h3><span>{money(plant.price)}</span></div><p>{plant.description}</p>
          <button className={`add-button ${added ? 'added' : ''}`} disabled={added} onClick={() => dispatch(addItem(plant))} aria-label={added ? `${plant.name} added to cart` : `Add ${plant.name} to cart`}><span>{added ? 'Added to Cart' : 'Add to Cart'}</span><span aria-hidden="true">{added ? '✓' : '+'}</span></button></div>
        </article>;
      })}</div>
    </section>)}
  </main>;
}
