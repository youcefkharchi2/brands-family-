import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { CATEGORIES } from "../data/products";

export default function Footer() {
  return (
    <footer className="mt-16 text-black" style={{ backgroundColor: '#F0F0F0' }}>
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/src/image/brands.png"
              alt="Brands Family"
              className="h-10 w-auto"
            />
            <span className="text-2xl font-extrabold text-black">
              Brands family
            </span>
          </div>
          <p className="text-sm leading-relaxed text-black">
            Le meilleur site de vente de chaussures en ligne en Algérie. Homme,
            femme et enfants — baskets, classiques, boots et bien plus.
          </p>
        </div>

        <div>
          <h4 className="text-black font-semibold mb-4">Catégories</h4>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to={`/boutique?cat=${encodeURIComponent(c)}`}
                  className="hover:text-orange-500"
                  style={{ color: '#6B6868' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-black font-semibold mb-4">Informations</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/boutique" className="hover:text-orange-500" style={{ color: '#6B6868' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}>
                Boutique
              </Link>
            </li>
            <li>
              <Link to="/panier" className="hover:text-orange-500" style={{ color: '#6B6868' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}>
                Mon panier
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-orange-500" style={{ color: '#6B6868' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}>
                Espace Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-black font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-orange-500" /> <span style={{ color: '#6B6868' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}>0561 81 18 83</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-orange-500" /> <span style={{ color: '#6B6868' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}>e-commerce@footland.dz</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-orange-500" /> <span style={{ color: '#6B6868' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}>brandsfamily@gmail.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-orange-500 mt-0.5" />
              <div className="space-y-1" style={{ color: '#6B6868' }}>
                <div
                  onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}
                >
                  1 Brands family cheraga
                </div>
                <div
                  onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}
                >
                  2 Brands family eucalyptus
                </div>
                <div
                  onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}
                >
                  3 Brands family bordj el kiffen
                </div>
                <div
                  onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}
                >
                  4 Brands family setif
                </div>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500">🕒</span>
              <span style={{ color: '#6B6868' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#121010'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B6868'}>
                7j/7 de 10h à 00h
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-5 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Footland — Démo e-commerce. Tous droits
        réservés.
      </div>
    </footer>
  );
}
