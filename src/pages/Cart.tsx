import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore, formatDA } from "../store/StoreContext";

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore();
  const delivery = cartTotal > 0 ? 600 : 0;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="inline-flex h-20 w-20 rounded-full bg-zinc-100 items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-zinc-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-zinc-900">
          Votre panier est vide
        </h1>
        <p className="text-zinc-500 mt-2">
          Parcourez notre boutique et trouvez votre paire idéale.
        </p>
        <Link
          to="/boutique"
          className="inline-flex items-center gap-2 mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full"
        >
          Aller à la boutique <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-zinc-900 mb-6">Mon panier</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId + item.size}
              className="bg-white rounded-2xl border border-zinc-100 p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-xl object-cover bg-zinc-50"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <Link
                    to={`/produit/${item.productId}`}
                    className="font-semibold text-zinc-900 hover:text-orange-600 line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="text-zinc-400 hover:text-red-600 shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-sm text-zinc-500 mt-0.5">
                  Pointure : {item.size}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-zinc-200 rounded-lg">
                    <button
                      onClick={() =>
                        updateQty(item.productId, item.size, item.qty - 1)
                      }
                      className="h-9 w-9 grid place-items-center text-zinc-600 hover:bg-zinc-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.qty}
                    </span>
                    <button
                      onClick={() =>
                        updateQty(item.productId, item.size, item.qty + 1)
                      }
                      className="h-9 w-9 grid place-items-center text-zinc-600 hover:bg-zinc-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-extrabold text-zinc-900">
                    {formatDA(item.price * item.qty)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit bg-white rounded-2xl border border-zinc-100 p-6 sticky top-24">
          <h2 className="font-bold text-zinc-900 mb-4">Récapitulatif</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Sous-total</span>
              <span className="font-semibold">{formatDA(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Livraison</span>
              <span className="font-semibold">{formatDA(delivery)}</span>
            </div>
            <div className="border-t border-zinc-100 pt-3 flex justify-between text-base">
              <span className="font-bold text-zinc-900">Total</span>
              <span className="font-black text-orange-600">
                {formatDA(cartTotal + delivery)}
              </span>
            </div>
          </div>
          <Link
            to="/commande"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3.5 rounded-full"
          >
            Passer la commande <ArrowRight size={18} />
          </Link>
          <Link
            to="/boutique"
            className="mt-3 w-full inline-flex items-center justify-center text-sm font-semibold text-zinc-600 hover:text-orange-600"
          >
            Continuer mes achats
          </Link>
        </aside>
      </div>
    </div>
  );
}
