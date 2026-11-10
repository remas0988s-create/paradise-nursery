import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    // One row per plant. Repeated additions increase its quantity.
    addItem(state, { payload: plant }) {
      const existing = state.items.find(item => item.id === plant.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...plant, quantity: 1 });
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity(state, { payload: { id, quantity } }) {
      const item = state.items.find(item => item.id === id);
      // Reject invalid input; zero removes the item.
      if (!item || !Number.isInteger(quantity) || quantity < 0) return;
      if (quantity === 0) state.items = state.items.filter(item => item.id !== id);
      else item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCartItems = state => state.cart.items;
// Derive totals rather than keeping a second, potentially stale copy in state.
export const selectCartCount = state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = state => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export default cartSlice.reducer;
