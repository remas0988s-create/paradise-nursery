import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx';
export const createStore = () => configureStore({ reducer: { cart: cartReducer } });
export const store = createStore();
