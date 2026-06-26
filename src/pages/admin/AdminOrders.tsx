import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp, Phone, MapPin } from "lucide-react";
import { useStore, formatDA } from "../../store/StoreContext";
import type { OrderStatus } from "../../types";
import { cn } from "../../utils/cn";

const STATUSES: OrderStatus[] = [
  "En attente",
  "Confirmée",
  "Expédiée",
  "Livrée",
  "Annulée",
];

const statusStyle: Record<OrderStatus, string> = {
  "En attente": "bg-amber-100 text-amber-700",
  Confirmée: "bg-blue-100 text-blue-700",
  Expédiée: "bg-purple-100 text-purple-700",
  Livrée: "bg-green-100 text-green-700",
  Annulée: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useStore();
  const [filter, setFilter] = useState<OrderStatus | "Toutes">("Toutes");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    filter === "Toutes"
      ? orders
      : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-zinc-900">Commandes</h1>
        <p className="text-zinc-500">{orders.length} commande(s) au total</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["Toutes", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium border",
              filter === s
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-zinc-100 p-16 text-center text-zinc-400">
          Aucune commande {filter !== "Toutes" ? `« ${filter} »` : ""}.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-2xl border border-zinc-100 overflow-hidden"
            >
              <div className="p-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setOpenId(openId === o.id ? null : o.id)}
                  className="h-9 w-9 grid place-items-center rounded-lg border border-zinc-200 text-zinc-500"
                >
                  {openId === o.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                <div className="min-w-[120px]">
                  <p className="font-bold text-zinc-900">{o.id}</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(o.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="min-w-[140px]">
                  <p className="font-medium text-zinc-800">{o.customer.name}</p>
                  <p className="text-xs text-zinc-500">{o.customer.wilaya}</p>
                </div>
                <span className="text-sm text-zinc-500">
                  {o.items.reduce((s, i) => s + i.qty, 0)} article(s)
                </span>
                <span className="font-extrabold text-zinc-900">
                  {formatDA(o.total)}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    statusStyle[o.status]
                  )}
                >
                  {o.status}
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      updateOrderStatus(o.id, e.target.value as OrderStatus)
                    }
                    className="rounded-lg border border-zinc-200 px-2 py-1.5 text-sm outline-none focus:border-orange-500"
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (confirm(`Supprimer la commande ${o.id} ?`))
                        deleteOrder(o.id);
                    }}
                    className="h-9 w-9 grid place-items-center rounded-lg border border-zinc-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {openId === o.id && (
                <div className="border-t border-zinc-100 bg-zinc-50/50 p-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 mb-2">
                      Client
                    </h4>
                    <div className="space-y-1 text-sm text-zinc-600">
                      <p className="flex items-center gap-2">
                        <Phone size={14} /> {o.customer.phone}
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin size={14} className="mt-0.5" />{" "}
                        {o.customer.address}, {o.customer.wilaya}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 mb-2">
                      Articles
                    </h4>
                    <div className="space-y-2">
                      {o.items.map((i) => (
                        <div
                          key={i.productId + i.size}
                          className="flex items-center gap-3 text-sm"
                        >
                          <img
                            src={i.image}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover bg-white"
                          />
                          <span className="flex-1 text-zinc-700">
                            {i.name}{" "}
                            <span className="text-zinc-400">
                              (P.{i.size} × {i.qty})
                            </span>
                          </span>
                          <span className="font-semibold">
                            {formatDA(i.price * i.qty)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
