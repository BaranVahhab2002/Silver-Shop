import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  getStoredState,
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import cartSlice from "./Slices/cartSlice";
import favoritesSlice from "./Slices/favoritesSlice";

const PERSIST_KEY = "root";

const rootReducer = combineReducers({
  cart: cartSlice,
  favorites: favoritesSlice,
});

const persistConfig = {
  key: PERSIST_KEY,
  storage,
  whitelist: ["cart", "favorites"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
window.addEventListener("storage", async (event) => {
  if (event.key !== `persist:${PERSIST_KEY}`) return;

  const payload = await getStoredState(persistConfig);

  if (payload) {
    store.dispatch({ type: REHYDRATE, key: PERSIST_KEY, payload });
  }
});
