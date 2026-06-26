import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { useStore, formatDA } from "../../store/StoreContext";
import { CATEGORIES, SUBCATEGORIES } from "../../data/products";
import type { Product, Category } from "../../types";

const DEFAULT_ADMIN_CATEGORY = "HOMME" as Category;

const empty: Omit<Product, "id" | "createdAt"> = {
  name: "",
  brand: "",
  category: DEFAULT_ADMIN_CATEGORY,
  subcategory: SUBCATEGORIES[DEFAULT_ADMIN_CATEGORY][0],
  price: 0,
  oldPrice: undefined,
  image: "",
  description: "",
  sizes: [40, 41, 42, 43],
  colors: ["Noir"],
  stock: 0,
  rating: 4.5,
  featured: false,
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const formSubcategories = SUBCATEGORIES[form.category] ?? [];

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.brand.toLowerCase().includes(q.toLowerCase())
      ),
    [products, q]
  );

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setModal(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    const { id, createdAt, ...rest } = p;
    void id;
    void createdAt;
    setForm({
      ...rest,
      subcategory: rest.subcategory ?? SUBCATEGORIES[rest.category]?.[0] ?? "",
    });
    setModal(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateProduct({ ...editing, ...form });
    } else {
      addProduct(form);
    }
    setModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Produits</h1>
          <p className="text-zinc-500">{products.length} produits au total</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2.5 rounded-xl"
        >
          <Plus size={18} /> Ajouter un produit
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-3 text-zinc-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full rounded-xl border border-zinc-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-orange-500"
        />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Produit</th>
                <th className="px-4 py-3 font-medium">Catégorie</th>
                <th className="px-4 py-3 font-medium">Prix</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        className="h-11 w-11 rounded-lg object-cover bg-zinc-100"
                      />
                      <div>
                        <p className="font-semibold text-zinc-900 line-clamp-1">
                          {p.name}
                        </p>
                        <p className="text-xs text-zinc-500">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-zinc-100 text-zinc-700 text-xs font-medium px-2 py-1 rounded-md">
                      {p.category}
                      {p.subcategory ? ` · ${p.subcategory}` : ""}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {formatDA(p.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "font-semibold " +
                        (p.stock === 0
                          ? "text-red-600"
                          : p.stock <= 10
                            ? "text-amber-600"
                            : "text-green-600")
                      }
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="h-9 w-9 grid place-items-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer "${p.name}" ?`))
                            deleteProduct(p.id);
                        }}
                        className="h-9 w-9 grid place-items-center rounded-lg border border-zinc-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-zinc-400"
                  >
                    Aucun produit trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4 overflow-auto">
          <form
            onSubmit={save}
            className="bg-white rounded-2xl w-full max-w-2xl p-6 my-8 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900">
                {editing ? "Modifier le produit" : "Nouveau produit"}
              </h2>
              <button
                type="button"
                onClick={() => setModal(false)}
                className="text-zinc-400 hover:text-zinc-700"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom du produit">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Marque">
                <input
                  required
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Catégorie principale">
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as Category,
                      subcategory:
                        SUBCATEGORIES[e.target.value]?.[0] ?? form.subcategory,
                    })
                  }
                  className={inputCls}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Sous-catégorie">
                <select
                  value={form.subcategory ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, subcategory: e.target.value })
                  }
                  className={inputCls}
                >
                  {formSubcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="URL de l'image">
                <input
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className={inputCls}
                  placeholder="https://..."
                />
              </Field>
              <Field label="Prix (DA)">
                <input
                  required
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Ancien prix (DA, optionnel)">
                <input
                  type="number"
                  value={form.oldPrice ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      oldPrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Stock">
                <input
                  required
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: Number(e.target.value) })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Note (0-5)">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: Number(e.target.value) })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Pointures (séparées par virgule)">
                <input
                  value={form.sizes.join(", ")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sizes: e.target.value
                        .split(",")
                        .map((s) => Number(s.trim()))
                        .filter((n) => !isNaN(n)),
                    })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Couleurs (séparées par virgule)">
                <input
                  value={form.colors.join(", ")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      colors: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={inputCls}
              />
            </Field>

            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="accent-orange-600 h-4 w-4"
              />
              Mettre en avant (TOP ventes)
            </label>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="flex-1 border border-zinc-200 text-zinc-700 font-semibold py-3 rounded-xl hover:bg-zinc-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl"
              >
                {editing ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
