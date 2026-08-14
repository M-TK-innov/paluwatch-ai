// Moteur de scoring simulé — PaluWatch AI
// Dans la version réelle, ce module serait remplacé par les modèles
// Random Forest / XGBoost / LSTM servis par une API FastAPI.

import { NIVEAUX } from "./data";

// Calcule un score de risque 0-100 à partir des indicateurs
// environnementaux et sanitaires d'un département.
export function scoreRisque(d) {
  const facteurPluie = Math.min(d.pluie / 100, 1) * 25;
  const facteurHumidite = Math.max((d.humidite - 60) / 30, 0) * 20;
  const facteurEaux = (d.eauxStagnantes / 100) * 20;
  const facteurIncidence = Math.min((d.casSemaine / d.population) * 10000 / 15, 1) * 20;
  const facteurTendance = Math.max(Math.min(d.tendance / 50, 1), 0) * 15;
  return Math.round(
    facteurPluie + facteurHumidite + facteurEaux + facteurIncidence + facteurTendance
  );
}

export function niveauRisque(score) {
  if (score >= 75) return "critique";
  if (score >= 55) return "eleve";
  if (score >= 35) return "modere";
  return "faible";
}

export function infosNiveau(score) {
  return NIVEAUX[niveauRisque(score)];
}

// Probabilité de flambée épidémique dans les 30 jours (simulée)
export function probabiliteFlambee(score) {
  return Math.min(Math.round(score * 1.05), 97);
}

// Horizon estimé avant flambée, en semaines
export function horizonFlambee(score) {
  if (score >= 75) return 2;
  if (score >= 55) return 3;
  if (score >= 35) return 6;
  return null;
}

export function enrichir(departements) {
  return departements
    .map((d) => {
      const score = scoreRisque(d);
      return {
        ...d,
        score,
        niveau: niveauRisque(score),
        infos: infosNiveau(score),
        probabilite: probabiliteFlambee(score),
        horizon: horizonFlambee(score),
      };
    })
    .sort((a, b) => b.score - a.score);
}
