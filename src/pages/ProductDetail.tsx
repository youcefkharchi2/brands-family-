import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  Check,
  ChevronRight,
} from "lucide-react";
import { useStore, formatDA } from "../store/StoreContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [size, setSize] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [err, setErr] = useState("");

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-zinc-500">Produit introuvable.</p>
        <Link to="/boutique" className="text-orange-600 font-semibold">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    if (!size) {
      setErr("Veuillez choisir une pointure.");
      return;
    }
    setErr("");
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-sm text-zinc-500 flex items-center gap-1 mb-6">
        <Link to="/" className="hover:text-orange-600">
          Accueil
        </Link>
        <ChevronRight size={14} />
        <Link
          to={`/boutique?cat=${product.category}`}
          className="hover:text-orange-600"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-zinc-800 font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-orange-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
              -{discount}%
            </span>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-orange-600 font-bold">
            {product.brand}
          </p>
          <h1 className="text-3xl font-black text-zinc-900 mt-1">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  className={
                    s <= Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-zinc-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-zinc-500">{product.rating} / 5</span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-4xl font-black text-zinc-900">
              {formatDA(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-zinc-400 line-through">
                {formatDA(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="text-zinc-600 leading-relaxed mt-5">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-zinc-900 mb-2">
              Couleurs : <span className="text-zinc-500 font-normal">{product.colors.join(", ")}</span>
            </p>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-zinc-900 mb-2">Pointure</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setErr("");
                  }}
                  className={
                    "h-11 w-11 rounded-xl border text-sm font-semibold transition " +
                    (size === s
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
            {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-zinc-200 rounded-xl">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-12 w-12 grid place-items-center text-zinc-600 hover:bg-zinc-50"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-12 w-12 grid place-items-center text-zinc-600 hover:bg-zinc-50"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-sm text-zinc-500">
              {product.stock > 0
                ? `${product.stock} en stock`
                : "Rupture de stock"}
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              disabled={product.stock === 0}
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-300 text-white font-bold px-6 py-3.5 rounded-full transition"
            >
              {added ? (
                <>
                  <Check size={18} /> Ajouté au panier
                </>
              ) : (
                "Ajouter au panier"
              )}
            </button>
            <button
              disabled={product.stock === 0}
              onClick={() => {
                if (!size) {
                  setErr("Veuillez choisir une pointure.");
                  return;
                }
                addToCart({
                  productId: product.id,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  size,
                  qty,
                });
                navigate("/panier");
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 text-white font-bold px-6 py-3.5 rounded-full transition"
            >
              Acheter maintenant
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-zinc-600 bg-zinc-50 rounded-xl p-3">
              <Truck size={18} className="text-orange-600" /> Livraison 58
              wilayas
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 bg-zinc-50 rounded-xl p-3">
              <ShieldCheck size={18} className="text-orange-600" /> Paiement à la
              livraison
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-6">
            Vous aimerez aussi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
