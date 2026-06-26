import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { CATEGORIES } from "../data/products";
import ProductCard from "../components/ProductCard";
import { cn } from "../utils/cn";

export default function Boutique() {
  const { products } = useStore();
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "";
  const sub = params.get("sub") || "";
  const brand = params.get("brand") || "";
  const q = (params.get("q") || "").toLowerCase();
  const [sort, setSort] = useState("recent");
  const [maxPrice, setMaxPrice] = useState(30000);

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (cat) list = list.filter((p) => p.category === cat);
    if (sub) list = list.filter((p) => p.subcategory === sub);
    if (brand) list = list.filter((p) => p.brand === brand);
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q)
      );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    }
    return list;
  }, [products, cat, sub, brand, q, sort, maxPrice]);

  const setCat = (c: string) => {
    const next = new URLSearchParams(params);
    if (c) next.set("cat", c);
    else next.delete("cat");
    next.delete("sub");
    setParams(next);
  };

  const setBrand = (b: string) => {
    const next = new URLSearchParams(params);
    if (b) next.set("brand", b);
    else next.delete("brand");
    setParams(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-zinc-900">
          {sub || brand || cat || (q ? `Résultats pour "${q}"` : "Tous les produits")}
        </h1>
        <p className="text-zinc-500 mt-1">{filtered.length} article(s)</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* sidebar */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-100 p-5">
            <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Catégories
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              <button
                onClick={() => setCat("")}
                className={cn(
                  "text-left text-sm px-3 py-1.5 rounded-lg",
                  !cat
                    ? "bg-orange-50 text-orange-700 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50"
                )}
              >
                Toutes
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "text-left text-sm px-3 py-1.5 rounded-lg",
                    cat === c
                      ? "bg-orange-50 text-orange-700 font-semibold"
                      : "text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-100 p-5">
            <h3 className="font-bold text-zinc-900 mb-3">Marque</h3>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-500"
            >
              <option value="">Toutes les marques</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-100 p-5">
            <h3 className="font-bold text-zinc-900 mb-3">Prix max</h3>
            <input
              type="range"
              min={3000}
              max={30000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-600"
            />
            <p className="text-sm text-zinc-600 mt-1">
              Jusqu'à {maxPrice.toLocaleString("fr-DZ")} DA
            </p>
          </div>
        </aside>

        {/* grid */}
        <div>
          <div className="flex justify-end mb-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-500"
            >
              <option value="recent">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-100 p-16 text-center text-zinc-500">
              Aucun produit ne correspond à votre recherche.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
