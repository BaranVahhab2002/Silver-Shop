import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from "../Store/Slices/cartSlice";

export default function useCart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const actions = useMemo(
    () => ({
      add: (product, quantity) => dispatch(addToCart(product, quantity)),
      increase: (id) => dispatch(increaseQuantity(id)),
      decrease: (id) => dispatch(decreaseQuantity(id)),
      remove: (id) => dispatch(removeFromCart(id)),
      clear: () => dispatch(clearCart()),
    }),
    [dispatch],
  );

  return {
    items,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    ...actions,
  };
}
