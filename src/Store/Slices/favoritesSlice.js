import { createSlice } from "@reduxjs/toolkit";

const sameId = (a, b) => String(a) === String(b);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: [] },
  reducers: {
    toggleFavorite(state, { payload: product }) {
      const exists = state.items.some((item) => sameId(item.id, product.id));

      state.items = exists
        ? state.items.filter((item) => !sameId(item.id, product.id))
        : [...state.items, product];
    },

    removeFavorite(state, { payload: id }) {
      state.items = state.items.filter((item) => !sameId(item.id, id));
    },
  },
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;

export default favoritesSlice.reducer;
