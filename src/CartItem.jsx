import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import { money } from './ProductList.jsx';
export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const change = quantity => dispatch(updateQuantity({ id: item.id, quantity }));
  return <article className="cart-item" aria-label={`${item.name} cart item`}>
    <img src={item.image} alt={item.name} width="140" height="140" />
    <div className="cart-item-info"><h2>{item.name}</h2><p>{money(item.price)} each</p>
      <div className="quantity" aria-label={`Quantity for ${item.name}`}>
        <button aria-label={`Decrease ${item.name} quantity`} onClick={() => change(item.quantity - 1)}>−</button>
        <output aria-label={`${item.name} quantity`}>{item.quantity}</output>
        <button aria-label={`Increase ${item.name} quantity`} onClick={() => change(item.quantity + 1)}>+</button>
      </div>
    </div>
    <div className="cart-item-end"><strong aria-label={`${item.name} subtotal`}>{money(item.price * item.quantity)}</strong><button className="text-button remove" onClick={() => dispatch(removeItem(item.id))} aria-label={`Remove ${item.name}`}>Remove</button></div>
  </article>;
}
