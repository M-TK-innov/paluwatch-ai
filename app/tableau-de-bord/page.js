import {
  DEPARTEMENTS,
  HISTORIQUE_CAS,
  PREVISION_CAS,
  CAPTEURS,
  SIGNALEMENTS,
} from "@/lib/data";
import { enrichir } from "@/lib/prediction";
import { formatNombre } from "@/lib/format";

export const metadata = {
  title: "Tableau de bord — PaluWatch AI",
};

function CourbeCas() {
  const points = [...HISTORIQUE_CAS, ...PREVISION_CAS];
  const max = Math.max(...points.map((p) => p.cas)) * 1.1;
  const largeur = 640;
  const hauteur = 220;
  const pas = largeur / (points.length - 1);
  const y = (cas) => hauteur - (cas / max) * hauteur;

  const histo = HISTORIQUE_CAS.map(
    (p, i) => `${i * pas},${y(p.cas)}`
  ).join(" ");
  const debutPrev = (HISTORIQUE_CAS.length - 1) * pas;
  const prev = [
    `${debutPrev},${y(HISTORIQUE_CAS[HISTORIQUE_CAS.length - 1].cas)}`,
    ...PREVISION_CAS.map(
      (p, i) => `${(HISTORIQUE_CAS.length + i) * pas},${y(p.cas)}`
    ),
  ].join(" ");

  return (
    <div style={{ overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${largeur} ${hauteur + 30}`}
        style={{ width: "100%", minWidth: 480 }}
        role="img"
        aria-label="Évolution et prévision des cas de paludisme"
      >
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1="0"
            x2={largeur}
            y1={hauteur * f}
            y2={hauteur * f}
            stroke="#dce8dd"
            strokeWidth="1"
          />
        ))}
        <polyline
          points={histo}
          fill="none"
          stroke="#2e7d32"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polyline
          points={prev}
          fill="none"
          stroke="#ef6c00"
          strokeWidth="3"
          strokeDasharray="7 6"
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <circle
            key={p.semaine}
            cx={i * pas}
            cy={y(p.cas)}
            r="4"
            fill={i < HISTORIQUE_CAS.length ? "#2e7d32" : "#ef6c00"}
          />
        ))}
        {points.map((p, i) =>
          i % 2 === 0 ? (
            <text
              key={`t-${p.semaine}`}
              x={i * pas}
              y={hauteur + 22}
              fontSize="11"
              fill="#5c6b60"
              textAnchor="middle"
            >
              {p.semaine}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
}

export default function TableauDeBord() {
  const departements = enrichir(DEPARTEMENTS);
  const totalCas = departements.reduce((s, d) => s + d.casSemaine, 0);
  const enLigne = CAPTEURS.filter((c) => c.etat === "En ligne").length;
  const dernierePrev = PREVISION_CAS[PREVISION_CAS.length - 1].cas;
  const variation = Math.round(((dernierePrev - totalCas) / totalCas) * 100);

  return (
    <>
      <h1 className="section-titre" style={{ marginTop: 0 }}>
        Tableau de bord national de surveillance
      </h1>

      <div className="kpis">
        <div className="kpi">
          <div className="valeur">{formatNombre(totalCas)}</div>
          <div className="libelle">Cas confirmés cette semaine</div>
        </div>
        <div className="kpi">
          <div className="valeur alerte">+{variation}%</div>
          <div className="libelle">Hausse prévue par l&apos;IA d&apos;ici 4 semaines</div>
        </div>
        <div className="kpi">
          <div className="valeur">
            {enLigne}/{CAPTEURS.length}
          </div>
          <div className="libelle">Capteurs IoT en ligne</div>
        </div>
        <div className="kpi">
          <div className="valeur">{SIGNALEMENTS.length}</div>
          <div className="libelle">Signalements communautaires (24 h)</div>
        </div>
      </div>

      <div className="panneau">
        <h2>Évolution des cas et prévision IA (national)</h2>
        <CourbeCas />
        <div className="legende">
          <span>
            <span className="puce" style={{ background: "#2e7d32" }} />
            Cas observés (12 dernières semaines)
          </span>
          <span>
            <span className="puce" style={{ background: "#ef6c00" }} />
            Prévision IA (4 prochaines semaines)
          </span>
        </div>
      </div>

      <div className="panneau">
        <h2>Risque par département (classement IA)</h2>
        <div className="enveloppe-tableau">
          <table className="tableau">
            <thead>
              <tr>
                <th>Département</th>
                <th>Score IA</th>
                <th>Niveau</th>
                <th>Cas / semaine</th>
                <th>Tendance 4 sem.</th>
                <th>Prob. flambée 30 j</th>
              </tr>
            </thead>
            <tbody>
              {departements.map((d) => (
                <tr key={d.id}>
                  <td>
                    <strong>{d.nom}</strong>{" "}
                    <span style={{ color: "#5c6b60", fontSize: "0.85em" }}>
                      ({d.chefLieu})
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ minWidth: 28, fontWeight: 600 }}>
                        {d.score}
                      </span>
                      <div className="barre-fond" style={{ width: 90 }}>
                        <div
                          className="barre-remplie"
                          style={{
                            width: `${d.score}%`,
                            background: d.infos.couleur,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="pastille"
                      style={{ background: d.infos.couleur }}
                    >
                      {d.infos.emoji} {d.infos.libelle}
                    </span>
                  </td>
                  <td>{formatNombre(d.casSemaine)}</td>
                  <td style={{ color: d.tendance > 0 ? "#c62828" : "#2e7d32" }}>
                    {d.tendance > 0 ? "▲" : "▼"} {Math.abs(d.tendance)}%
                  </td>
                  <td>
                    <strong>{d.probabilite}%</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panneau">
        <h2>Réseau de capteurs IoT (micro-stations solaires)</h2>
        <div className="enveloppe-tableau">
          <table className="tableau">
            <thead>
              <tr>
                <th>Capteur</th>
                <th>Localité</th>
                <th>Transmission</th>
                <th>Batterie</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {CAPTEURS.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.id}</strong>
                  </td>
                  <td>{c.localite}</td>
                  <td>{c.type}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {c.batterie}%
                      <div className="barre-fond" style={{ width: 70 }}>
                        <div
                          className="barre-remplie"
                          style={{
                            width: `${c.batterie}%`,
                            background:
                              c.batterie > 50
                                ? "#2e7d32"
                                : c.batterie > 20
                                  ? "#f9a825"
                                  : "#c62828",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="pastille"
                      style={{
                        background:
                          c.etat === "En ligne"
                            ? "#2e7d32"
                            : c.etat === "Batterie faible"
                              ? "#f9a825"
                              : "#c62828",
                      }}
                    >
                      {c.etat}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panneau">
        <h2>Derniers signalements communautaires</h2>
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
