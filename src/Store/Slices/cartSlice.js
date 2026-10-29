import { createSlice } from "@reduxjs/toolkit";

const sameId = (a, b) => String(a) === String(b);

const toAmount = (value) => Math.max(1, Math.floor(Number(value)) || 1);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: {
      reducer(state, { payload: { product, quantity } }) {
        const existing = state.items.find((item) => sameId(item.id, product.id));

        if (existing) {
          existing.quantity += quantity;
        } else {
          state.items.push({ ...product, quantity });
        }
      },
      prepare(product, quantity = 1) {
        const price = Number(product.price);

        return {
          payload: {
            product: {
              id: product.id,
              name: String(product.name ?? ""),
              image: product.image ?? "",
              price: Number.isFinite(price) ? price : 0,
            },
            quantity: toAmount(quantity),
          },
        };
      },
    },

    increaseQuantity(state, { payload: id }) {
      const item = state.items.find((entry) => sameId(entry.id, id));
      if (item) item.quantity += 1;
    },

    decreaseQuantity(state, { payload: id }) {
      const item = state.items.find((entry) => sameId(entry.id, id));
      if (item) item.quantity = Math.max(1, item.quantity - 1);
    },

    removeFromCart(state, { payload: id }) {
      state.items = state.items.filter((item) => !sameId(item.id, id));
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
