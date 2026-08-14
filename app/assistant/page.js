"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEPARTEMENTS,
  ACTIONS_PAR_NIVEAU,
  PREVISION_CAS,
  HISTORIQUE_CAS,
} from "@/lib/data";
import { enrichir } from "@/lib/prediction";
import { formatNombre } from "@/lib/format";

const SUGGESTIONS = [
  "Quels départements risquent une flambée dans les 30 prochains jours ?",
  "Quelle est la situation dans l'Atacora ?",
  "Combien de cas sont prévus dans 4 semaines ?",
  "Que recommandes-tu pour les zones critiques ?",
];

// Assistant conversationnel de démonstration : les réponses sont générées
// localement à partir des données simulées. Dans la version réelle, ce
// module interrogerait un modèle d'IA générative connecté à la base.
function repondre(question) {
  const q = question.toLowerCase();
  const deps = enrichir(DEPARTEMENTS);
  const risques = deps.filter(
    (d) => d.niveau === "critique" || d.niveau === "eleve"
  );

  const parNom = deps.find((d) => q.includes(d.nom.toLowerCase()));
  if (parNom) {
    const d = parNom;
    return (
      `📍 Situation dans le département de ${d.nom} (${d.chefLieu}) :\n\n` +
      `• Niveau de risque : ${d.infos.emoji} ${d.infos.libelle} (score ${d.score}/100)\n` +
      `• Probabilité de flambée sous 30 jours : ${d.probabilite}%\n` +
      (d.horizon ? `• Flambée estimée dans ${d.horizon} semaines\n` : "") +
      `• Cas confirmés cette semaine : ${formatNombre(d.casSemaine)} (${d.tendance > 0 ? "+" : ""}${d.tendance}% sur 4 semaines)\n` +
      `• Pluies : ${d.pluie} mm/sem · Humidité : ${d.humidite}% · Eaux stagnantes : ${d.eauxStagnantes}/100\n\n` +
      `Interventions recommandées :\n` +
      ACTIONS_PAR_NIVEAU[d.niveau].map((a) => `— ${a}`).join("\n")
    );
  }

  if (q.includes("flambée") || q.includes("flambee") || q.includes("30 jours") || q.includes("risque")) {
    return (
      `⚠️ D'après les modèles de prédiction, ${risques.length} départements présentent un risque élevé ou critique de flambée dans les 30 prochains jours :\n\n` +
      risques
        .map(
          (d) =>
            `${d.infos.emoji} ${d.nom} — probabilité ${d.probabilite}%` +
            (d.horizon ? ` (horizon ~${d.horizon} semaines)` : "")
        )
        .join("\n") +
      `\n\nJe recommande de pré-positionner les stocks de moustiquaires, de tests rapides et d'antipaludiques dans ces zones dès maintenant.`
    );
  }

  if (q.includes("prévu") || q.includes("prevu") || q.includes("prévision") || q.includes("prevision") || q.includes("semaine")) {
    const actuel = HISTORIQUE_CAS[HISTORIQUE_CAS.length - 1].cas;
    const futur = PREVISION_CAS[PREVISION_CAS.length - 1].cas;
    const hausse = Math.round(((futur - actuel) / actuel) * 100);
    return (
      `📈 Prévision nationale des cas de paludisme :\n\n` +
      PREVISION_CAS.map(
        (p) => `• ${p.semaine} : ${formatNombre(p.cas)} cas estimés`
      ).join("\n") +
      `\n\nSoit une hausse d'environ ${hausse}% par rapport à cette semaine (${formatNombre(actuel)} cas). La saison des pluies dans le nord du pays est le principal facteur explicatif.`
    );
  }

  if (q.includes("recommand") || q.includes("action") || q.includes("intervention") || q.includes("critique")) {
    const critiques = deps.filter((d) => d.niveau === "critique");
    const cibles = critiques.length > 0 ? critiques : risques;
    return (
      `🎯 Plan d'action recommandé pour les zones prioritaires (${cibles.map((d) => d.nom).join(", ")}) :\n\n` +
      ACTIONS_PAR_NIVEAU.critique.map((a, i) => `${i + 1}. ${a}`).join("\n") +
      `\n\nCes actions ciblées permettent d'éviter l'épidémie avant son apparition, en protégeant en priorité les enfants de moins de 5 ans et les femmes enceintes.`
    );
  }

  if (q.includes("bonjour") || q.includes("salut") || q.includes("merci")) {
    return `Bonjour ! 👋 Je suis l'assistant PaluWatch AI. Posez-moi une question sur la situation du paludisme : zones à risque, prévisions, recommandations ou détails par département.`;
  }

  return (
    `Je peux vous renseigner sur :\n` +
    `• les départements à risque de flambée (« Quels départements risquent une flambée ? »)\n` +
    `• la situation d'un département précis (« Situation dans l'Atacora ? »)\n` +
    `• les prévisions de cas (« Combien de cas prévus dans 4 semaines ? »)\n` +
    `• les interventions recommandées (« Que recommandes-tu pour les zones critiques ? »)`
  );
}

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      texte:
        "Bonjour ! Je suis l'assistant IA de santé publique de PaluWatch. Posez-moi vos questions sur la situation du paludisme au Bénin. 🦟",
    },
  ]);
  const [saisie, setSaisie] = useState("");
  const finRef = useRef(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function envoyer(texte) {
    const question = (texte ?? saisie).trim();
    if (!question) return;
    setSaisie("");
    setMessages((m) => [...m, { role: "utilisateur", texte: question }]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", texte: repondre(question) },
      ]);
    }, 450);
  }

  return (
    <>
      <h1 className="section-titre" style={{ marginTop: 0 }}>
        Assistant conversationnel de santé publique
      </h1>
      <p style={{ color: "#5c6b60", marginBottom: 16 }}>
        Interrogez le système en langage naturel. Réponses instantanées basées
        sur les prédictions IA et les données de surveillance.
      </p>

      <div className="suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => envoyer(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="chat">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`bulle ${m.role}`}>
              {m.texte}
            </div>
          ))}
          <div ref={finRef} />
        </div>
        <form
          className="chat-saisie"
          onSubmit={(e) => {
            e.preventDefault();
            envoyer();
          }}
        >
          <input
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            placeholder="Posez votre question…"
            aria-label="Votre question"
          />
          <button type="submit">Envoyer</button>
        </form>
      </div>

      <p style={{ fontSize: "0.82rem", color: "#5c6b60", marginTop: 14 }}>
        Démonstration : les réponses sont générées à partir de données
        simulées. La version de production connectera un modèle d&apos;IA
        générative à la base de données nationale.
      </p>
    </>
  );
}
