import {
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React, { useContext } from "react";
import Categories from "./components/Categories";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Header from "./components/Header";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Header />} />
        <Route path="/products" element={<Product />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    )
  );

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
};

const Root = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
