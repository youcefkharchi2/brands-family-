import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product, CartItem, Order, OrderStatus } from "../types";
import { seedProducts } from "../data/products";

const ADMIN_USER = "admin";
const ADMIN_PASS = "footland2026";

interface StoreState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isAdmin: boolean;
  // products
  addProduct: (p: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  // cart
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQty: (productId: string, size: number, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  // orders
  placeOrder: (customer: Order["customer"]) => string;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  // auth
  login: (u: string, p: string) => boolean;
  logout: () => void;
}

const StoreContext = createContext<StoreState | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    load("fl_products", seedProducts)
  );
  const [cart, setCart] = useState<CartItem[]>(() => load("fl_cart", []));
  const [orders, setOrders] = useState<Order[]>(() => load("fl_orders", []));
  const [isAdmin, setIsAdmin] = useState<boolean>(() =>
    load("fl_admin", false)
  );

  useEffect(() => {
    localStorage.setItem("fl_products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem("fl_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("fl_orders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem("fl_admin", JSON.stringify(isAdmin));
  }, [isAdmin]);

  const addProduct: StoreState["addProduct"] = (p) => {
    setProducts((prev) => [
      { ...p, id: "p" + Date.now(), createdAt: Date.now() },
      ...prev,
    ]);
  };
  const updateProduct: StoreState["updateProduct"] = (p) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  };
  const deleteProduct: StoreState["deleteProduct"] = (id) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  };

  const addToCart: StoreState["addToCart"] = (item) => {
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.productId === item.productId && c.size === item.size
      );
      if (existing) {
        return prev.map((c) =>
          c.productId === item.productId && c.size === item.size
            ? { ...c, qty: c.qty + item.qty }
            : c
        );
      }
      return [...prev, item];
    });
  };
  const removeFromCart: StoreState["removeFromCart"] = (productId, size) => {
    setCart((prev) =>
      prev.filter((c) => !(c.productId === productId && c.size === size))
    );
  };
  const updateQty: StoreState["updateQty"] = (productId, size, qty) => {
    if (qty <= 0) return removeFromCart(productId, size);
    setCart((prev) =>
      prev.map((c) =>
        c.productId === productId && c.size === size ? { ...c, qty } : c
      )
    );
  };
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.qty * c.price, 0);

  const placeOrder: StoreState["placeOrder"] = (customer) => {
    const id = "CMD" + Date.now().toString().slice(-7);
    const order: Order = {
      id,
      customer,
      items: cart,
      total: cartTotal,
      status: "En attente",
      createdAt: Date.now(),
    };
    setOrders((prev) => [order, ...prev]);
    // reduce stock
    setProducts((prev) =>
      prev.map((p) => {
        const ordered = cart
          .filter((c) => c.productId === p.id)
          .reduce((s, c) => s + c.qty, 0);
        return ordered ? { ...p, stock: Math.max(0, p.stock - ordered) } : p;
      })
    );
    setCart([]);
    return id;
  };
  const updateOrderStatus: StoreState["updateOrderStatus"] = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };
  const deleteOrder: StoreState["deleteOrder"] = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const login: StoreState["login"] = (u, p) => {
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAdmin(false);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        isAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function formatDA(n: number) {
  return new Intl.NumberFormat("fr-DZ").format(n) + " DA";
}
