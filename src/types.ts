export type Category =
  | "Baskets"
  | "Running"
  | "Classique"
  | "Boots"
  | "Femme"
  | "Enfant"
  | "PREMIUM"
  | "HOMME"
  | "FEMME"
  | "PROMO"
  | "ENFANTS";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  subcategory?: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  sizes: number[];
  colors: string[];
  stock: number;
  rating: number;
  featured: boolean;
  createdAt: number;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: number;
  qty: number;
}

export type OrderStatus =
  | "En attente"
  | "Confirmée"
  | "Expédiée"
  | "Livrée"
  | "Annulée";

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    wilaya: string;
    address: string;
  };
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
}

export interface Admin {
  username: string;
}
