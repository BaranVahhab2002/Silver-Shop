import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import {
  Home,
  Products,
  Cart,
  Brands,
  Profile,
  ProductDetails,
  Favorites,
  Checkout,
} from "../Pages";

import OrderDetails from "../Pages/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:categoryId/:categoryTitle",
        element: <Products />,
      },
      {
        path: "product-details/:id/:title",
        element: <ProductDetails />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
    ],
  },
]);

export default router;
