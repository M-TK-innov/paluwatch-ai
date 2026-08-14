# PaluWatch AI 🦟

**Système intelligent de prédiction, surveillance et réponse précoce contre le paludisme en Afrique.**

> « Anticiper le paludisme pour sauver des vies. »

Prototype de démonstration (données fictives) construit avec Next.js. Il illustre :

- 📊 **Tableau de bord national** — cas observés, prévisions IA, capteurs IoT, signalements communautaires
- 🗺️ **Carte des risques** — les 12 départements du Bénin colorés par niveau de risque (faible → critique)
- 🚨 **Alertes précoces** — SMS communautaires et notifications ministère simulés
- 🤖 **Assistant IA** — questions/réponses en langage naturel sur la situation épidémiologique

## Développement local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Déploiement sur Vercel

Aucune configuration particulière n'est nécessaire : Vercel détecte automatiquement Next.js.

### Option 1 — Via GitHub (recommandé)

1. Pousser ce dossier dans un dépôt GitHub :
   ```bash
   git init
   git add .
   git commit -m "PaluWatch AI"
   git remote add origin https://github.com/<votre-compte>/paluwatch-ai.git
   git push -u origin main
   ```
2. Aller sur [vercel.com/new](https://vercel.com/new), importer le dépôt.
3. Cliquer **Deploy** (aucun réglage à changer). C'est tout.

### Option 2 — Via la CLI Vercel

```bash
npm i -g vercel
vercel
```

Suivre les invites, puis `vercel --prod` pour la mise en production.

## Structure

```
app/
  page.js              Accueil (présentation du projet)
  tableau-de-bord/     Tableau de bord national
  carte/               Carte interactive des risques
  alertes/             Système d'alerte précoce
  assistant/           Assistant conversationnel
components/Nav.js      Barre de navigation
lib/data.js            Données de démonstration (fictives)
lib/prediction.js      Moteur de scoring simulé (remplacera les modèles ML)
```

## Contenu complémentaire

- **[DOSSIER_PROJET.md](DOSSIER_PROJET.md)** — dossier de projet complet (contexte, architecture, feuille de route, budget, partenaires, risques, KPI)
- **[public/presentation.html](public/presentation.html)** — présentation de pitch (15 diapositives, flèches ← → pour naviguer, Ctrl+P pour exporter en PDF) ; accessible à `/presentation.html` une fois déployé
- **[ml/prediction_demo.py](ml/prediction_demo.py)** — maquette du modèle prédictif (Random Forest sur données simulées) : `python ml/prediction_demo.py`

## Avertissement

Toutes les données affichées sont **fictives** et servent uniquement à la démonstration. En cas de fièvre, rendez-vous au centre de santé le plus proche.
