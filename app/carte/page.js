"use client";

import { useState } from "react";
import { DEPARTEMENTS, ACTIONS_PAR_NIVEAU } from "@/lib/data";
import { enrichir } from "@/lib/prediction";
import { formatNombre } from "@/lib/format";

// Carte stylisée du Bénin — chaque département est représenté par une
// forme simplifiée positionnée approximativement selon sa géographie.
const FORMES = {
  atacora: "M10,10 L150,10 L150,120 L95,150 L10,150 Z",
  alibori: "M150,10 L290,10 L290,150 L205,150 L150,120 Z",
  donga: "M10,150 L95,150 L150,120 L150,255 L60,255 L10,220 Z",
  borgou: "M150,120 L205,150 L290,150 L290,290 L150,290 Z",
  collines: "M60,255 L150,255 L150,290 L240,290 L240,370 L60,370 Z",
  zou: "M60,370 L175,370 L175,445 L60,445 Z",
  plateau: "M175,370 L240,370 L240,470 L175,470 Z",
  couffo: "M60,445 L120,445 L120,505 L60,505 Z",
  mono: "M60,505 L120,505 L120,550 L60,550 Z",
  atlantique: "M120,445 L175,445 L175,550 L120,550 Z",
  oueme: "M175,470 L240,470 L240,550 L192,550 Z",
  littoral: "M175,530 L192,530 L192,550 L175,550 Z",
};

const ETIQUETTES = {
  atacora: [72, 78],
  alibori: [218, 78],
  donga: [85, 205],
  borgou: [220, 220],
  collines: [148, 335],
  zou: [112, 412],
  plateau: [206, 425],
  couffo: [88, 480],
  mono: [88, 532],
  atlantique: [146, 502],
  oueme: [212, 512],
  littoral: [155, 525],
};

export default function CarteRisques() {
  const departements = enrichir(DEPARTEMENTS);
  const [selection, setSelection] = useState(departements[0].id);
  const d = departements.find((x) => x.id === selection);

  return (
    <>
      <h1 className="section-titre" style={{ marginTop: 0 }}>
        Carte nationale des risques — Bénin
      </h1>
      <p style={{ color: "#5c6b60", marginBottom: 18 }}>
        Cliquez sur un département pour afficher son analyse détaillée. Les
        couleurs correspondent au niveau de risque calculé par l&apos;IA à
        partir des données météo, environnementales, sanitaires et
        communautaires.
      </p>

      <div className="legende" style={{ marginBottom: 18 }}>
        <span>
          <span className="puce" style={{ background: "#2e7d32" }} /> Faible
        </span>
        <span>
          <span className="puce" style={{ background: "#f9a825" }} /> Modéré
        </span>
        <span>
          <span className="puce" style={{ background: "#ef6c00" }} /> Élevé
        </span>
        <span>
          <span className="puce" style={{ background: "#c62828" }} /> Critique
        </span>
      </div>

      <div className="disposition-carte">
        <div className="panneau" style={{ marginBottom: 0 }}>
          <svg
            className="svg-benin"
            viewBox="0 0 300 560"
            role="img"
            aria-label="Carte des départements du Bénin colorée par niveau de risque"
          >
            {departements.map((dep) => (
              <path
                key={dep.id}
                d={FORMES[dep.id]}
                fill={dep.infos.couleur}
                opacity={selection === dep.id ? 1 : 0.92}
                onClick={() => setSelection(dep.id)}
              >
                <title>{`${dep.nom} — ${dep.infos.libelle} (score ${dep.score})`}</title>
              </path>
            ))}
            {departements.map((dep) =>
              dep.id === "littoral" ? null : (
                <text
                  key={`e-${dep.id}`}
                  x={ETIQUETTES[dep.id][0]}
                  y={ETIQUETTES[dep.id][1]}
                  textAnchor="middle"
                >
                  {dep.nom}
                </text>
              )
            )}
          </svg>
          <p style={{ fontSize: "0.8rem", color: "#5c6b60", marginTop: 8 }}>
            Représentation schématique des 12 départements.
          </p>
        </div>

        <div className="panneau detail-departement" style={{ marginBottom: 0 }}>
          <h3>
            {d.infos.emoji} {d.nom}
          </h3>
          <div className="sous">
            Chef-lieu : {d.chefLieu} · Population :{" "}
            {formatNombre(d.population)} habitants
          </div>

          <span className="pastille" style={{ background: d.infos.couleur }}>
            Risque {d.infos.libelle} — score {d.score}/100
          </span>

          <div className="jauges">
            <div className="jauge">
              <div className="v">{d.probabilite}%</div>
              <div className="l">Probabilité de flambée (30 jours)</div>
            </div>
            <div className="jauge">
              <div className="v">
                {d.horizon ? `${d.horizon} sem.` : "—"}
              </div>
              <div className="l">Horizon estimé avant flambée</div>
            </div>
            <div className="jauge">
              <div className="v">{formatNombre(d.casSemaine)}</div>
              <div className="l">Cas confirmés cette semaine</div>
            </div>
            <div className="jauge">
              <div className="v">
                {d.tendance > 0 ? "+" : ""}
                {d.tendance}%
              </div>
              <div className="l">Tendance sur 4 semaines</div>
            </div>
            <div className="jauge">
              <div className="v">{d.pluie} mm</div>
              <div className="l">Précipitations hebdomadaires</div>
            </div>
            <div className="jauge">
              <div className="v">{d.humidite}%</div>
              <div className="l">Humidité moyenne</div>
            </div>
            <div className="jauge">
              <div className="v">{d.eauxStagnantes}/100</div>
              <div className="l">Indice d&apos;eaux stagnantes (satellite)</div>
            </div>
            <div className="jauge">
              <div className="v">{d.couverture}%</div>
              <div className="l">Couverture en moustiquaires</div>
            </div>
          </div>

          <h2 style={{ fontSize: "1.05rem", marginTop: 6 }}>
            Interventions recommandées par l&apos;IA
          </h2>
          <ul className="liste-actions">
            {ACTIONS_PAR_NIVEAU[d.niveau].map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
