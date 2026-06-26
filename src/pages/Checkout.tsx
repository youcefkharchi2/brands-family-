import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useStore, formatDA } from "../store/StoreContext";
import { WILAYAS } from "../data/products";

export default function Checkout() {
  const { cart, cartTotal, placeOrder } = useStore();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    wilaya: WILAYAS[0],
    address: "",
  });
  const [orderId, setOrderId] = useState<string | null>(null);
  const delivery = 600;

  if (orderId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="inline-flex h-20 w-20 rounded-full bg-green-100 items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-black text-zinc-900">
          Commande confirmée !
        </h1>
        <p className="text-zinc-500 mt-3">
          Merci pour votre confiance. Votre numéro de commande est :
        </p>
        <p className="text-2xl font-black text-orange-600 mt-2">{orderId}</p>
        <p className="text-zinc-500 mt-3">
          Notre équipe vous contactera bientôt pour confirmer la livraison.
        </p>
        <Link
          to="/boutique"
          className="inline-block mt-8 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-zinc-500">Votre panier est vide.</p>
        <Link to="/boutique" className="text-orange-600 font-semibold">
          Aller à la boutique
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = placeOrder(form);
    setOrderId(id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-zinc-900 mb-6">
        Finaliser la commande
      </h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-4">
          <h2 className="font-bold text-zinc-900">Informations de livraison</h2>
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Nom complet
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
              placeholder="Votre nom et prénom"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Téléphone
            </label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
              placeholder="0xxx xx xx xx"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Wilaya</label>
            <select
              value={form.wilaya}
              onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
              className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
            >
              {WILAYAS.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Adresse complète
            </label>
            <textarea
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
              placeholder="Rue, ville, code postal..."
            />
          </div>
          <div className="bg-orange-50 text-orange-800 text-sm rounded-xl p-4">
            💵 Paiement à la livraison (Cash on delivery)
          </div>
        </div>

        <aside className="h-fit bg-white rounded-2xl border border-zinc-100 p-6 sticky top-24">
          <h2 className="font-bold text-zinc-900 mb-4">Votre commande</h2>
          <div className="space-y-3 max-h-64 overflow-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.productId + item.size}
                className="flex items-center gap-3"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-12 w-12 rounded-lg object-cover bg-zinc-50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-800 line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    P.{item.size} × {item.qty}
                  </p>
                </div>
                <span className="text-sm font-semibold">
                  {formatDA(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-100 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Sous-total</span>
              <span className="font-semibold">{formatDA(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Livraison</span>
              <span className="font-semibold">{formatDA(delivery)}</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-zinc-100">
              <span className="font-bold">Total</span>
              <span className="font-black text-orange-600">
                {formatDA(cartTotal + delivery)}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3.5 rounded-full"
          >
            Confirmer la commande
          </button>
        </aside>
      </form>
    </div>
  );
}
