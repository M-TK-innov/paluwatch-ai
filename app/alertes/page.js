import { DEPARTEMENTS, SIGNALEMENTS } from "@/lib/data";
import { enrichir } from "@/lib/prediction";
import { formatNombre } from "@/lib/format";

export const metadata = {
  title: "Alertes — PaluWatch AI",
};

export default function Alertes() {
  const departements = enrichir(DEPARTEMENTS);
  const enAlerte = departements.filter(
    (d) => d.niveau === "critique" || d.niveau === "eleve"
  );
  const surveilles = departements.filter((d) => d.niveau === "modere");

  return (
    <>
      <h1 className="section-titre" style={{ marginTop: 0 }}>
        Système d&apos;alerte précoce
      </h1>
      <p style={{ color: "#5c6b60", marginBottom: 22 }}>
        Lorsque l&apos;IA détecte un risque, des notifications sont envoyées
        automatiquement aux communautés (SMS) et aux autorités sanitaires
        (rapport détaillé). Voici les alertes actives générées par le système.
      </p>

      <h2 className="section-titre" style={{ fontSize: "1.2rem" }}>
        🚨 Alertes actives ({enAlerte.length})
      </h2>
      {enAlerte.map((d) => (
        <div
          key={d.id}
          className="alerte-carte"
          style={{ borderLeftColor: d.infos.couleur }}
        >
          <div className="entete">
            <h3>
              {d.infos.emoji} Département de {d.nom} — Niveau{" "}
              {d.infos.libelle.toLowerCase()}
            </h3>
            <span className="meta">
              Score IA : {d.score}/100 · Émise automatiquement
            </span>
          </div>
          <p style={{ fontSize: "0.93rem" }}>
            Probabilité d&apos;épidémie : <strong>{d.probabilite}%</strong>
            {d.horizon && (
              <>
                {" "}
                · Flambée estimée dans <strong>{d.horizon} semaines</strong>
              </>
            )}{" "}
            · {formatNombre(d.casSemaine)} cas cette semaine (
            {d.tendance > 0 ? "+" : ""}
            {d.tendance}% sur 4 semaines).
          </p>

          <div className="sms-simule">
            📱 SMS envoyé aux communautés :{"\n"}
            «&nbsp;PALUWATCH — Risque {d.infos.libelle.toLowerCase()} de
            paludisme dans le département de {d.nom} ({d.chefLieu}) durant les
            15 prochains jours. Dormez sous moustiquaire. En cas de fièvre,
            rendez-vous immédiatement au centre de santé.&nbsp;»
          </div>

          <div className="sms-simule" style={{ background: "#3a2a08", color: "#ffe9c2" }}>
            🏛️ Notification ministère de la Santé :{"\n"}
            Niveau d&apos;alerte : {d.infos.libelle}{"\n"}
            Probabilité d&apos;épidémie : {d.probabilite}%{"\n"}
            Zone : département de {d.nom} · Population exposée :{" "}
            {formatNombre(d.population)} habitants{"\n"}
            Recommandation : pré-positionner moustiquaires, TDR et
            antipaludiques ; déployer les agents communautaires.
          </div>
        </div>
      ))}

      <h2 className="section-titre" style={{ fontSize: "1.2rem" }}>
        👁️ Départements sous surveillance renforcée ({surveilles.length})
      </h2>
      {surveilles.map((d) => (
        <div
          key={d.id}
          className="alerte-carte"
          style={{ borderLeftColor: d.infos.couleur }}
        >
          <div className="entete">
            <h3>
              {d.infos.emoji} {d.nom}
            </h3>
            <span className="meta">Score IA : {d.score}/100</span>
          </div>
          <p style={{ fontSize: "0.93rem", color: "#5c6b60" }}>
            Risque modéré. Surveillance renforcée des cas fébriles et
            vérification des stocks de tests rapides en cours.
          </p>
        </div>
      ))}

      <h2 className="section-titre" style={{ fontSize: "1.2rem" }}>
        📩 Signalements communautaires récents
      </h2>
      <div className="panneau">
        {SIGNALEMENTS.map((s) => (
          <div key={s.id} className="signalement">
            <span className="canal">{s.canal}</span>
            <div>
              <strong>{s.localite}</strong> —{" "}
              <span style={{ color: "#5c6b60" }}>{s.depuis}</span>
              <div>« {s.message} »</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
