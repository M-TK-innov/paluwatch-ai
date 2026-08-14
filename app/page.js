import Link from "next/link";
import { DEPARTEMENTS } from "@/lib/data";
import { enrichir } from "@/lib/prediction";
import { formatNombre } from "@/lib/format";

const PILIERS = [
  {
    icone: "🛰️",
    titre: "Collecte multi-sources",
    texte:
      "Satellites, stations météo, capteurs IoT solaires, registres sanitaires et signalements communautaires par SMS, USSD et application mobile.",
  },
  {
    icone: "🧠",
    titre: "Prédiction par IA",
    texte:
      "Modèles Random Forest, XGBoost, LSTM et Prophet pour prévoir le nombre de cas, les zones à risque et la vitesse de propagation plusieurs semaines à l'avance.",
  },
  {
    icone: "🗺️",
    titre: "Cartographie intelligente",
    texte:
      "Carte interactive des risques par département : faible, modéré, élevé, critique. Les autorités visualisent immédiatement les zones prioritaires.",
  },
  {
    icone: "📢",
    titre: "Alerte précoce",
    texte:
      "Notifications automatiques par SMS aux communautés et rapports d'alerte détaillés au ministère de la Santé dès qu'un risque est détecté.",
  },
  {
    icone: "📦",
    titre: "Réponse optimisée",
    texte:
      "Recommandations ciblées : moustiquaires, tests rapides, antipaludiques et agents communautaires envoyés au bon endroit, au bon moment.",
  },
  {
    icone: "🧪",
    titre: "Jumeau numérique sanitaire",
    texte:
      "Chaque district possède une copie virtuelle dynamique pour simuler les pluies futures, la propagation et l'impact des interventions avant d'agir.",
  },
];

export default function Accueil() {
  const departements = enrichir(DEPARTEMENTS);
  const critiques = departements.filter(
    (d) => d.niveau === "critique" || d.niveau === "eleve"
  );
  const totalCas = departements.reduce((s, d) => s + d.casSemaine, 0);

  return (
    <>
      <section className="heros">
        <span className="badge-proto">Prototype de démonstration — Bénin</span>
        <h1>
          Anticiper le paludisme <br /> pour sauver des vies.
        </h1>
        <p className="slogan">
          Système intelligent de prédiction, surveillance et réponse précoce
          contre le paludisme en Afrique.
        </p>
        <p className="sous-titre">
          L&apos;Afrique concentre plus de 90&nbsp;% des cas mondiaux de
          paludisme. PaluWatch AI prédit les flambées avant leur apparition
          grâce à l&apos;intelligence artificielle et aux données
          environnementales, sanitaires et communautaires.
        </p>
        <div className="boutons">
          <Link href="/tableau-de-bord" className="btn btn-blanc">
            Ouvrir le tableau de bord
          </Link>
          <Link href="/carte" className="btn btn-contour">
            Voir la carte des risques
          </Link>
        </div>
      </section>

      <div className="kpis">
        <div className="kpi">
          <div className="valeur">{formatNombre(totalCas)}</div>
          <div className="libelle">Cas confirmés cette semaine (national)</div>
        </div>
        <div className="kpi">
          <div className="valeur alerte">{critiques.length}</div>
          <div className="libelle">Départements en risque élevé ou critique</div>
        </div>
        <div className="kpi">
          <div className="valeur">{departements[0].probabilite}%</div>
          <div className="libelle">
            Probabilité de flambée — {departements[0].nom} (30 jours)
          </div>
        </div>
        <div className="kpi">
          <div className="valeur">12</div>
          <div className="libelle">Départements sous surveillance continue</div>
        </div>
      </div>

      <h2 className="section-titre">Comment fonctionne PaluWatch AI ?</h2>
      <div className="grille">
        {PILIERS.map((p) => (
          <div key={p.titre} className="carte-info">
            <div className="icone">{p.icone}</div>
            <h3>{p.titre}</h3>
            <p>{p.texte}</p>
          </div>
        ))}
      </div>

      <h2 className="section-titre">Le problème que nous résolvons</h2>
      <div className="grille">
        <div className="carte-info">
          <div className="icone">❌</div>
          <h3>Aujourd&apos;hui</h3>
          <p>
            Campagnes réactives, ressources limitées, données dispersées et
            zones rurales mal surveillées. Les autorités interviennent souvent
            après l&apos;apparition des foyers épidémiques.
          </p>
        </div>
        <div className="carte-info">
          <div className="icone">✅</div>
          <h3>Avec PaluWatch AI</h3>
          <p>
            Les risques sont prédits avant les épidémies, les ressources sont
            envoyées au bon endroit et les interventions sont ciblées sur les
            populations les plus vulnérables : enfants de moins de 5 ans et
            femmes enceintes.
          </p>
        </div>
      </div>

      <section className="section-presentation">
        <h2 className="section-titre">Découvrir le projet en détail</h2>
        <p>
          Parcourez la présentation complète du projet : contexte, solution,
          architecture, feuille de route et impact attendu.
        </p>
        <a
          href="/presentation.html"
          className="btn btn-vert"
          target="_blank"
          rel="noopener"
        >
          📽️ Voir la présentation
        </a>
      </section>
    </>
  );
}
