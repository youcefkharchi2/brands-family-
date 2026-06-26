import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Phone, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useStore } from "../store/StoreContext";
import { CATEGORIES, SUBCATEGORIES } from "../data/products";
import { cn } from "../utils/cn";

export default function Header() {
  const { cartCount, products } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const megaMenuBrands = useMemo(() => {
    const scopedProducts = hoveredCategory
      ? products.filter((product) => product.category === hoveredCategory)
      : products;

    const brands = Array.from(
      new Set(scopedProducts.map((product) => product.brand).filter(Boolean))
    ).sort();

    return brands.length
      ? brands
      : Array.from(new Set(products.map((product) => product.brand).filter(Boolean))).sort();
  }, [products, hoveredCategory]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/boutique?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-orange-600 text-white text-center text-xs sm:text-sm py-2 px-4 font-medium">
        🚚 Livraison disponible sur les 58 wilayas · Paiement à la livraison
      </div>
      <div className="border-b border-zinc-100">
        <div className="w-full px-0 flex items-center justify-between h-16">
          <div className="flex items-center gap-4 ml-10">
            <button
              className="lg:hidden text-zinc-700"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/src/image/brands.png"
                alt="Brands Family"
                className="h-12 w-auto"
              />
              <span className="text-3xl font-extrabold tracking-tight text-black">
                Brands family
              </span>
            </Link>
          </div>

          <form
            onSubmit={submitSearch}
            className="hidden md:flex flex-1 max-w-xl mx-auto ml-80 mr-100 relative"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher une chaussure, une marque..."
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 pr-12 text-sm outline-none focus:border-orange-500 focus:bg-white"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full bg-orange-600 text-white grid place-items-center"
            >
              <Search size={16} />
            </button>
          </form>

          <div className="flex items-center gap-3 mr-10">
            <a
              href="tel:0561811883"
              className="hidden xl:flex items-center gap-2 text-base text-zinc-600"
            >
              <Phone size={20} className="text-orange-600" />
              0561 81 18 83
            </a>
            <Link
              to="/panier"
              className="relative inline-flex items-center justify-center h-12 w-12 rounded-full hover:bg-zinc-100"
            >
              <ShoppingBag size={26} className="text-zinc-800" />
              <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-orange-600 text-white text-[11px] font-bold grid place-items-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* desktop nav */}
      <nav
        className="relative hidden lg:block border-b border-zinc-100"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="mx-auto max-w-7xl px-4 flex items-center gap-1 h-12 mr-120 ml-165">
          <NavLink
            to="/boutique"
            className={({ isActive }) =>
              cn(
                "px-4 py-2 text-xs font-medium rounded-md hover:text-orange-600",
                isActive ? "text-orange-600" : "text-zinc-700"
              )
            }
          >
            TOUS
          </NavLink>
          {CATEGORIES.map((c) => (
            <div
              key={c}
              className="group static"
              onMouseEnter={() => setHoveredCategory(c)}
            >
              <NavLink
                to={`/boutique?cat=${encodeURIComponent(c)}`}
                className={cn(
                  "px-4 py-2 text-xs font-medium rounded-md text-zinc-700 hover:text-orange-600 flex items-center gap-1",
                  hoveredCategory === c && "text-orange-600"
                )}
              >
                {c}
                <ChevronDown size={12} />
              </NavLink>
            </div>
          ))}
          <Link
            to="/admin"
            className="ml-auto px-4 py-2 text-sm font-semibold text-zinc-400 hover:text-orange-600"
          >
            Espace Admin
          </Link>
        </div>
        {hoveredCategory && SUBCATEGORIES[hoveredCategory] && (
          <div
            className="absolute left-0 top-full z-50 w-full border-t border-zinc-200 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-8 py-10 lg:grid-cols-[220px_1fr_1fr]">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Collection
                  </p>
                  <h3 className="text-2xl font-black text-zinc-900">
                    {hoveredCategory}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Découvrir rapidement toute la sélection {hoveredCategory.toLowerCase()}.
                  </p>
                </div>
                <Link
                  to={`/boutique?cat=${encodeURIComponent(hoveredCategory)}`}
                  onClick={() => setHoveredCategory(null)}
                  className="inline-flex text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                  Voir toute la collection
                </Link>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Catégories
                    </p>
                    <h4 className="mt-2 text-lg font-bold text-zinc-900">
                      Explorer {hoveredCategory}
                    </h4>
                  </div>
                  <Link
                    to={`/boutique?cat=${encodeURIComponent(hoveredCategory)}`}
                    onClick={() => setHoveredCategory(null)}
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Voir tout
                  </Link>
                </div>

                <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {SUBCATEGORIES[hoveredCategory].map((sub) => (
                    <Link
                      key={sub}
                      to={`/boutique?cat=${encodeURIComponent(hoveredCategory)}&sub=${encodeURIComponent(sub)}`}
                      onClick={() => setHoveredCategory(null)}
                      className="text-sm font-medium text-zinc-700 transition-colors hover:text-orange-600"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Marques
                </p>
                <h4 className="mt-2 text-lg font-bold text-zinc-900">
                  Marques populaires
                </h4>
                <p className="mt-1 text-sm text-zinc-500">
                  Choisir une marque pour filtrer rapidement les produits.
                </p>

                <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {megaMenuBrands.map((brand) => (
                    <Link
                      key={brand}
                      to={`/boutique?cat=${encodeURIComponent(hoveredCategory)}&brand=${encodeURIComponent(brand)}`}
                      onClick={() => setHoveredCategory(null)}
                      className="text-sm font-medium uppercase tracking-wide text-zinc-700 transition-colors hover:text-orange-600"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="lg:hidden border-b border-zinc-100 bg-white">
          <form onSubmit={submitSearch} className="p-4 relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher..."
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </form>
          <div className="px-2 pb-3 flex flex-col">
            <Link
              to="/boutique"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-xs font-medium text-zinc-800 rounded-md hover:bg-zinc-50"
            >
              TOUS
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                to={`/boutique?cat=${encodeURIComponent(c)}`}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-xs font-medium text-zinc-800 rounded-md hover:bg-zinc-50"
              >
                {c}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-orange-600 rounded-md hover:bg-zinc-50"
            >
              Espace Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
