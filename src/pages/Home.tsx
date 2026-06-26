import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { CATEGORIES } from "../data/products";
import ProductCard from "../components/ProductCard";

const catImages: Record<string, string> = {
  Baskets:
    "https://images.pexels.com/photos/19869759/pexels-photo-19869759.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Running:
    "https://images.pexels.com/photos/29699313/pexels-photo-29699313.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Classique:
    "https://images.pexels.com/photos/19166246/pexels-photo-19166246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Boots:
    "https://images.pexels.com/photos/27256471/pexels-photo-27256471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Femme:
    "https://images.pexels.com/photos/27988923/pexels-photo-27988923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Enfant:
    "https://images.pexels.com/photos/27385022/pexels-photo-27385022.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
};

export default function Home() {
  const { products } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const newest = [...products]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-zinc-900">
        <img
          src="https://images.pexels.com/photos/19882433/pexels-photo-19882433.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <span className="inline-block bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-5">
            NOUVELLE COLLECTION 2026
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white max-w-2xl leading-tight">
            Trouvez la paire <span className="text-orange-500">parfaite</span>{" "}
            pour chaque pas
          </h1>
          <p className="mt-5 text-zinc-300 max-w-xl text-lg">
            Le meilleur site de vente de chaussures en ligne en Algérie. Homme,
            femme et enfants — des milliers de modèles livrés chez vous.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/boutique"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Découvrir la boutique <ArrowRight size={18} />
            </Link>
            <Link
              to="/boutique?cat=Running"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full backdrop-blur transition"
            >
              Collection Running
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-zinc-100">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100">
          {[
            { icon: Truck, t: "Livraison 58 wilayas", s: "Partout en Algérie" },
            { icon: ShieldCheck, t: "Paiement à la livraison", s: "100% sécurisé" },
            { icon: RefreshCw, t: "Retour facile", s: "Sous 7 jours" },
            { icon: Headphones, t: "7j/7 de 10h à 00h", s: "0561 81 18 83" },
          ].map((f) => (
            <div key={f.t} className="bg-white flex items-center gap-3 p-5">
              <div className="h-11 w-11 rounded-xl bg-orange-50 text-orange-600 grid place-items-center shrink-0">
                <f.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">{f.t}</p>
                <p className="text-xs text-zinc-500">{f.s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-extrabold text-zinc-900 mb-6">
          Achetez par catégorie
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to={`/boutique?cat=${encodeURIComponent(c)}`}
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={catImages[c]}
                alt={c}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white font-bold">
                {c}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-zinc-900">
            Meilleures ventes
          </h2>
          <Link
            to="/boutique"
            className="text-sm font-semibold text-orange-600 inline-flex items-center gap-1"
          >
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Soldes jusqu'à -30%
            </h3>
            <p className="text-white/90 mt-2">
              Profitez de nos réductions exclusives sur une large sélection.
            </p>
          </div>
          <Link
            to="/boutique"
            className="bg-white text-orange-600 font-bold px-6 py-3 rounded-full hover:bg-zinc-100 transition shrink-0"
          >
            J'en profite
          </Link>
        </div>
      </section>

      {/* NEW */}
      <section className="mx-auto max-w-7xl px-4 pb-6">
        <h2 className="text-2xl font-extrabold text-zinc-900 mb-6">
          Nouveautés
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
