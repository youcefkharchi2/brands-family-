import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./store/StoreContext";
import StoreLayout from "./components/StoreLayout";
import Home from "./pages/Home";
import Boutique from "./pages/Boutique";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<StoreLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/commande" element={<Checkout />} />
          </Route>

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="produits" element={<AdminProducts />} />
            <Route path="commandes" element={<AdminOrders />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
