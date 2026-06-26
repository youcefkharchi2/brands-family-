import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Product } from "../types";
import { formatDA } from "../store/StoreContext";

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/produit/${product.id}`}
      className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute inset-0 bg-black/50 grid place-items-center text-white font-bold">
            Rupture de stock
          </span>
        )}
        {product.featured && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded-md">
            TOP
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wide text-orange-600 font-bold">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1 mt-0.5">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-zinc-500">{product.rating}</span>
          <span className="text-xs text-zinc-300">·</span>
          <span className="text-xs text-zinc-400">{product.category}</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-zinc-900">
            {formatDA(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-zinc-400 line-through">
              {formatDA(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
