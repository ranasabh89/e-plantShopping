import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, price } = action.payload;
      const itemCost = cost ?? price;
      const existing = state.items.find((item) => item.name === name);
      if (existing) existing.quantity += 1;
      else state.items.push({ name, image, cost: itemCost, quantity: 1 });
    },
    removeItem: (state, action) => {
      const name = typeof action.payload === 'string' ? action.payload : action.payload.name;
      state.items = state.items.filter((item) => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((entry) => entry.name === name);
      if (item && quantity > 0) item.quantity = quantity;
    }
  }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
