"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LIENS = [
  { href: "/", libelle: "Accueil" },
  { href: "/tableau-de-bord", libelle: "Tableau de bord" },
  { href: "/carte", libelle: "Carte des risques" },
  { href: "/alertes", libelle: "Alertes" },
  { href: "/assistant", libelle: "Assistant IA" },
];

export default function Nav() {
  const chemin = usePathname();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <svg className="moustique" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#e8f5e9" />
            <path
              d="M12 5.5v13M6.5 8.5l11 7M17.5 8.5l-11 7"
              stroke="#1b5e20"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="3" fill="#1b5e20" />
          </svg>
          PaluWatch AI
        </Link>
        <div className="nav-links">
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={chemin === l.href ? "actif" : ""}
            >
              {l.libelle}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
