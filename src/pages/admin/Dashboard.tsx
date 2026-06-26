import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useStore, formatDA } from "../../store/StoreContext";
import { CATEGORIES } from "../../data/products";

const COLORS = ["#ea580c", "#f59e0b", "#0ea5e9", "#10b981", "#8b5cf6", "#ec4899"];

export default function Dashboard() {
  const { products, orders } = useStore();

  const revenue = orders
    .filter((o) => o.status !== "Annulée")
    .reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter((p) => p.stock <= 10);

  // sales by category (units in orders)
  const catData = CATEGORIES.map((c) => {
    const units = orders
      .filter((o) => o.status !== "Annulée")
      .flatMap((o) => o.items)
      .filter((i) => {
        const prod = products.find((p) => p.id === i.productId);
        return prod?.category === c;
      })
      .reduce((s, i) => s + i.qty, 0);
    return { name: c, value: units };
  }).filter((d) => d.value > 0);

  // revenue last 7 days
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString("fr-FR", {
      weekday: "short",
    });
    const dayStart = new Date(d).setHours(0, 0, 0, 0);
    const dayEnd = new Date(d).setHours(23, 59, 59, 999);
    const total = orders
      .filter(
        (o) =>
          o.status !== "Annulée" &&
          o.createdAt >= dayStart &&
          o.createdAt <= dayEnd
      )
      .reduce((s, o) => s + o.total, 0);
    return { name: label, total };
  });

  const stats = [
    {
      label: "Chiffre d'affaires",
      value: formatDA(revenue),
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      label: "Commandes",
      value: orders.length,
      icon: ShoppingCart,
      color: "bg-orange-500",
    },
    {
      label: "Produits",
      value: products.length,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Stock faible",
      value: lowStock.length,
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  const recent = [...orders].slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-zinc-900">Tableau de bord</h1>
        <p className="text-zinc-500">Vue d'ensemble de votre boutique</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-zinc-100"
          >
            <div
              className={`h-11 w-11 rounded-xl ${s.color} text-white grid place-items-center mb-3`}
            >
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-black text-zinc-900">{s.value}</p>
            <p className="text-sm text-zinc-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-zinc-100">
          <h2 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-orange-600" /> Revenus (7
            derniers jours)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={days}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} width={40} />
                <Tooltip
                  formatter={(v) => formatDA(Number(v))}
                  cursor={{ fill: "#f4f4f5" }}
                />
                <Bar dataKey="total" fill="#ea580c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-100">
          <h2 className="font-bold text-zinc-900 mb-4">
            Ventes par catégorie
          </h2>
          <div className="h-64">
            {catData.length === 0 ? (
              <div className="h-full grid place-items-center text-zinc-400 text-sm">
                Aucune vente pour le moment
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={catData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {catData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-zinc-100">
          <h2 className="font-bold text-zinc-900 mb-4">Commandes récentes</h2>
          {recent.length === 0 ? (
            <p className="text-sm text-zinc-400">Aucune commande pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {recent.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between text-sm border-b border-zinc-50 pb-2 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-zinc-900">{o.id}</p>
                    <p className="text-zinc-500">{o.customer.name}</p>
                  </div>
                  <span className="font-bold text-zinc-900">
                    {formatDA(o.total)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-100">
          <h2 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" /> Stock faible
          </h2>
          {lowStock.length === 0 ? (
            <p className="text-sm text-zinc-400">Tous les stocks sont bons.</p>
          ) : (
            <div className="space-y-3">
              {lowStock.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 text-sm border-b border-zinc-50 pb-2 last:border-0"
                >
                  <img
                    src={p.image}
                    alt=""
                    className="h-9 w-9 rounded-lg object-cover bg-zinc-50"
                  />
                  <span className="flex-1 font-medium text-zinc-800 line-clamp-1">
                    {p.name}
                  </span>
                  <span
                    className={
                      "font-bold " +
                      (p.stock === 0 ? "text-red-600" : "text-amber-600")
                    }
                  >
                    {p.stock} unités
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
