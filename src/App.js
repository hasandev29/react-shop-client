import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import AdminProductList from "./pages/admin/productList/AdminProductList";
import ScrollToTop from "./ScrollToTop";
import { Product } from "./pages/Product";
import Cart from "./pages/Cart";
import { Success } from "./pages/success/Success";
import { useSelector } from "react-redux";
import RequireAuth from "./routes/RequireAuth";
import { AddProduct } from "./pages/admin/addProduct/AddProduct";
import { AdminLayout } from "./pages/admin/AdminLayout";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.data?.isAdmin;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products/:category" element={<ProductList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<Product />} />
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<div>No Element found</div>} />
        </Route>
        <Route path="/success" element={<Success />} />

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <RequireAuth>
                <AdminProductList />
              </RequireAuth>
            }
          />
          <Route
            path="addProduct"
            element={
              <RequireAuth>
                <AddProduct />
              </RequireAuth>
            }
          />
          <Route
            path="editProduct/:id"
            element={
              <RequireAuth>
                <AddProduct />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
