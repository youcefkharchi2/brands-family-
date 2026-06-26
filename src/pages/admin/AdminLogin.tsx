import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { useStore } from "../../store/StoreContext";

export default function AdminLogin() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(u, p)) {
      navigate("/admin/dashboard");
    } else {
      setErr("Identifiants incorrects.");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-zinc-900 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white font-black text-xl">
            F
          </span>
          <span className="text-2xl font-extrabold text-white">
            Foot<span className="text-orange-500">land</span> Admin
          </span>
        </div>
        <form
          onSubmit={submit}
          className="bg-white rounded-3xl p-8 shadow-2xl space-y-5"
        >
          <div>
            <h1 className="text-xl font-bold text-zinc-900">
              Tableau de bord
            </h1>
            <p className="text-sm text-zinc-500">
              Connectez-vous pour gérer votre boutique.
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Nom d'utilisateur
            </label>
            <div className="mt-1 relative">
              <User
                size={18}
                className="absolute left-3 top-3.5 text-zinc-400"
              />
              <input
                value={u}
                onChange={(e) => setU(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-500"
                placeholder="admin"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Mot de passe
            </label>
            <div className="mt-1 relative">
              <Lock
                size={18}
                className="absolute left-3 top-3.5 text-zinc-400"
              />
              <input
                type="password"
                value={p}
                onChange={(e) => setP(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl"
          >
            Se connecter
          </button>
          <div className="text-xs text-zinc-400 bg-zinc-50 rounded-lg p-3 text-center">
            Démo — utilisateur : <b>admin</b> · mot de passe :{" "}
            <b>footland2026</b>
          </div>
        </form>
      </div>
    </div>
  );
}
