import React from 'react';
import { expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from '../src/App.jsx';
import CartItem from '../src/CartItem.jsx';
import { categories, plants } from '../src/ProductList.jsx';
import { addItem } from '../src/CartSlice.jsx';
import { createStore } from '../src/store.js';

it('renders one shared Home/Plants/Cart header on every page with a live quantity badge', async () => {
 const user=userEvent.setup(); const store=createStore();
 render(<Provider store={store}><App /></Provider>);
 for(const page of ['Plants','Cart','Home']) {
   const target=page==='Cart' ? screen.getByRole('button',{name:'View cart, 0 items'}) : screen.getByRole('button',{name:page,exact:true});
   await user.click(target);
   expect(screen.getAllByRole('navigation',{name:'Main navigation'})).toHaveLength(1);
   expect(screen.getAllByRole('button',{name:'Home',exact:true})).toHaveLength(1);
   expect(screen.getAllByRole('button',{name:'Plants',exact:true})).toHaveLength(1);
   expect(screen.getAllByTestId('cart-icon')).toHaveLength(1);
   expect(screen.getByRole('button',{name:'View cart, 0 items'})).toHaveTextContent('Cart');
 }
 await user.click(screen.getByRole('button',{name:'Plants',exact:true}));
 await user.click(screen.getByRole('button',{name:'Add Monstera to cart'}));
 await user.click(screen.getByRole('button',{name:'View cart, 1 items'}));
 await user.click(screen.getByRole('button',{name:'Increase Monstera quantity'}));
 expect(screen.getByRole('button',{name:'View cart, 2 items'})).toBeVisible();
});

it('makes the complete catalog available directly from ProductList with six full records per category', () => {
 expect(categories).toHaveLength(3);
 expect(plants).toHaveLength(18);
 for(const category of categories) {
   expect(category.plants).toHaveLength(6);
   for(const plant of category.plants) {
     expect(plant.id).toBeTruthy();expect(plant.name).toBeTruthy();expect(plant.price).toBeGreaterThan(0);
     expect(plant.description).toBeTruthy();expect(plant.image).toBeTruthy();
   }
 }
});

it('CartItem independently renders every row, updates totals, checks out and continues shopping', async () => {
 const user=userEvent.setup(); const store=createStore(); const onContinue=vi.fn();
 store.dispatch(addItem(plants[0]));store.dispatch(addItem(plants[1]));
 render(<Provider store={store}><CartItem onContinueShopping={onContinue} /></Provider>);
 expect(screen.getAllByRole('article')).toHaveLength(2);
 expect(screen.getByTestId('cart-total')).toHaveTextContent('$43.00');
 await user.click(screen.getByRole('button',{name:'Increase Monstera quantity'}));
 expect(screen.getByLabelText('Monstera subtotal')).toHaveTextContent('$50.00');
 expect(screen.getByTestId('cart-total')).toHaveTextContent('$68.00');
 await user.click(screen.getByRole('button',{name:'Decrease Monstera quantity'}));
 expect(screen.getByTestId('cart-total')).toHaveTextContent('$43.00');
 await user.click(screen.getByRole('button',{name:'Remove Snake Plant'}));
 expect(screen.getAllByRole('article')).toHaveLength(1);
 expect(screen.getByTestId('cart-total')).toHaveTextContent('$25.00');
 await user.click(screen.getByRole('button',{name:/Checkout/}));
 expect(screen.getByText(/Coming soon! This is a learning project/)).toBeVisible();
 await user.click(screen.getByRole('button',{name:/Continue Shopping/}));
 expect(onContinue).toHaveBeenCalledTimes(1);
 await user.click(screen.getByRole('button',{name:'Remove Monstera'}));
 expect(screen.queryByRole('article')).not.toBeInTheDocument();
 await user.click(screen.getByRole('button',{name:/Continue Shopping/}));
 expect(onContinue).toHaveBeenCalledTimes(2);
});
