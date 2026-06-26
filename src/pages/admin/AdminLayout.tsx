import { useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  LogOut,
  Store,
  Menu,
  X,
} from "lucide-react";
import { useStore } from "../../store/StoreContext";
import { cn } from "../../utils/cn";

const links = [
  { to: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/admin/produits", label: "Produits", icon: Package },
  { to: "/admin/commandes", label: "Commandes", icon: ClipboardList },
];

export default function AdminLayout() {
  const { isAdmin, logout } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isAdmin) return <Navigate to="/admin" replace />;

  const Sidebar = (
    <div className="flex flex-col h-full">
      <Link to="/admin/dashboard" className="flex items-center gap-2 px-6 h-16">
        <img
          src="/src/image/brands.png"
          alt="Brands Family"
          className="h-10 w-auto"
        />
        <span className="text-xl font-extrabold text-black">
          Brands family <span className="text-red-500">Admin</span>
        </span>
      </Link>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition",
                isActive
                  ? "bg-orange-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )
            }
          >
            <l.icon size={18} />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-zinc-800 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <Store size={18} /> Voir la boutique
        </Link>
        <button
          onClick={() => {
            logout();
            navigate("/admin");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} /> Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-100 lg:grid lg:grid-cols-[260px_1fr]">
      {/* desktop sidebar */}
      <aside className="hidden lg:block bg-zinc-900 sticky top-0 h-screen">
        {Sidebar}
      </aside>

      {/* mobile header */}
      <div className="lg:hidden bg-zinc-900 flex items-center justify-between px-4 h-14">
        <span className="text-white font-extrabold"><span className="text-red-500">Brands</span> <span className="text-white">family</span> Admin</span>
        <button onClick={() => setOpen(true)} className="text-white">
          <Menu size={24} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-zinc-900 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-zinc-400"
            >
              <X size={22} />
            </button>
            {Sidebar}
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}

      <main className="p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
