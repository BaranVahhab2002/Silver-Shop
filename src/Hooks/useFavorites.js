import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFavorite,
  selectFavorites,
  toggleFavorite,
} from "../Store/Slices/favoritesSlice";

export default function useFavorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const actions = useMemo(
    () => ({
      toggle: (product) => dispatch(toggleFavorite(product)),
      remove: (id) => dispatch(removeFavorite(id)),
    }),
    [dispatch],
  );

  return {
    favorites,
    isFavorite: (id) =>
      favorites.some((item) => String(item.id) === String(id)),
    ...actions,
  };
}
